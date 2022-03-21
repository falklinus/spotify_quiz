import { login } from '../util'

const Login: React.FC = () => {
  return (
    <a
      className='py-2 px-4 rounded-md font-semibold uppercase border bg-green-600 text-white'
      href={login()}
    >
      Login with spotify
    </a>
  )
}

export default Login
