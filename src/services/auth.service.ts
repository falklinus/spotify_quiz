import { Request, Response } from 'express'
import config from '../../config'

function generateRandomString(length: number): string {
	let text = ''
	const possible =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

	for (let i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length))
	}
	return text
}

export const authService = {
	login: (_: Request, res: Response) => {
		const scope = 'user-read-private user-read-email'
		const redirect_uri = 'http%3A%2F%2Flocalhost:3000/home'
		const state = generateRandomString(16)
		res.redirect(
			`https://accounts.spotify.com/authorize?response_type=code&client_id=${config.spotifyClient.id}&scope=${scope}&state=${state}&redirect_uri=${redirect_uri}`
		)
	},

	refresh: (req: Request, res: Response) => {
		const { refreshToken } = req.query

		const body = new FormData()
		body.append('grant_type', 'refresh_token')
		body.append('refresh_token', `${refreshToken}`)

		fetch('https://accounts.spotify.com/api/token', {
			method: 'POST',
			headers: {
				Authorization: `Basic ${config.spotifyClient.id}:${config.spotifyClient.secret}`,
			},
			body,
		})
			.then(resp => resp.json())
			.then(data => res.json(data))
	},
}
