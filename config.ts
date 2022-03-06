import { config } from 'dotenv'

if (process.env.NODE_ENV === 'development') config()

export default {
  spotifyClient: {
    id: process.env.SPOTIFY_CLIENT_ID || 'spotify-client-id',
    secret: process.env.SPOTIFY_CLIENT_SECRET || 'spotify-client-secret',
  },
  app: {
    PORT: process.env.APP_PORT || 8080,
  },
}
