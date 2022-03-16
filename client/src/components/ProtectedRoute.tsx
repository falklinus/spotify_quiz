import { Navigate } from 'react-router'
import { useSpotify } from '../Services/Spotify'

const ProtectedRoute: React.FC = ({ children }) => {
  const { authenticated } = useSpotify()
  if (!authenticated) return <Navigate to='/login' />
  return <>{children}</>
}

export default ProtectedRoute
