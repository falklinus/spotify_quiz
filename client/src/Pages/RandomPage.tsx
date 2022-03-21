import { Link } from 'react-router-dom'

const RandomPage: React.FC = () => {
  return (
    <div>
      <Link to='/'>
        <button className='py-2 px-4 rounded-md font-semibold uppercase border'>
          Back
        </button>
      </Link>
      <p>RandomPage</p>
    </div>
  )
}

export default RandomPage
