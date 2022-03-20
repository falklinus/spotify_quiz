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

  const { accessToken } = useAuth()

  useEffect(() => {
    if (accessToken) Spotify.setAccessToken(accessToken)
    else Spotify.setAccessToken('')
  }, [accessToken, Spotify])

  /*
    Manage playlist search through context
  */
  // State variables for search and playlist response
  const [searchPlaylist, setSearchPlaylist] = useState('')
  const [playlists, setPlaylists] = useState<
    SpotifyApi.PlaylistObjectSimplified[]
  >([])
  const [playlistId, setPlaylistId] = useState('')
  const [playlistTracks, setPlaylistTracks] =
    useState<SpotifyApi.PlaylistTrackObject[]>()

  // Function to get playlists from Api
  useEffect(() => {
    if (!accessToken) return
    Spotify.getUserPlaylists()
      .then((resp) => resp.items)
      .then(setPlaylists)
  }, [Spotify, accessToken])

  // Get single playlist with ID from Api
  useEffect(() => {
    if (!playlistId) return
    Spotify.getPlaylistTracks(playlistId)
      .then((resp) => resp.items)
      .then(setPlaylistTracks)
  }, [Spotify, playlistId])

  // Filter playlist on search input
  const filteredPlaylist = useMemo(
    () =>
      playlists.filter((list) =>
        list.name.toLowerCase().includes(searchPlaylist.toLowerCase())
      ),
    [playlists, searchPlaylist]
  )

  const getTrackById = useCallback(
    async (trackId: string) => {
      const track = await Spotify.getTrack(trackId)
      if (track) return track
    },
    [Spotify]
  )

  return {
    playlists: filteredPlaylist,
    searchPlaylist,
    setSearchPlaylist,
    playlistTracks,
    setPlaylistId,
    getTrackById,
  }
}

const SpotifyContext = createContext<ReturnType<typeof useSpotifyManager>>({
  playlists: [],
  searchPlaylist: '',
  setSearchPlaylist: () => {},
  playlistTracks: [],
  setPlaylistId: () => {},
  getTrackById: async () => undefined,
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
