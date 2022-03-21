import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home, Playlists, RandomPage, Playlist } from 'Pages'
import { Layout, ProtectedRoute } from 'components'
import { AuthProvider /* , SpotifyProvider */ } from 'hooks'
import { QueryClientProvider, QueryClient } from 'react-query'

const queryClient = new QueryClient()

const App: React.FC = () => {
  console.log('render')
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {/* <SpotifyProvider> */}
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
        {/* </SpotifyProvider> */}
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
