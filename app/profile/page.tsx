"use client"

import { motion } from "framer-motion"
import ProjectHeader from "@/components/project-header"
import { useSession } from "next-auth/react"
import { Loader2, User, Shield, FileText, CheckCircle, XCircle } from "lucide-react"
import ApplicationForm from "@/components/application-form" // Import the application form
import { useEffect, useState } from "react"
import { getUserData } from "@/app/actions/user" // Server Action to get user data
import Image from "next/image" // Import Image component
import { useAuth } from '@/components/auth-provider'
import { useRouter } from 'next/navigation'

// Extend the Session type to include custom properties
declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      role?: string // Custom role property
      applicationStatus?: "pending" | "approved" | "rejected" | "not_submitted" // Custom application status
    }
  }
}

export default function ProfilePage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [userData, setUserData] = useState<any | null>(null) // Declare type as any to avoid undeclared variable error
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
        // In a real app, you'd fetch user data from your database here
        // For now, simulate fetching and set default values
        const fetchedData = await getUserData(user.id) // Call server action
        setUserData({
          ...user,
          role: fetchedData?.role || "Игрок", // Default role
          applicationStatus: fetchedData?.applicationStatus || "not_submitted", // Default status
        })
        setLoadingUserData(false)
      }
    }
    fetchUserData()
  }, [user])

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

  const renderApplicationStatus = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <span className="inline-flex items-center gap-2 text-yellow-400">
            <FileText className="w-5 h-5" /> На рассмотрении
          </span>
        )
      case "approved":
        return (
          <span className="inline-flex items-center gap-2 text-green-400">
            <CheckCircle className="w-5 h-5" /> Одобрена
          </span>
        )
      case "rejected":
        return (
          <span className="inline-flex items-center gap-2 text-red-400">
            <XCircle className="w-5 h-5" /> Отклонена
          </span>
        )
      case "not_submitted":
      default:
        return (
          <span className="inline-flex items-center gap-2 text-gray-400">
            <FileText className="w-5 h-5" /> Не заполнена
          </span>
        )
    }
  }

  return (
    <>
      <ProjectHeader />
      <div className="min-h-screen bg-[#0d1117] pt-20 flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-blue-900/10 border border-blue-500/20 rounded-lg p-8 backdrop-blur-sm w-full max-w-3xl"
        >
          <h1 className="text-3xl font-bold text-blue-300 mb-6 text-center">Личный кабинет</h1>

          <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
            <Image
              src={user.image || "/placeholder.svg?height=96&width=96"}
              alt={user.name || "User Avatar"}
              width={96}
              height={96}
              className="rounded-full border-4 border-blue-500/50 shadow-lg"
            />
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-semibold text-white">{user.name || "Неизвестный пользователь"}</h2>
              <p className="text-gray-400">{user.email}</p>
              <div className="flex items-center gap-2 text-blue-400 mt-2">
                <User className="w-4 h-4" />
                <span>ID: {user.id}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3 text-gray-200">
              <Shield className="w-5 h-5 text-blue-400" />
              <span className="font-medium">Ваша роль:</span>
              <span className="text-blue-300">{userData?.role || "Загрузка..."}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-200">
              <FileText className="w-5 h-5 text-blue-400" />
              <span className="font-medium">Статус анкеты:</span>
              {renderApplicationStatus(userData?.applicationStatus || "not_submitted")}
            </div>
          </div>

          {userData?.applicationStatus === "not_submitted" && (
            <div className="mt-8">
              <ApplicationForm userId={user.id} />
            </div>
          )}

          {userData?.applicationStatus === "pending" && (
            <div className="mt-8 p-6 bg-yellow-900/10 border border-yellow-500/20 rounded-lg text-center">
              <p className="text-yellow-300 text-lg font-medium">
                Ваша анкета на рассмотрении. Пожалуйста, ожидайте решения администрации.
              </p>
              <p className="text-yellow-200/70 text-sm mt-2">Мы свяжемся с вами в Discord после проверки.</p>
            </div>
          )}

          {userData?.applicationStatus === "rejected" && (
            <div className="mt-8 p-6 bg-red-900/10 border border-red-500/20 rounded-lg text-center">
              <p className="text-red-300 text-lg font-medium">Ваша анкета была отклонена.</p>
              <p className="text-red-200/70 text-sm mt-2">
                Пожалуйста, свяжитесь с администрацией для уточнения причин или повторной подачи.
              </p>
            </div>
          )}

          {userData?.applicationStatus === "approved" && (
            <div className="mt-8 p-6 bg-green-900/10 border border-green-500/20 rounded-lg text-center">
              <p className="text-green-300 text-lg font-medium">Ваша анкета одобрена! Добро пожаловать в OwlVPI!</p>
              <p className="text-green-200/70 text-sm mt-2">Теперь вы можете полноценно участвовать в проекте.</p>
            </div>
          )}
        </motion.div>
      </div>
    </>
  )
}
