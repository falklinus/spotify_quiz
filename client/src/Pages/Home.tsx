import React, { useEffect, useState } from 'react'
import { useSpotify } from '../Services/Spotifyv2'

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
  const { authenticated, getPlaylists } = useSpotify()
  const [playlists, setPlaylists] = useState<
    SpotifyApi.PlaylistObjectSimplified[]
  >([])

  useEffect(() => {
    getPlaylists().then(setPlaylists)
  }, [])

  if (!authenticated) return <Login />
  return (
    <div className='p-10 grid gap-6'>
      <p className='text-2xl font-bold'>Your playlists</p>
      <div className='grid grid-cols-4 gap-4 '>
        {playlists.map((list: any) => (
          <div
            key={list.id}
            className='flex flex-col rounded-lg shadow cursor-pointer'
          >
            {list.images[0]?.url ? (
              <img className='w-full rounded-t-lg' src={list.images[0].url} />
            ) : list.images[1]?.url ? (
              <img className='w-full rounded-t-lg' src={list.images[1].url} />
            ) : list.images[1]?.url ? (
              <img className='w-full rounded-t-lg' src={list.images[2].url} />
            ) : (
              ''
            )}
            <div className='p-4 text-xs flex items-center justify-center h-full'>
              <p className='text-center'>{`${list.name}`}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
