import { createContext, useState } from 'react'
import SpotifyWebApi from 'spotify-web-api-js'

interface SpotifyWebApiContextModel {
  spotifyWebApi: SpotifyWebApi.SpotifyWebApiJs
  setSpotifyWebApiAuthToken: (token: string | null) => void
  token: string | null
}

function generateRandomString(length: number): string {
  let text = ''
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

export const SpotifyWebApiContext =
  createContext<SpotifyWebApiContextModel | null>(null)

export const getAuthUrl = (): string => {
  const client_id = 'f8f1a87f489e411da6b5bf741c103b49'
  const scopes = [
    'streaming',
    'user-read-email',
    'user-read-private',
    'user-read-currently-playing',
    'user-read-playback-state',
    'user-modify-playback-state',
    'playlist-read-private',
    'playlist-read-collaborative',
  ].join(' ')

  const redirect_uri = 'http://localhost:3000/'

  const state = generateRandomString(16)
  localStorage.setItem('stateKey', state)

  let url = 'https://accounts.spotify.com/authorize'
  url += '?response_type=token'
  url += '&client_id=' + encodeURIComponent(client_id)
  url += '&scope=' + encodeURIComponent(scopes)
  url += '&redirect_uri=' + encodeURIComponent(redirect_uri)
  url += '&state=' + encodeURIComponent(state)

  return url
}

const SpotifyProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [spotifyWebApi, setSpotifyWebApi] = useState(new SpotifyWebApi())
  const [token, setToken] = useState<string | null>(null)

  const setSpotifyWebApiAuthToken = (token: string | null) => {
    spotifyWebApi.setAccessToken(token)
    setSpotifyWebApi(spotifyWebApi)
    setToken(token)
  }

  return (
    <SpotifyWebApiContext.Provider
      value={{ spotifyWebApi, setSpotifyWebApiAuthToken, token }}
    >
      {children}
    </SpotifyWebApiContext.Provider>
  )
}

export default SpotifyProvider
