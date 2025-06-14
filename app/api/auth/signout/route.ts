import { deleteSession } from '@/lib/auth'
import { NextResponse } from 'next/server'

export async function POST() {
  try {
    await deleteSession()
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Sign out error:', error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
} 