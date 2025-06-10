"use client"

import { cn } from "@/lib/utils"

import { motion } from "framer-motion"
import ProjectHeader from "@/components/project-header"
import { useSession } from "next-auth/react"
import { Loader2, FileText, UserCheck, UserX } from "lucide-react"
import { useEffect, useState } from "react"
import { getApplications, updateApplicationStatus, updateRole } from "@/app/actions/admin" // Server Actions

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

interface UserApplication {
  id: string
  userId: string
  nickname: string
  age: number
  experience: string
  whyJoin: string
  status: "pending" | "approved" | "rejected"
  createdAt: string
  updatedAt: string
  userEmail: string // Assuming we can get user email from DB join
  userName: string // Assuming we can get user name from DB join
}

export default function AdminPage() {
  const { data: session, status } = useSession()
  const [applications, setApplications] = useState<UserApplication[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Simulate admin role check (replace with actual DB check)
  const isAdmin = session?.user?.role === "admin"

  useEffect(() => {
    const fetchApplications = async () => {
      if (isAdmin) {
        setLoading(true)
        setError(null)
        try {
          const fetchedApplications = await getApplications()
          setApplications(fetchedApplications)
        } catch (err) {
          console.error("Failed to fetch applications:", err)
          setError("Не удалось загрузить заявки.")
        } finally {
          setLoading(false)
        }
      } else {
        setLoading(false)
      }
    }
    fetchApplications()
  }, [isAdmin])

  const handleStatusUpdate = async (
    applicationId: string,
    newStatus: "approved" | "rejected",
    userId: string,
    userDiscordId: string, // In a real app, you'd pass Discord ID to bot
  ) => {
    try {
      await updateApplicationStatus(applicationId, newStatus)
      // Update local state
      setApplications((prev) => prev.map((app) => (app.id === applicationId ? { ...app, status: newStatus } : app)))
      // If approved, update user role (conceptual)
      if (newStatus === "approved") {
        await updateRole(userId, "Игрок") // Set default player role
        // In a real app, trigger Discord bot to assign role
        // await discordBot.assignRole(userDiscordId, 'Player Role ID');
      }
      // If rejected, trigger Discord bot to remove any pending roles or notify
      // else if (newStatus === 'rejected') {
      //   await discordBot.notifyRejected(userDiscordId);
      // }
    } catch (err) {
      console.error("Failed to update application status:", err)
      setError("Ошибка при обновлении статуса заявки.")
    }
  }

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-[#0d1117] flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
        <p className="ml-4 text-blue-300">Загрузка админ-панели...</p>
      </div>
    )
  }

  if (!session || !isAdmin) {
    return (
      <div className="min-h-screen bg-[#0d1117] flex flex-col items-center justify-center text-center text-gray-200">
        <p className="text-xl mb-4">Доступ запрещен.</p>
        <p className="text-lg">У вас нет прав администратора для просмотра этой страницы.</p>
        <motion.a
          href="/"
          className="mt-6 px-6 py-3 bg-blue-600/30 hover:bg-blue-600/40 border border-blue-500/40 rounded-lg text-blue-200 font-medium transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          На главную
        </motion.a>
      </div>
    )
  }

  return (
    <>
      <ProjectHeader />
      <div className="min-h-screen bg-[#0d1117] pt-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto py-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-blue-500 mb-8 text-center">
            Админ-панель
          </h1>

          {error && (
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 mb-6 text-red-300 text-center">
              {error}
            </div>
          )}

          <h2 className="text-2xl font-bold text-blue-300 mb-6 flex items-center gap-2">
            <FileText className="w-6 h-6" /> Заявки на вступление
          </h2>

          {applications.length === 0 && !loading && (
            <p className="text-gray-400 text-lg text-center">Нет новых заявок.</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {applications.map((app) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-blue-900/10 border border-blue-500/20 rounded-lg p-6 backdrop-blur-sm"
              >
                <h3 className="text-xl font-bold text-blue-300 mb-2">{app.nickname}</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Пользователь: {app.userName} ({app.userEmail})
                </p>
                <div className="space-y-2 text-gray-200/80 text-sm">
                  <p>
                    <span className="font-semibold">Возраст:</span> {app.age}
                  </p>
                  <p>
                    <span className="font-semibold">Опыт:</span> {app.experience}
                  </p>
                  <p>
                    <span className="font-semibold">Почему OwlVPI:</span> {app.whyJoin}
                  </p>
                  <p>
                    <span className="font-semibold">Статус:</span>{" "}
                    <span
                      className={cn({
                        "text-yellow-400": app.status === "pending",
                        "text-green-400": app.status === "approved",
                        "text-red-400": app.status === "rejected",
                      })}
                    >
                      {app.status === "pending" && "На рассмотрении"}
                      {app.status === "approved" && "Одобрена"}
                      {app.status === "rejected" && "Отклонена"}
                    </span>
                  </p>
                </div>
                {app.status === "pending" && (
                  <div className="flex gap-2 mt-4">
                    <motion.button
                      onClick={() => handleStatusUpdate(app.id, "approved", app.userId, "DISCORD_ID_HERE")}
                      className="flex-1 px-4 py-2 bg-green-600/30 hover:bg-green-600/40 border border-green-500/40 rounded-md text-green-200 font-medium transition-all duration-300 flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <UserCheck className="w-4 h-4" /> Одобрить
                    </motion.button>
                    <motion.button
                      onClick={() => handleStatusUpdate(app.id, "rejected", app.userId, "DISCORD_ID_HERE")}
                      className="flex-1 px-4 py-2 bg-red-600/30 hover:bg-red-600/40 border border-red-500/40 rounded-md text-red-200 font-medium transition-all duration-300 flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <UserX className="w-4 h-4" /> Отклонить
                    </motion.button>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  )
}
