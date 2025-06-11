import { cookies } from 'next/headers'
import { SignJWT, jwtVerify } from 'jose'

const JWT_SECRET = process.env.AUTH_SECRET || 'your-secret-key'

export async function createSession(userData: any) {
  const token = await new SignJWT(userData)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('24h')
    .sign(new TextEncoder().encode(JWT_SECRET))

  cookies().set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24, // 24 hours
    path: '/',
  })

  return token
}

export async function getSession() {
  const session = cookies().get('session')
  if (!session) return null

  try {
    const { payload } = await jwtVerify(
      session.value,
      new TextEncoder().encode(JWT_SECRET)
    )
    return payload
  } catch (error) {
    console.error('Session verification error:', error)
    return null
  }
}

export async function deleteSession() {
  cookies().delete('session')
}

export async function handleDiscordCallback(code: string) {
  console.log('Starting Discord callback handling...')
  
  const redirectUri = process.env.NODE_ENV === 'production'
    ? 'https://owlvpi.vercel.app/api/auth/callback/discord'
    : 'http://localhost:3000/api/auth/callback/discord'

  console.log('Using redirect URI:', redirectUri)

  const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
    method: 'POST',
    body: new URLSearchParams({
      client_id: process.env.DISCORD_CLIENT_ID!,
      client_secret: process.env.DISCORD_CLIENT_SECRET!,
      code,
      grant_type: 'authorization_code',
      redirect_uri: redirectUri,
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })

  if (!tokenResponse.ok) {
    const errorText = await tokenResponse.text()
    console.error('Discord token response error:', errorText)
    throw new Error(`Failed to get Discord token: ${errorText}`)
  }

  const tokens = await tokenResponse.json()
  console.log('Received tokens from Discord')

  const userResponse = await fetch('https://discord.com/api/users/@me', {
    headers: {
      Authorization: `Bearer ${tokens.access_token}`,
    },
  })

  if (!userResponse.ok) {
    const errorText = await userResponse.text()
    console.error('Discord user response error:', errorText)
    throw new Error(`Failed to get Discord user: ${errorText}`)
  }

  const user = await userResponse.json()
  console.log('Received user data from Discord')

  return {
    id: user.id,
    name: user.username,
    email: user.email,
    image: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`,
  }
} 