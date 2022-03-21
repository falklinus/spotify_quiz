import { useEffect } from 'react'
import { useAuth } from 'hooks'

const code = new URLSearchParams(window.location.search).get('code')

const ProtectedRoute: React.FC = ({ children }) => {
  const { authenticated, setCode, setRefreshToken } = useAuth()

  useEffect(() => {
    if (authenticated) return
    if (code) return setCode(code)
    const refreshToken = localStorage.getItem('SpotifyRefreshToken')
    if (refreshToken) {
      setRefreshToken(refreshToken)
    }
  }, [authenticated, setCode, setRefreshToken])

  if (!authenticated) return null
  return <>{children}</>
}

export default ProtectedRoute
