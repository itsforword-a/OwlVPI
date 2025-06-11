"use client"

import { useAuth } from '@/components/auth-provider'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AdminPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Загрузка...</h2>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Панель администратора</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Информация о пользователе</h2>
        <div className="space-y-2">
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>Имя:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          {user.image && (
            <div className="mt-4">
              <img 
                src={user.image} 
                alt="Avatar" 
                className="w-20 h-20 rounded-full"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
