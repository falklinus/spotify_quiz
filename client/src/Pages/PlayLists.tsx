import { /* useEffect, */ useMemo, useState } from 'react'
import { useSpotify } from '../Services/Spotify'
import PlaylistItem from '../components/PlayListItem'
import { Link } from 'react-router-dom'

const PlayLists = () => {
  const { playlists /* , getPlaylists */ } = useSpotify()

  // const [playlists, setPlaylists] = useState<
  //   SpotifyApi.PlaylistObjectSimplified[]
  // >([])

  // useEffect(() => {
  //   getPlaylists().then(setPlaylists)
  //   return setPlaylists([])
  // }, [getPlaylists])

  const [filter, setFilter] = useState('')

  const filtered = useMemo(
    () =>
      playlists.filter((list) =>
        list.name.toLowerCase().includes(filter.toLowerCase())
      ),
    [playlists, filter]
  )

  return (
    <>
      <Link to='/'>
        <button className='py-2 px-4 rounded-md font-semibold uppercase border'>
          Back
        </button>
      </Link>
      <p className='text-2xl font-bold mb-4'>Your playlists</p>
      <input
        className='mb-4 rounded-lg border px-4 py-2 outline-none w-full'
        type='text'
        value={filter}
        onChange={({ target }) => setFilter(target.value)}
        placeholder='Search Playlist'
      />
      <div className='grid gap-y-4 xs:grid-cols-[repeat(auto-fill,minmax(216px,1fr))]'>
        {filtered.map((list: any) => (
          <PlaylistItem key={list.id} playlist={list} />
        ))}
      </div>
    </>
  )
}

export default PlayLists
