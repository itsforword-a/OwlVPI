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
    return null
  }
}

export async function deleteSession() {
  cookies().delete('session')
}

export async function handleDiscordCallback(code: string) {
  const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
    method: 'POST',
    body: new URLSearchParams({
      client_id: process.env.DISCORD_CLIENT_ID!,
      client_secret: process.env.DISCORD_CLIENT_SECRET!,
      code,
      grant_type: 'authorization_code',
      redirect_uri: `${process.env.AUTH_URL}/api/auth/callback/discord`,
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })

  const tokens = await tokenResponse.json()

  const userResponse = await fetch('https://discord.com/api/users/@me', {
    headers: {
      Authorization: `Bearer ${tokens.access_token}`,
    },
  })

  const user = await userResponse.json()

  return {
    id: user.id,
    name: user.username,
    email: user.email,
    image: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`,
  }
} 