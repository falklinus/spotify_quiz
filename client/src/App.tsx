import { FunctionComponent } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import SpotifyProvider from './Services/Spotify'
import UserProvider from './Services/UserContext'

const App: FunctionComponent = () => {
	return (
		<Router>
			<SpotifyProvider>
				<UserProvider>
					<Routes>
						<Route path='/' element={<Home />} />
					</Routes>
				</UserProvider>
			</SpotifyProvider>
		</Router>
	)
}

export default App
