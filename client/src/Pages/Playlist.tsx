import { PlaylistTrack } from 'components'
import { useSpotify } from 'hooks'
import { useEffect } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'

const Playlist = () => {
  const { playlistTracks, setPlaylistId } = useSpotify()
  const { id } = useParams()
  useEffect(() => {
    if (id) setPlaylistId(id)
  }, [id, setPlaylistId])
  return (
    <>
      <Link to='/playlists'>
        <button className='py-2 px-4 rounded-md font-semibold uppercase border mb-8'>
          Back
        </button>
      </Link>
      <div className='flex flex-col gap-2'>
        {playlistTracks?.map(({ track }) => (
          <PlaylistTrack key={track.id} track={track} />
        ))}
      </div>
    </>
  )
}

export default Playlist
