import { createSession } from '@/lib/auth'
import { handleDiscordCallback } from '@/lib/auth'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  if (!code) {
    return NextResponse.redirect('/auth/error?error=NoCode')
  }

  try {
    const user = await handleDiscordCallback(code)
    await createSession(user)
    return NextResponse.redirect('/')
  } catch (error) {
    console.error('Discord callback error:', error)
    return NextResponse.redirect('/auth/error?error=CallbackError')
  }
} 