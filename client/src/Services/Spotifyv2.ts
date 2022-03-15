import SpotifyWebApi from 'spotify-web-api-js'
import useLocalStorage from '../hooks/useLocalStorage'
import { handleTokenUrlResponse, login } from '../util'

export const useSpotify = () => {
  const Spotify = new SpotifyWebApi()
  const [token, setToken] = useLocalStorage<{
    access_token: string
    expires: number
  }>('SpotifyToken', { access_token: '', expires: 0 })

  const hash = handleTokenUrlResponse()

  if (!token.access_token && hash) {
    setToken(hash)
  }
  Spotify.setAccessToken(token.access_token)

  const getPlaylists = async () => {
    return (await Spotify.getUserPlaylists()).items
  }
  return { authenticated: !!token.access_token, login, getPlaylists }
}
