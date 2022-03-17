import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import SpotifyWebApi from 'spotify-web-api-js'
import { useAuth } from 'hooks'

const useSpotifyManager = () => {
  const Spotify = useMemo(() => new SpotifyWebApi(), [])
  const {
    authenticated,
    token: { token },
  } = useAuth()

  useEffect(() => {
    if (authenticated) Spotify.setAccessToken(token)
    else Spotify.setAccessToken('')
  }, [authenticated, token, Spotify])

  /*
    Manage playlist search through context
  */
  // State variables for search and playlist response
  const [searchPlaylist, setSearchPlaylist] = useState('')
  const [playlists, setPlaylists] = useState<
    SpotifyApi.PlaylistObjectSimplified[]
  >([])

  // Function to get playlists from Api
  const getPlaylists = useCallback(async () => {
    if (!authenticated) return []
    return (await Spotify.getUserPlaylists()).items
  }, [Spotify, authenticated])

  // Get playlists on load and store in state
  useEffect(() => {
    getPlaylists().then(setPlaylists)
  }, [getPlaylists])

  // Filter playlist on search input
  const filteredPlaylist = useMemo(
    () =>
      playlists.filter((list) =>
        list.name.toLowerCase().includes(searchPlaylist.toLowerCase())
      ),
    [playlists, searchPlaylist]
  )

  return {
    playlists: filteredPlaylist,
    searchPlaylist,
    setSearchPlaylist,
  }
}

const SpotifyContext = createContext<ReturnType<typeof useSpotifyManager>>({
  playlists: [],
  searchPlaylist: '',
  setSearchPlaylist: () => {},
})

export const SpotifyProvider: React.FC = ({ children }) => {
  return (
    <SpotifyContext.Provider value={useSpotifyManager()}>
      {children}
    </SpotifyContext.Provider>
  )
}

export default function useSpotify() {
  return useContext(SpotifyContext)
}
