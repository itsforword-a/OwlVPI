import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const session = await getServerSession()
    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const body = await req.json()
    const { discordId, nickname, age, experience, motivation } = body

    const application = await prisma.application.create({
      data: {
        userId: session.user.id,
        discordId,
        nickname,
        age: parseInt(age),
        experience,
        motivation,
        status: 'pending'
      }
    })

    return NextResponse.json(application)
  } catch (error) {
    console.error('Error creating application:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession()
    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const applications = await prisma.application.findMany({
      where: {
        userId: session.user.id
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(applications)
  } catch (error) {
    console.error('Error fetching applications:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
} 