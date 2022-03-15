import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
// import SpotifyProvider from './Services/Spotify'
// import UserProvider from './Services/UserContext'
// import useSpotify, { SpotifyProvider } from './hooks/useSpotify'

const App: React.FC = () => {
  // const { token } = useSpotify()

  return (
    <Router>
      {/* <SpotifyProvider> */}
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
      {/* </SpotifyProvider> */}
    </Router>
  )
}

export default App
