import { useAuth } from 'hooks'

const Logout = () => {
  const { logout } = useAuth()

  return (
    <button
      onClick={logout}
      className='py-2 px-4 rounded-md font-semibold uppercase border'
    >
      Logout
    </button>
  )
}

export default Logout
