import { FunctionComponent, useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const Login: FunctionComponent = () => {
  function login() {
    /* fetch('http://localhost:8080/auth/login') */
    /* .then((resp) =>
    resp.json().then((data) => console.log(data))
  ) */
  }
  return (
    <button
      /* onClick={login} */
      className='py-2 px-4 rounded-md bg-green-600 text-white font-semibold uppercase'
    >
      Log in with spotify
    </button>
  )
}

const App: FunctionComponent = () => {
  const [data, setData] = useState<{ message: string } | null>(null)

  useEffect(() => {
    fetch('http://localhost:8080/home').then((resp) => {
      console.log(resp)
      resp.json().then(setData)
    })
  }, [])

  return (
    <Router>
      {data ? JSON.stringify(data.message) : 'loading...'}
      <Routes>
        <Route path='/home' element={<div>Home</div>} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App
