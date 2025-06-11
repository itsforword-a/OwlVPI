import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'

const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID!
const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET!
const DISCORD_REDIRECT_URI = process.env.DISCORD_REDIRECT_URI!
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key')

export async function getDiscordToken(code: string) {
  const params = new URLSearchParams({
    client_id: DISCORD_CLIENT_ID,
    client_secret: DISCORD_CLIENT_SECRET,
    grant_type: 'authorization_code',
    code,
    redirect_uri: DISCORD_REDIRECT_URI,
    scope: 'identify email',
  })

  console.log('Requesting Discord token with params:', {
    client_id: DISCORD_CLIENT_ID,
    redirect_uri: DISCORD_REDIRECT_URI,
    scope: 'identify email',
  })

  const response = await fetch('https://discord.com/api/oauth2/token', {
    method: 'POST',
    body: params,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })

  if (!response.ok) {
    const errorData = await response.text()
    console.error('Discord token error:', {
      status: response.status,
      statusText: response.statusText,
      error: errorData,
    })
    throw new Error(`Failed to get Discord token: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

export async function getDiscordUser(accessToken: string) {
  const response = await fetch('https://discord.com/api/users/@me', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (!response.ok) {
    const errorData = await response.text()
    console.error('Discord user error:', {
      status: response.status,
      statusText: response.statusText,
      error: errorData,
    })
    throw new Error(`Failed to get Discord user: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

export async function signJwt(payload: any) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('30d')
    .sign(JWT_SECRET)

  return token
}

export async function verifyJwt(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload
  } catch (error) {
    return null
  }
}

export async function getSession(request?: NextRequest) {
  if (request) {
    const token = request.cookies.get('token')?.value
    if (!token) return null
    return verifyJwt(token)
  }

  const cookieStore = cookies()
  const token = cookieStore.get('token')?.value
  if (!token) return null
  return verifyJwt(token)
}

export async function createSession(userData: any) {
  const token = await signJwt(userData)
  const cookieStore = cookies()
  
  cookieStore.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  })
}

export async function deleteSession() {
  const cookieStore = cookies()
  cookieStore.delete('token')
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
      client_id: DISCORD_CLIENT_ID,
      client_secret: DISCORD_CLIENT_SECRET,
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