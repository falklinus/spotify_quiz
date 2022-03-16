import PlayLists from '../components/PlayLists'
import { useSpotify } from '../Services/Spotify'

const Login: React.FC = () => {
  const { login } = useSpotify()
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
const Home = () => {
  const { authenticated } = useSpotify()

  if (!authenticated) return <Login />
  return <PlayLists />
}

export default Home
