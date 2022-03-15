import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react'
import SpotifyWebApi from 'spotify-web-api-js'
import { handleTokenUrlResponse, login } from '../util'
import useLocalStorage from './useLocalStorage'

type WebApi = SpotifyWebApi.SpotifyWebApiJs

type ActionType =
  | { type: 'SET_TOKEN'; token: string }
  | { type: 'REMOVE'; id: number }

function useSpotifyManager(initialWebApi: WebApi): {
  webApi: WebApi
  setAuthToken: (token: string) => void
} {
  const [webApi, dispatch] = useReducer((state: WebApi, action: ActionType) => {
    switch (action.type) {
      case 'SET_TOKEN':
        state.setAccessToken(action.token)
        return state
      default:
        throw new Error()
    }
  }, initialWebApi)

  const setAuthToken = useCallback((token: string) => {
    dispatch({
      type: 'SET_TOKEN',
      token,
    })
  }, [])

  return { webApi, setAuthToken }
}

const SpotifyContext = createContext<ReturnType<typeof useSpotifyManager>>({
  webApi: new SpotifyWebApi(),
  setAuthToken: () => {},
})

export const SpotifyProvider: React.FC = ({ children }) => (
  <SpotifyContext.Provider value={useSpotifyManager(new SpotifyWebApi())}>
    {children}
  </SpotifyContext.Provider>
)

type Token = {
  access_token: string
  expires: number
}

export default function useSpotify() {
  const { webApi, setAuthToken } = useContext(SpotifyContext)
  const [token, setToken] = useLocalStorage<Token>('SpotifyToken', {
    access_token: '',
    expires: 0,
  })

  useEffect(() => {
    const newToken = handleTokenUrlResponse()
    if (newToken) {
      setToken(newToken)
      setAuthToken(newToken.access_token)
      window.location.href = '/'
      return
    }
    if (!token.access_token) return
    if (token.expires < Date.now()) {
      setToken({ access_token: '', expires: 0 })
      setAuthToken('')
    }
  }, [])

  return { webApi, token, login }
}
