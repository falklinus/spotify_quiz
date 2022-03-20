// import React, { createContext, useContext, useEffect, useState } from 'react'
// import { login } from '../util'
// import { useLocalStorage } from 'hooks'

// function useAuthManager() {
//   const [token, setToken] = useLocalStorage('SpotifyToken', {
//     token: '',
//     expires: 0,
//   })
//   const [authenticated, setAuthenticated] = useState(false)

//   useEffect(() => {
//     if (token.token && token.expires > Date.now()) {
//       setAuthenticated(true)
//     } else {
//       setAuthenticated(false)
//     }
//   }, [token.token, token.expires])

//   const logout = () => {
//     setToken({
//       token: '',
//       expires: 0,
//     })
//   }

//   return {
//     authenticated,
//     token,
//     setToken,
//     logout,
//     login,
//   }
// }

// const AuthContext = createContext<ReturnType<typeof useAuthManager>>({
//   authenticated: false,
//   token: { token: '', expires: 0 },
//   setToken: () => {},
//   logout: () => {},
//   login: () => '',
// })
// export const AuthProvider: React.FC = ({ children }) => {
//   return (
//     <AuthContext.Provider value={useAuthManager()}>
//       {children}
//     </AuthContext.Provider>
//   )
// }
import { useState, useEffect, createContext, useContext } from 'react'
import axios from 'axios'

function useAuthManager() {
  const [code, setCode] = useState('')
  const [accessToken, setAccessToken] = useState('')
  const [refreshToken, setRefreshToken] = useState('')
  const [expiresIn, setExpiresIn] = useState(0)

  const logout = () => {
    localStorage.removeItem('SpotifyCode')
    setCode('')
  }

  useEffect(() => {
    console.log(code)
    if (!code) return
    axios
      .post('http://localhost:8080/auth/login', {
        code,
      })
      .then((res) => {
        setAccessToken(res.data.accessToken)
        setRefreshToken(res.data.refreshToken)
        setExpiresIn(res.data.expiresIn)

        localStorage.setItem('SpotifyCode', res.data.refreshToken)
        localStorage.setItem('ExpiresIn', res.data.expiresIn)

        window.history.pushState({}, '', '/')
      })
      .catch(() => {
        logout()
        // window.location.href = '/'
      })
  }, [code])

  useEffect(() => {
    if (!refreshToken || !expiresIn) return
    console.log('expires and refresh')
    const interval = setInterval(() => {
      axios
        .post('http://localhost:8080/auth/refresh', {
          refreshToken,
        })
        .then((res) => {
          console.log(res)
          setAccessToken(res.data.accessToken)
          setExpiresIn(res.data.expiresIn)
          localStorage.setItem('ExpiresIn', res.data.expiresIn)
        })
        .catch((err: any) => {
          console.log(err)
          logout()
          // window.location.href = '/'
        })
    }, (expiresIn - 60) * 1000)

    return () => clearInterval(interval)
  }, [refreshToken, expiresIn])

  return { accessToken, setCode, logout, setRefreshToken, setExpiresIn }
}

const AuthContext = createContext<ReturnType<typeof useAuthManager>>({
  accessToken: '',
  setCode: () => {},
  logout: () => {},
  setRefreshToken: () => {},
  setExpiresIn: () => {},
})
export const AuthProvider: React.FC = ({ children }) => {
  return (
    <AuthContext.Provider value={useAuthManager()}>
      {children}
    </AuthContext.Provider>
  )
}
export default function useAuth() {
  return useContext(AuthContext)
}
