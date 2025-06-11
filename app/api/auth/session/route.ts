import { getSession } from '@/lib/auth'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const session = await getSession()
    return NextResponse.json({ user: session })
  } catch (error) {
    console.error('Session check error:', error)
    return NextResponse.json({ user: null })
  }
} 