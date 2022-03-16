import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import SpotifyWebApi from 'spotify-web-api-js'
import useLocalStorage from '../hooks/useLocalStorage'
import { handleTokenUrlResponse, login } from '../util'

const useSpotifyManager = () => {
  const storageChange = useCallback((e) => {
    if (e.storageArea === localStorage) {
      if (!localStorage.getItem('SpotifyToken')) window.location.href = '/'
    }
  }, [])

  useEffect(() => {
    window.addEventListener('storage', storageChange)
    return () => {
      window.removeEventListener('storage', storageChange)
    }
  }, [storageChange])

  const Spotify = useMemo(() => new SpotifyWebApi(), [])

  const [token, setToken] = useLocalStorage<{
    access_token: string
    expires: number
  }>('SpotifyToken', { access_token: '', expires: 0 })

  const setAccessToken = () => {
    const hash = handleTokenUrlResponse()
    if (hash) {
      Spotify.setAccessToken(hash.access_token)
      setToken(hash)
      return
    }
    if (!token.access_token && !hash) return
    if (!hash) Spotify.setAccessToken(token.access_token)
    if (!Spotify.getAccessToken()) {
      setToken({ access_token: '', expires: 0 })
      window.location.href = '/'
    }
  }

  setAccessToken()

  const getPlaylists = useCallback(async () => {
    if (!Spotify.getAccessToken()) return []
    return (await Spotify.getUserPlaylists()).items
  }, [Spotify])

  const [playlists, setPlaylists] = useState<
    SpotifyApi.PlaylistObjectSimplified[]
  >([])
  useEffect(() => {
    getPlaylists().then(setPlaylists)
  }, [])

  const logout = () => {
    Spotify.setAccessToken('')
    setToken({ access_token: '', expires: 0 })
    localStorage.removeItem('SpotifyToken')
  }

  return {
    authenticated: !!Spotify.getAccessToken(),
    playlists,
    /* getPlaylists, */
    logout,
  }
}

const SpotifyContext = createContext<ReturnType<typeof useSpotifyManager>>({
  authenticated: false,
  playlists: [],
  // getPlaylists: () => new Promise(() => {}),
  logout: () => {},
})

export const SpotifyProvider: React.FC = ({ children }) => {
  return (
    <SpotifyContext.Provider value={useSpotifyManager()}>
      {children}
    </SpotifyContext.Provider>
  )
}

export const useSpotify = () => {
  const { authenticated, playlists, /* getPlaylists, */ logout } =
    useContext(SpotifyContext)

  return { authenticated, playlists, login, /* getPlaylists, */ logout }
}
