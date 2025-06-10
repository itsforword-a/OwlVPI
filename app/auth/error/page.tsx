"use client"

import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import ProjectHeader from "@/components/project-header"
import { AlertCircle } from "lucide-react"

export default function ErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get("error")
  const errorDescription = searchParams.get("error_description")

  const getErrorMessage = (error: string | null) => {
    if (!error) return "Произошла неизвестная ошибка"
    
    switch (error) {
      case "OAuthSignin":
        return "Ошибка при входе через Discord. Попробуйте еще раз."
      case "OAuthCallback":
        return "Ошибка при обработке ответа от Discord. Попробуйте еще раз."
      case "OAuthCreateAccount":
        return "Не удалось создать аккаунт. Попробуйте еще раз."
      case "EmailCreateAccount":
        return "Не удалось создать аккаунт с email. Попробуйте еще раз."
      case "Callback":
        return "Ошибка при обработке ответа от Discord. Попробуйте еще раз."
      case "OAuthAccountNotLinked":
        return "Этот email уже используется с другим провайдером. Пожалуйста, войдите через Discord."
      case "EmailSignin":
        return "Ошибка при отправке email. Попробуйте еще раз."
      case "CredentialsSignin":
        return "Неверные учетные данные. Попробуйте еще раз."
      case "SessionRequired":
        return "Требуется авторизация. Пожалуйста, войдите в систему."
      case "Default":
        return "Произошла неизвестная ошибка. Пожалуйста, попробуйте еще раз."
      default:
        return `Ошибка: ${error}`
    }
  }

  return (
    <>
      <ProjectHeader />
      <div className="relative min-h-screen bg-[#0d1117] pt-16 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/[0.05] via-transparent to-purple-600/[0.05] blur-3xl" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 w-full max-w-md mx-4"
        >
          <div className="bg-blue-900/10 border border-blue-500/20 rounded-lg p-8 backdrop-blur-sm">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <AlertCircle className="w-8 h-8 text-red-400" />
                <h1 className="text-2xl font-bold text-red-300">Ошибка авторизации</h1>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 text-red-300">
                <p className="font-medium mb-2">{getErrorMessage(error)}</p>
                {errorDescription && (
                  <p className="text-sm text-red-300/70">{errorDescription}</p>
                )}
              </div>

              <a
                href="/auth"
                className="block w-full py-3 bg-blue-600/30 hover:bg-blue-600/40 border border-blue-500/40 rounded-lg text-blue-200 font-medium text-center transition-all duration-300"
              >
                Вернуться к входу
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  )
} 