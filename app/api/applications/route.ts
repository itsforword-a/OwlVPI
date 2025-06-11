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
    const { nickname, age, experience, motivation, discordId } = body

    // Проверяем, не подавал ли пользователь анкету ранее
    const existingApplication = await prisma.application.findFirst({
      where: {
        userId: session.user.id,
      },
    })

    if (existingApplication) {
      return new NextResponse('Application already exists', { status: 400 })
    }

    // Создаем новую анкету
    const application = await prisma.application.create({
      data: {
        userId: session.user.id,
        nickname,
        age,
        experience,
        motivation,
        discordId,
        status: 'pending',
      },
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

    // Получаем анкету пользователя
    const application = await prisma.application.findFirst({
      where: {
        userId: session.user.id,
      },
    })

    return NextResponse.json(application)
  } catch (error) {
    console.error('Error fetching application:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
} 