import { Request, Response } from 'express'
import config from '../../config'
import SpotifyWebApi from 'spotify-web-api-node'

export const authService = {
  login: (req: Request, res: Response) => {
    const { code } = req.body
    const spotifyApi = new SpotifyWebApi({
      redirectUri: config.spotifyClient.redirectURI,
      clientId: config.spotifyClient.id,
      clientSecret: config.spotifyClient.secret,
    })

    spotifyApi
      .authorizationCodeGrant(code)
      .then((data: any) => {
        res.json({
          accessToken: data.body.access_token,
          refreshToken: data.body.refresh_token,
          expiresIn: data.body.expires_in,
        })
      })
      .catch((err: any) => {
        console.log(err)
        res.sendStatus(400)
      })
  },

  refresh: (req: Request, res: Response) => {
    const { refreshToken } = req.body
    const spotifyApi = new SpotifyWebApi({
      redirectUri: config.spotifyClient.redirectURI,
      clientId: config.spotifyClient.id,
      clientSecret: config.spotifyClient.secret,
      refreshToken,
    })

    spotifyApi
      .refreshAccessToken()
      .then((data: any) => {
        res.json({
          accessToken: data.body.access_token,
          expiresIn: data.body.expires_in,
        })
      })
      .catch((err: any) => {
        console.log(err)
        res.sendStatus(400)
      })
  },
}
