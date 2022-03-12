import React from 'react'
const Login: React.FC = () => {
	return (
		<button className='py-2 px-4 rounded-md bg-green-600 text-white font-semibold uppercase'>
			<a href='http://localhost:8080/auth/login'>Log in with spotify</a>
		</button>
	)
}
const Home = () => {
	return <Login />
}

export default Home
