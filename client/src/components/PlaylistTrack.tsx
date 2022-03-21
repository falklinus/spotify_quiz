const PlaylistTrack: React.FC<{
  track: SpotifyApi.TrackObjectFull | SpotifyApi.EpisodeObjectFull
}> = ({ track }) => {
  interface Artist {
    id: string
    name: string
  }

  interface Track {
    album: {
      images: { height: number; width: number; url: string }[]
    }
    artists: { id: string; name: string }[]
    name: string
  }

  return (
    <div className='border rounded-lg flex shadow gap-4 items-center p-4 cursor-pointer hover:-translate-x-2 transition duration-200'>
      <img
        className='h-full object-cover rounded'
        src={(track as any).album?.images[2]?.url}
        alt='Album Cover'
      />
      <div>
        <p className=''>{track?.name}</p>
        <div className='text-sm text-gray-400 flex gap-2'>
          {(track as Track).artists.map((artist: Artist) => (
            <p key={artist.id}>{artist.name}</p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PlaylistTrack
