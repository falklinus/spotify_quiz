import { useEffect } from 'react'
import { useAuth } from 'hooks'
import { parseHash } from '../util'
const ProtectedRoute: React.FC = ({ children }) => {
  const { authenticated, setToken } = useAuth()

  useEffect(() => {
    const hash = window.location.hash
    if (!hash) return
    const parsedHash = parseHash(hash)
    if (!parsedHash) return
    setToken({ token: parsedHash.token, expires: parsedHash.expires })
  }, [setToken])

  if (!authenticated) return null
  return <>{children}</>
}

export default ProtectedRoute
