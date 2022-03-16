import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import PlayLists from './Pages/PlayLists'
import Home from './Pages/Home'
import Login from './Pages/Login'
import RandomPage from './Pages/RandomPage'
import ProtectedRoute from './components/ProtectedRoute'
import { SpotifyProvider } from './Services/Spotify'
import { useCallback, useEffect } from 'react'

const App: React.FC = () => {
  return (
    <SpotifyProvider>
      <Layout>
        <Router>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route
              path='/'
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path='/playlists'
              element={
                <ProtectedRoute>
                  <PlayLists />
                </ProtectedRoute>
              }
            />
            <Route
              path='/random-page'
              element={
                <ProtectedRoute>
                  <RandomPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </Layout>
    </SpotifyProvider>
  )
}

export default App
