import { Link } from 'react-router-dom'

const PlaylistItem: React.FC<{
  playlist: SpotifyApi.PlaylistObjectSimplified
}> = ({ playlist }) => {
  const { name, images, id } = playlist
  return (
    <Link to={`${id}`}>
      <div className='flex justify-center h-full'>
        <div className='flex xs:w-[200px] flex-col rounded-lg shadow cursor-pointer group hover:shadow-xl hover:-translate-y-1 transition duration-200'>
          <img
            className='w-full rounded-t-lg'
            alt=''
            src={images[0]?.url ?? images[1]?.url ?? images[2]?.url}
          />

          <div className='relative p-2 text-xs flex flex-col gap-2 items-center justify-center h-full'>
            <p className='text-center absolute group-hover:opacity-0 transition duration-200'>{`${name}`}</p>
            <button className='w-full h-full uppercase text-white group-hover:bg-blue-600 group-hover:shadow font-bold py-1 px-4 rounded transition duration-200'>
              create game
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default PlaylistItem
