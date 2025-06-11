"use client"

import { useAuth } from '@/components/auth-provider'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { User } from 'lucide-react'
import Image from "next/image"

export default function ProfilePage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [userData, setUserData] = useState<any | null>(null)
  const [loadingUserData, setLoadingUserData] = useState(true)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth')
    }
  }, [user, loading, router])

  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.id) {
        setLoadingUserData(true)
        try {
          // Здесь можно добавить запрос к API для получения дополнительных данных пользователя
          setUserData({
            ...user,
            role: "Игрок", // Временное значение
            applicationStatus: "not_submitted", // Временное значение
          })
        } catch (error) {
          console.error('Error fetching user data:', error)
        } finally {
          setLoadingUserData(false)
        }
      }
    }
    fetchUserData()
  }, [user])

  if (loading || loadingUserData) {
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
      <h1 className="text-2xl font-bold mb-4">Профиль пользователя</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center space-x-4">
          {user.image && (
            <Image
              src={user.image}
              alt="Avatar"
              width={80}
              height={80}
              className="rounded-full"
            />
          )}
          <div>
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
            <div className="flex items-center gap-2 text-blue-400 mt-2">
              <User className="w-4 h-4" />
              <span>ID: {user.id}</span>
            </div>
            {userData && (
              <div className="mt-4">
                <p className="text-gray-600">Роль: {userData.role}</p>
                <p className="text-gray-600">Статус анкеты: {userData.applicationStatus}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
