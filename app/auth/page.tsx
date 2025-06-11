"use client"

import React, { useEffect, useState } from "react"

import { motion } from "framer-motion"
import ProjectHeader from "@/components/project-header"
import { AlertCircle } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

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
  const [clientId, setClientId] = useState<string>('')
  const [redirectUri, setRedirectUri] = useState<string>('')

  useEffect(() => {
    // Загружаем переменные окружения на клиенте
    setClientId(process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID || '')
    setRedirectUri(`${window.location.origin}/api/auth/callback/discord`)
  }, [])

  if (!clientId) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-lg">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-red-600">Ошибка конфигурации</h2>
            <p className="mt-2 text-gray-600">DISCORD_CLIENT_ID не настроен</p>
          </div>
        </div>
      </div>
    )
  }

  const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=identify%20email`

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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 w-full max-w-2xl"
        >
          <div className="bg-blue-900/10 border border-blue-500/20 rounded-lg p-12 backdrop-blur-sm">
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

            <div className="mt-8">
              <Button
                className="w-full"
                onClick={() => window.location.href = discordAuthUrl}
              >
                Войти через Discord
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  )
}
