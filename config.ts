import { config } from 'dotenv'

if (process.env.NODE_ENV !== 'production') config()

export default {
  spotifyClient: {
    id: process.env.SPOTIFY_CLIENT_ID || 'spotify-client-id',
    secret: process.env.SPOTIFY_CLIENT_SECRET || 'spotify-client-secret',
    redirectURI: process.env.SPOTIFY_REDIRECT_URI || 'http://localhost:3000/',
  },
  app: {
    PORT: process.env.APP_PORT || 8080,
  },
}
