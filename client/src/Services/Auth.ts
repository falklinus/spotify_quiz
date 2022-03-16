import { useState, useEffect } from 'react'
import axios from 'axios'

export default function useAuth(code: string) {
  const [accessToken, setAccessToken] = useState('')
  const [refreshToken, setRefreshToken] = useState('')
  const [expiresIn, setExpiresIn] = useState(0)
  console.log(code)
  useEffect(() => {
    // if (!code) return
    axios
      .post('http://localhost:8080/auth/login', {
        code,
      })
      .then((res) => {
        setAccessToken(res.data.accessToken)
        setRefreshToken(res.data.refreshToken)
        setExpiresIn(res.data.expiresIn)
        localStorage.setItem('SpotifyToken', res.data.accessToken)
        // window.location.hash = ''
      })
      .catch((err: any) => {
        console.log('err', err)
        window.history.pushState(null, '', '/login')
      })
  }, [code])

  useEffect(() => {
    if (!refreshToken || !expiresIn) return
    const interval = setInterval(() => {
      axios
        .post('http://localhost:8080/auth/refresh', {
          refreshToken,
        })
        .then((res) => {
          setAccessToken(res.data.accessToken)
          setExpiresIn(res.data.expiresIn)
        })
        .catch((err: any) => {
          console.log('err', err)
          window.history.pushState(null, '', '/login')
        })
    }, (expiresIn - 60) * 1000)

    return () => clearInterval(interval)
  }, [refreshToken, expiresIn])

  return accessToken
}
