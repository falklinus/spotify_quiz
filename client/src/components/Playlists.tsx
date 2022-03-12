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
			spotifyWebApi.searchPlaylists('stronk').then((res) => {
				console.log(res)
			})
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
		<>
			{playlists.map((playlist) => {
				return <PlaylistItem playlist={playlist}></PlaylistItem>
			})}
		</>
	)
}
export default Playlists
