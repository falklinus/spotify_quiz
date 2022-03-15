export function generateRandomString(length: number): string {
  let text = ''
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

export function handleTokenUrlResponse() {
  // Get the token from the response Url
  const hash = getSpotifyAuthRes()
  if (hash.access_token) {
    // Set token
    const spotifyToken = {
      access_token: hash.access_token,
      expires: Date.now() + hash.expires_in * 1000,
    }
    return spotifyToken
  }
  return null
}

function getSpotifyAuthRes() {
  // Get the hash of the url

  const hash = window.location.hash
    .substring(1)
    .split('&')
    .reduce(function (initial: any, item) {
      if (item) {
        var parts = item.split('=')
        initial[parts[0]] = decodeURIComponent(parts[1])
      }
      return initial
    }, {})
  window.location.hash = ''
  return hash
}

export function login(): string {
  const client_id = 'f8f1a87f489e411da6b5bf741c103b49'
  const scopes = [
    'streaming',
    'user-read-email',
    'user-read-private',
    'user-read-currently-playing',
    'user-read-playback-state',
    'user-modify-playback-state',
    'playlist-read-private',
    'playlist-read-collaborative',
  ].join(' ')

  const redirect_uri = 'http://localhost:3000/'

  const state = generateRandomString(16)
  localStorage.setItem('stateKey', state)

  let url = 'https://accounts.spotify.com/authorize'
  url += '?response_type=token'
  url += '&client_id=' + encodeURIComponent(client_id)
  url += '&scope=' + encodeURIComponent(scopes)
  url += '&redirect_uri=' + encodeURIComponent(redirect_uri)
  url += '&state=' + encodeURIComponent(state)

  return url
}
