import React, { useContext, useEffect } from 'react'
import useSpotify from '../hooks/useSpotify'

const Login: React.FC = () => {
  const { login } = useSpotify()
  return (
    <div className='p-8'>
      <a
        className='py-2 px-4 rounded-md bg-green-600 text-white font-semibold uppercase'
        href={login()}
      >
        Login with spotify
      </a>
    </div>
  )
}
const Home = () => {
  const { token } = useSpotify()
  if (!token?.access_token) return <Login />
  return <div>Hello</div>
}

export default Home
