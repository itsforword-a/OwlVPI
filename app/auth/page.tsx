"use client"

import React from "react"

import { motion } from "framer-motion"
import ProjectHeader from "@/components/project-header"
import { AlertCircle } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { signIn } from "next-auth/react"
import { useSearchParams } from "next/navigation"

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-blue-500/[0.08]",
}: {
  className?: string
  delay?: number
  width?: number
  height?: number
  rotate?: number
  gradient?: string
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -150,
        rotate: rotate - 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: rotate,
      }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          width,
          height,
        }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-lg",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-[2px] border-2 border-blue-400/[0.15]",
            "shadow-[0_8px_32px_0_rgba(66,135,245,0.1)]",
            "after:absolute after:inset-0 after:rounded-lg",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(66,135,245,0.2),transparent_70%)]",
          )}
        />
      </motion.div>
    </motion.div>
  )
}

export default function AuthPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get("error")

  const handleDiscordLogin = () => {
    console.log("Attempting Discord sign-in...")
    signIn("discord")
  }

  const getErrorMessage = (error: string | null) => {
    if (!error) return null
    switch (error) {
      case "OAuthAccountNotLinked":
        return "Этот аккаунт уже используется с другим провайдером. Пожалуйста, войдите через Discord."
      case "AccessDenied":
        return "Доступ запрещен."
      case "Configuration":
        return "Ошибка конфигурации. Пожалуйста, свяжитесь с администрацией."
      default:
        return "Произошла неизвестная ошибка. Пожалуйста, попробуйте еще раз."
    }
  }

  return (
    <>
      <ProjectHeader />
      <div className="relative min-h-screen bg-[#0d1117] pt-16 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/[0.05] via-transparent to-purple-600/[0.05] blur-3xl" />
        {/* Background shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <ElegantShape
            delay={0.3}
            width={300}
            height={80}
            rotate={12}
            gradient="from-blue-500/[0.1]"
            className="left-[-5%] top-[20%]"
          />
          <ElegantShape
            delay={0.5}
            width={200}
            height={60}
            rotate={-15}
            gradient="from-purple-600/[0.1]"
            className="right-[-5%] top-[70%]"
          />
          <ElegantShape
            delay={0.4}
            width={150}
            height={40}
            rotate={-8}
            gradient="from-cyan-500/[0.1]"
            className="left-[10%] bottom-[10%]"
          />
          <ElegantShape
            delay={0.6}
            width={120}
            height={35}
            rotate={20}
            gradient="from-yellow-500/[0.1]"
            className="right-[20%] top-[15%]"
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 w-full max-w-md mx-4"
        >
          <div className="bg-blue-900/10 border border-blue-500/20 rounded-lg p-8 backdrop-blur-sm">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Image
                  src="/owlvpi-logo.png"
                  alt="OwlVPI Logo"
                  width={32}
                  height={32}
                  className="rounded-lg"
                />
                <h1 className="text-2xl font-bold text-blue-300">OwlVPI ID</h1>
              </div>
              <p className="text-gray-200/60 text-sm">
                Добро пожаловать в систему OwlVPI ID! Пожалуйста, войдите через Discord, чтобы получить доступ ко всем возможностям!
              </p>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-900/20 border border-red-500/30 rounded-lg p-3 mb-6 text-red-300 text-sm flex items-center gap-2"
              >
                <AlertCircle className="w-5 h-5" />
                {getErrorMessage(error)}
              </motion.div>
            )}

            <motion.button
              onClick={handleDiscordLogin}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 bg-[#5865F2] hover:bg-[#4752C4] border border-[#5865F2]/40 rounded-lg text-white font-medium transition-all duration-300 flex items-center justify-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
              Войти через Discord
            </motion.button>
          </div>
        </motion.div>
      </div>
    </>
  )
}
