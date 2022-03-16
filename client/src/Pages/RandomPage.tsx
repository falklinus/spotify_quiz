import { useSpotify } from '../Services/Spotify'

const RandomPage = () => {
  const { authenticated } = useSpotify()
  console.log(authenticated)
  return <div>RandomPage</div>
}

export default RandomPage
