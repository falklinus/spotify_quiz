import { Link } from 'react-router-dom'
import { useSpotify } from '../Services/Spotify'

const Home = () => {
  const { logout } = useSpotify()
  return (
    <>
      <Link to='/playlists'>
        <button className='py-2 px-4 rounded-md font-semibold uppercase border'>
          Playlists
        </button>
      </Link>
      <button onClick={logout}>Logout</button>
    </>
  )
}

export default Home
