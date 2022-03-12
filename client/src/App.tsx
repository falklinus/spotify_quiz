import { FunctionComponent } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const Login: FunctionComponent = () => {
	return (
		<button className='py-2 px-4 rounded-md bg-green-600 text-white font-semibold uppercase'>
			<a href='http://localhost:8080/auth/login'>Log in with spotify</a>
		</button>
	)
}

const App: FunctionComponent = () => {
	return (
		<Router>
			<Routes>
				<Route path='/home' element={<div>Home</div>} />
				<Route path='/login' element={<Login />} />
			</Routes>
		</Router>
	)
}

export default App
