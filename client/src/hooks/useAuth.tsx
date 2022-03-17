import React, { createContext, useContext, useEffect, useState } from 'react'
import { login } from '../util'
import { useLocalStorage } from 'hooks'

function useAuthManager() {
  const [token, setToken] = useLocalStorage('SpotifyToken', {
    token: '',
    expires: 0,
  })
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    if (token.token && token.expires > Date.now()) {
      setAuthenticated(true)
    } else {
      setAuthenticated(false)
    }
  }, [token.token, token.expires])

  const logout = () => {
    setToken({
      token: '',
      expires: 0,
    })
  }

  return {
    authenticated,
    token,
    setToken,
    logout,
    login,
  }
}

const AuthContext = createContext<ReturnType<typeof useAuthManager>>({
  authenticated: false,
  token: { token: '', expires: 0 },
  setToken: () => {},
  logout: () => {},
  login: () => '',
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
