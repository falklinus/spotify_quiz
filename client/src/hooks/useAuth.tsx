import {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
} from 'react'
import axios from 'axios'

function useAuthManager() {
  const [code, setCode] = useState('')
  const [accessToken, setAccessToken] = useState('')
  const [refreshToken, setRefreshToken] = useState('')
  const [expiresIn, setExpiresIn] = useState(0)

  const logout = () => {
    console.log('logout')
    localStorage.removeItem('SpotifyRefreshToken')
    setCode('')
    setAccessToken('')
    setRefreshToken('')
    setExpiresIn(0)
  }

  useEffect(() => {
    if (!code) return
    axios
      .post('http://localhost:8080/auth/login', {
        code,
      })
      .then(({ data }) => {
        // Successful login
        setAccessToken(data.accessToken)
        setRefreshToken(data.refreshToken)
        setExpiresIn(data.expiresIn)

        localStorage.setItem('SpotifyRefreshToken', data.refreshToken)

        window.history.pushState({}, '', '/')
      })
      .catch(() => {
        logout()
        // window.location.href = '/'
      })
  }, [code])

  const updateToken = useCallback(() => {
    axios
      .post('http://localhost:8080/auth/refresh', {
        refreshToken,
      })
      .then(({ data }) => {
        // Successful refresh
        setAccessToken(data.accessToken)
        setExpiresIn(data.expiresIn)
      })
      .catch(() => {
        logout()
        window.location.href = '/'
      })
  }, [refreshToken, setAccessToken, setExpiresIn])

  useEffect(() => {
    if (!refreshToken) return

    if (!accessToken && refreshToken) {
      return updateToken()
    }

    const interval = setInterval(() => {
      updateToken()
    }, (expiresIn - 60) * 1000)

    return () => clearInterval(interval)
  }, [refreshToken, updateToken, accessToken, expiresIn])

  return {
    authenticated: !!accessToken,
    accessToken,
    setCode,
    logout,
    setRefreshToken,
  }
}

const AuthContext = createContext<ReturnType<typeof useAuthManager>>({
  authenticated: false,
  accessToken: '',
  setCode: () => {},
  logout: () => {},
  setRefreshToken: () => {},
})
export const AuthProvider: React.FC = ({ children }) => {
  return (
    <AuthContext.Provider value={useAuthManager()}>
      {children}
    </AuthContext.Provider>
  )
}
export default function useAuth() {
  return useContext(AuthContext)
}
