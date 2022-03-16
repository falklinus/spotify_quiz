import { Navigate } from 'react-router'
import { useSpotify } from '../Services/Spotify'

const Login: React.FC = () => {
  const { authenticated, login } = useSpotify()
  if (authenticated) return <Navigate to='/' />

  return (
    <div className='p-8'>
      <a
        className='py-2 px-4 rounded-md bg-green-600 text-white font-semibold uppercase'
        href={login()}
      >
        Login with spotify
      </a>
    </div>
  )
}

export default Login
