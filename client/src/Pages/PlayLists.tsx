import { Link } from 'react-router-dom'
import { LoadingPlaylists, PlaylistItem } from '../components'
import { useSpotify } from 'hooks'
import { useMemo, useState } from 'react'
import { useQuery } from 'react-query'

const PlayLists: React.FC = () => {
  const { getUserPlaylists } = useSpotify()
  const { data: playlists, isLoading } = useQuery('playlists', getUserPlaylists)
  const [searchPlaylist, setSearchPlaylist] = useState('')
  const filteredPlaylist = useMemo(
    () =>
      playlists?.filter((list) =>
        list.name.toLowerCase().includes(searchPlaylist.toLowerCase())
      ),
    [playlists, searchPlaylist]
  )

  return (
    <>
      <Link to='/'>
        <button className='py-2 px-4 rounded-md font-semibold uppercase border mb-8'>
          Back
        </button>
      </Link>
      <input
        className='mb-4 rounded-lg border px-4 py-2 outline-none w-full'
        type='text'
        value={searchPlaylist}
        onChange={({ target }) => setSearchPlaylist(target.value)}
        placeholder='Search Playlist'
      />
      <div className='grid gap-y-4 xs:grid-cols-[repeat(auto-fill,minmax(216px,1fr))]'>
        {isLoading && <LoadingPlaylists />}
        {filteredPlaylist?.map((list: any) => (
          <PlaylistItem key={list.id} playlist={list} />
        ))}
      </div>
    </>
  )
}

export default PlayLists
