import React, { useContext, useEffect, useState } from 'react'
import { SpotifyWebApiContext } from '../Services/Spotify'
import PlaylistItem from './PlaylistItem'

const Playlists = () => {
	const spotifyWebApi = useContext(SpotifyWebApiContext)?.spotifyWebApi
	const [playlists, setPlaylists] = useState<
		SpotifyApi.PlaylistObjectSimplified[]
	>([])

	useEffect(() => {
		if (spotifyWebApi?.getAccessToken()) {
			spotifyWebApi
				?.getUserPlaylists()
				.then((res) => {
					setPlaylists(res.items)
				})
				.catch((error) => console.log(error))
		}
		return
	}, [spotifyWebApi])

	return (
		<div className='grid grid-cols-2 gap-y-4'>
			{playlists.map((playlist) => {
				return (
					<PlaylistItem playlist={playlist} key={playlist.id}></PlaylistItem>
				)
			})}
		</div>
	)
}
export default Playlists
