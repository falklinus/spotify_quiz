import { useCallback, useMemo } from 'react'
import SpotifyWebApi from 'spotify-web-api-js'
import useLocalStorage from '../hooks/useLocalStorage'
import { handleTokenUrlResponse, login } from '../util'

export const useSpotify = () => {
  const Spotify = useMemo(() => new SpotifyWebApi(), [SpotifyWebApi])
  const [token, setToken] = useLocalStorage<{
    access_token: string
    expires: number
  }>('SpotifyToken', { access_token: '', expires: 0 })

  const hash = handleTokenUrlResponse()

  if (hash) {
    console.log('hash', hash)
    setToken(hash)
    Spotify.setAccessToken(hash.access_token)
  } else {
    console.log('token', token)
    Spotify.setAccessToken(token.access_token)
    if (token.access_token && token.expires < Date.now()) {
      console.log('token', token)
      setToken({ access_token: '', expires: 0 })
    }
  }

  const getPlaylists = useCallback(async () => {
    return (await Spotify.getUserPlaylists()).items
  }, [Spotify])
  return { authenticated: !!token.access_token, login, getPlaylists }
}
