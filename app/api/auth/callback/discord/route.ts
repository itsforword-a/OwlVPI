import { createSession } from '@/lib/auth'
import { handleDiscordCallback } from '@/lib/auth'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')

    if (!code) {
      console.error('No code provided in callback')
      return NextResponse.redirect('/auth/error?error=NoCode')
    }

    console.log('Received code from Discord:', code)

    const user = await handleDiscordCallback(code)
    console.log('User data received:', user)

    await createSession(user)
    console.log('Session created successfully')

    return NextResponse.redirect('/')
  } catch (error) {
    console.error('Discord callback error:', error)
    return NextResponse.redirect('/auth/error?error=CallbackError')
  }
} 