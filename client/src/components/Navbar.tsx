import { Link } from 'react-router-dom'
import { useAuth } from 'hooks'
import { Login, Logout } from 'components'

const Navbar = () => {
  const { accessToken } = useAuth()

  return (
    <div className='flex justify-between p-4 items-center border-b'>
      <Link to='/'>
        <span>Musicquizify</span>
      </Link>
      {accessToken ? <Logout /> : <Login />}
    </div>
  )
}

export default Navbar
