import {
  // createContext,
  useCallback,
  // useContext,
  useEffect,
  useMemo,
  // useState,
} from 'react'
import SpotifyWebApi from 'spotify-web-api-js'
import { useAuth } from 'hooks'

// const useSpotifyManager = () => {
//   const Spotify = useMemo(() => new SpotifyWebApi(), [])
//   const { accessToken } = useAuth()
//   useEffect(() => {
//     if (accessToken) Spotify.setAccessToken(accessToken)
//     else Spotify.setAccessToken('')
//   }, [accessToken, Spotify])

//   const getUserPlaylists = useCallback(
//     async () => (await Spotify.getUserPlaylists()).items,
//     [Spotify]
//   )

//   const getPlaylistTracks = useCallback(
//     async (id: string) => (await Spotify.getPlaylistTracks(id)).items,
//     [Spotify]
//   )

//   return {
//     getUserPlaylists,
//     getPlaylistTracks,
//   }
// }

// const SpotifyContext = createContext<ReturnType<typeof useSpotifyManager>>({
//   getUserPlaylists: async () => [],
//   getPlaylistTracks: async () => [],
// })

// export const SpotifyProvider: React.FC = ({ children }) => {
//   return (
//     <SpotifyContext.Provider value={useSpotifyManager()}>
//       {children}
//     </SpotifyContext.Provider>
//   )
// }

export default function useSpotify() {
  // return useContext(SpotifyContext)
  const Spotify = useMemo(() => new SpotifyWebApi(), [])
  const { accessToken } = useAuth()
  useEffect(() => {
    if (accessToken) Spotify.setAccessToken(accessToken)
    else Spotify.setAccessToken('')
  }, [accessToken, Spotify])

  const getUserPlaylists = useCallback(
    async () => (await Spotify.getUserPlaylists()).items,
    [Spotify]
  )

  const getPlaylistTracks = useCallback(
    async (id: string) => (await Spotify.getPlaylistTracks(id)).items,
    [Spotify]
  )

  return {
    getUserPlaylists,
    getPlaylistTracks,
  }
}
