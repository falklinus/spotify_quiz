import { Link } from 'react-router-dom'
const Home = () => {
  return (
    <>
      <Link to='/playlists'>
        <button className='py-2 px-4 rounded-md font-semibold uppercase border'>
          Playlists
        </button>
      </Link>
      <Link to='/random-page'>
        <button className='py-2 px-4 rounded-md font-semibold uppercase border'>
          Random Page
        </button>
      </Link>
    </>
  )
}

export default Home
