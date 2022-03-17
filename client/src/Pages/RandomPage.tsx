import { Link } from 'react-router-dom'
import { useSpotify } from 'hooks'

const RandomPage = () => {
  const { searchPlaylist } = useSpotify()
  return (
    <div>
      <Link to='/'>
        <button className='py-2 px-4 rounded-md font-semibold uppercase border'>
          Back
        </button>
      </Link>
      <p>RandomPage</p>

      <p>{searchPlaylist}</p>
    </div>
  )
}

export default RandomPage
