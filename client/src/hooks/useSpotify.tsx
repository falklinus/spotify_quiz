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
import { useQuery } from 'react-query'

const useSpotifyManager = () => {
  const Spotify = useMemo(() => new SpotifyWebApi(), [])
  const { accessToken } = useAuth()
  useEffect(() => {
    if (accessToken) Spotify.setAccessToken(accessToken)
    else Spotify.setAccessToken('')
  }, [accessToken, Spotify])

  const { data: playlists, isLoading: isPlaylistsLoading } = useQuery(
    'playlists',
    () => Spotify.getUserPlaylists().then((resp) => resp.items),
    {
      enabled: !!accessToken,
    }
  )

  /*****
  Replaced By useQuery

  const [playlists, setPlaylists] = useState<
    SpotifyApi.PlaylistObjectSimplified[]
  >([])
  useEffect(() => {
    if (!accessToken) return
    Spotify.getUserPlaylists()
      .then((resp) => resp.items)
      .then(setPlaylists)
  }, [Spotify, accessToken])
  *****/

  // Get tracks on playlist by ID
  const [playlistId, setPlaylistId] = useState('')
  const [playlistTracks, setPlaylistTracks] =
    useState<SpotifyApi.PlaylistTrackObject[]>()
  useEffect(() => {
    if (!playlistId) return
    Spotify.getPlaylistTracks(playlistId)
      .then((resp) => resp.items)
      .then(setPlaylistTracks)
  }, [Spotify, playlistId])

  // Filter playlist on search input
  const [searchPlaylist, setSearchPlaylist] = useState('')
  const filteredPlaylist = useMemo(
    () =>
      playlists?.filter((list) =>
        list.name.toLowerCase().includes(searchPlaylist.toLowerCase())
      ),
    [playlists, searchPlaylist]
  )

  // Get single track by ID
  const getTrackById = useCallback(
    async (trackId: string) => {
      const track = await Spotify.getTrack(trackId)
      if (track) return track
    },
    [Spotify]
  )

  return {
    playlists: filteredPlaylist,
    isPlaylistsLoading,
    searchPlaylist,
    setSearchPlaylist,
    playlistTracks,
    setPlaylistId,
    getTrackById,
  }
}

const SpotifyContext = createContext<ReturnType<typeof useSpotifyManager>>({
  playlists: [],
  isPlaylistsLoading: false,
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
