import { useSpotify } from 'hooks'
import { useEffect, useState } from 'react'

const PlaylistTrack: React.FC<{
  track: SpotifyApi.TrackObjectFull | SpotifyApi.EpisodeObjectFull
}> = ({ track: { id } }) => {
  const [track, setTrack] =
    useState<SpotifyApi.SingleTrackResponse | undefined>(undefined)

  const { getTrackById } = useSpotify()

  useEffect(() => {
    getTrackById(id).then((res) => setTrack(res))
  }, [id, getTrackById])
  return (
    <div className='border rounded-lg flex shadow gap-4 items-center p-4 cursor-pointer hover:-translate-x-2 transition duration-200'>
      <img
        className='h-full object-cover'
        src={track?.album?.images[2]?.url}
        alt='Album Cover'
      />
      <div>
        <p className=''>{track?.name}</p>
        <p className='text-sm text-gray-400'>
          {track?.artists.map((artist) => artist.name)}
        </p>
      </div>
    </div>
  )
}

export default PlaylistTrack
