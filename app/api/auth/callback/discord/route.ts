import { NextRequest, NextResponse } from 'next/server'
import { getDiscordUser, getDiscordToken } from '@/lib/auth'
import { signJwt } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const code = searchParams.get('code')
    const error = searchParams.get('error')

    if (error) {
      console.error('Discord auth error:', error)
      return NextResponse.redirect(new URL('/auth/error?error=' + error, request.url))
    }

    if (!code) {
      console.error('No code provided')
      return NextResponse.redirect(new URL('/auth/error?error=NoCode', request.url))
    }

    // Get the base URL from the request
    const baseUrl = request.nextUrl.origin

    try {
      const tokenData = await getDiscordToken(code)
      const userData = await getDiscordUser(tokenData.access_token)

      if (!userData) {
        console.error('Failed to get user data from Discord')
        return NextResponse.redirect(new URL('/auth/error?error=NoUserData', request.url))
      }

      // Create session token
      const token = await signJwt({
        id: userData.id,
        name: userData.username,
        email: userData.email,
        image: `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`,
      })

      // Create response with redirect
      const response = NextResponse.redirect(new URL('/', baseUrl))

      // Set the token in an HTTP-only cookie
      response.cookies.set({
        name: 'token',
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 30 * 24 * 60 * 60, // 30 days
      })

      return response
    } catch (error) {
      console.error('Discord callback error:', error)
      return NextResponse.redirect(new URL('/auth/error?error=CallbackError', request.url))
    }
  } catch (error) {
    console.error('Unexpected error in Discord callback:', error)
    return NextResponse.redirect(new URL('/auth/error?error=UnexpectedError', request.url))
  }
} 