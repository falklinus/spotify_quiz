import { useEffect, useState } from 'react'
import { useSpotify } from '../Services/Spotify'
import PlaylistItem from './PlayListItem'

const PlayLists = () => {
  const { getPlaylists } = useSpotify()
  const [playlists, setPlaylists] = useState<
    SpotifyApi.PlaylistObjectSimplified[]
  >([])
  const [filtered, setFiltered] = useState<
    SpotifyApi.PlaylistObjectSimplified[]
  >([])

  useEffect(() => {
    getPlaylists().then((data) => {
      setPlaylists(data)
      setFiltered(data)
    })
  }, [getPlaylists])

  const filter = (search: string) => {
    console.log(search)
    if (!search) return setFiltered(playlists)
    setFiltered(
      playlists.filter((list) =>
        list.name.toLowerCase().includes(search.toLowerCase())
      )
    )
  }

  if (!playlists) return null
  return (
    <>
      <p className='text-2xl font-bold mb-4'>Your playlists</p>
      <input
        className='mb-4 rounded-lg border px-4 py-2 outline-none w-full'
        type='text'
        onChange={({ target }) => filter(target.value)}
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
