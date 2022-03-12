import React from 'react'

const PlaylistItem: React.FC<{
	playlist: SpotifyApi.PlaylistObjectSimplified
}> = (playlist) => {
	return <div>{playlist.playlist.name}</div>
}

export default PlaylistItem
