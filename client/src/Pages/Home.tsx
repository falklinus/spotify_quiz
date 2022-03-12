import React, { useContext } from 'react'
import Playlists from '../components/Playlists'
import { getAuthUrl } from '../Services/Spotify'
import { UserContext } from '../Services/UserContext'

const Login: React.FC = () => {
	return (
		<div className='p-8'>
			<a
				className='py-2 px-4 rounded-md bg-green-600 text-white font-semibold uppercase'
				href={getAuthUrl()}
			>
				Login with spotify
			</a>
		</div>
	)
}
const Home = () => {
	const userContext = useContext(UserContext)
	const userToken = userContext?.userToken

	if (!userToken) return <Login />
	return (
		<>
			<div>Hello</div>
			<button
				className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
				onClick={() => userContext?.logoutUser()}
			>
				Logout
			</button>
			<Playlists></Playlists>
		</>
	)
}

export default Home
