import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home, Playlists, RandomPage, Playlist } from 'Pages'
import { Layout, ProtectedRoute } from 'components'
import { AuthProvider, SpotifyProvider } from 'hooks'

const App: React.FC = () => {
  console.log('render')
  return (
    <AuthProvider>
      <SpotifyProvider>
        <Router>
          <Layout>
            <Routes>
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
                    <Playlists />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/playlists/:id'
                element={
                  <ProtectedRoute>
                    <Playlist />
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
          </Layout>
        </Router>
      </SpotifyProvider>
    </AuthProvider>
  )
}

export default App
