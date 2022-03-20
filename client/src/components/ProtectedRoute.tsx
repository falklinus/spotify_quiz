import { useEffect } from 'react'
import { useAuth } from 'hooks'
import { parseHash } from '../util'

const code = new URLSearchParams(window.location.search).get('code')
console.log(code)

const ProtectedRoute: React.FC = ({ children }) => {
  //const { authenticated, setToken } = useAuth(code)
  const { accessToken, setCode, setRefreshToken, setExpiresIn } = useAuth()

  useEffect(() => {
    if (accessToken) return
    if (code) return setCode(code)
    const storedCode = localStorage.getItem('SpotifyCode')
    const storedExpiry = localStorage.getItem('ExpiresIn')
    console.log(storedCode)
    console.log(storedExpiry)
    if (storedCode && storedExpiry) {
      setRefreshToken(storedCode)
      setExpiresIn(parseInt(storedExpiry))
    }
  }, [accessToken, code])

  // useEffect(() => {
  //   const hash = window.location.hash
  //   if (!hash) return
  //   const parsedHash = parseHash(hash)
  //   if (!parsedHash) return
  //   setToken({ token: parsedHash.token, expires: parsedHash.expires })
  // }, [setToken])

  if (!accessToken) return null
  return <>{children}</>
}

export default ProtectedRoute
