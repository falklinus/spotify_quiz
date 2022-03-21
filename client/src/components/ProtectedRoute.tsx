import { useEffect } from 'react'
import { useAuth } from 'hooks'

const ProtectedRoute: React.FC = ({ children }) => {
  const { authenticated, setRefreshToken, login } = useAuth()

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code')
    if (authenticated) return
    if (code) return login(code)
    const refreshToken = localStorage.getItem('SpotifyRefreshToken')
    if (refreshToken) {
      setRefreshToken(refreshToken)
    }
  }, [authenticated, setRefreshToken, login])

  if (!authenticated) return null
  return <>{children}</>
}

export default ProtectedRoute
