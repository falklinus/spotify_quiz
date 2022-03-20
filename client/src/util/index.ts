export function generateRandomString(length: number): string {
  let text = ''
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
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

  let state = localStorage.getItem('stateKey')
  if (!state) {
    state = generateRandomString(16)
    localStorage.setItem('stateKey', state)
  }

  let url = 'https://accounts.spotify.com/authorize'
  url += '?response_type=code'
  url += '&client_id=' + encodeURIComponent(client_id)
  url += '&scope=' + encodeURIComponent(scopes)
  url += '&redirect_uri=' + encodeURIComponent(redirect_uri)
  // url += '&state=' + encodeURIComponent(state)

  return url
}

interface Token {
  token: string
  expires: number
}

export function parseHash(hash: string | undefined): Token | null {
  if (!hash) return null
  const parsed = hash
    .slice(1)
    .split('&')
    .reduce((agg, item) => {
      if (item.includes('access_token')) agg['token'] = item.split('=')[1]

      agg['expires'] = Date.now() + parseInt(item.split('=')[1]) * 1000
      return agg
    }, {} as Token)

  if (!parsed.token || !parsed.expires) return null
  window.location.hash = ''
  return parsed
}
