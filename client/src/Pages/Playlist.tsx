import { PlaylistTrack } from 'components'
import LoadingPlaylistTracks from 'components/LoadingPlaylistTracks'
import { useSpotify } from 'hooks'
import { useEffect } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'

const Playlist: React.FC = () => {
  const { getPlaylistTracks } = useSpotify()
  const { id } = useParams()
  const { data: playlistTracks, isLoading } = useQuery(['playlist', id], () =>
    getPlaylistTracks(id as string)
  )

  return (
    <>
      <Link to='/playlists'>
        <button className='py-2 px-4 rounded-md font-semibold uppercase border mb-8'>
          Back
        </button>
      </Link>
      {isLoading && <LoadingPlaylistTracks />}
      <div className='flex flex-col gap-2'>
        {playlistTracks?.map(({ track }) => (
          <PlaylistTrack key={track.id} track={track} />
        ))}
      </div>
    </>
  )
}

export default Playlist
