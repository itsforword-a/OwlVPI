"use client"

import React from "react"

import { motion } from "framer-motion"
import ProjectHeader from "@/components/project-header"
import { Mail, RotateCcw, AlertCircle } from "lucide-react" // Added AlertCircle
import Image from "next/image"
import { cn } from "@/lib/utils"
import { signIn } from "next-auth/react" // Import signIn from next-auth/react
import { useSearchParams } from "next/navigation" // Import useSearchParams

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
  const [showRestore, setShowRestore] = React.useState(false)
  const [email, setEmail] = React.useState("")
  const [emailSent, setEmailSent] = React.useState(false)
  const searchParams = useSearchParams()
  const error = searchParams.get("error")

  const handleDiscordLogin = () => {
    console.log("Attempting Discord sign-in...")
    signIn("discord")
  }

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setEmailSent(false)
    const result = await signIn("email", { email, redirect: false }) // Do not redirect automatically
    if (result?.ok) {
      setEmailSent(true)
    } else {
      console.error("Email sign-in failed:", result?.error)
      // Handle error, e.g., show a message to the user
    }
  }

  const getErrorMessage = (error: string | null) => {
    if (!error) return null
    switch (error) {
      case "OAuthAccountNotLinked":
        return "Этот email уже используется с другим провайдером. Пожалуйста, войдите через Discord."
      case "EmailSignInError":
        return "Не удалось отправить письмо для входа. Проверьте email или попробуйте позже."
      case "Verification":
        return "Ссылка для входа недействительна или истекла."
      case "Configuration":
        return "Ошибка конфигурации. Пожалуйста, свяжитесь с администрацией."
      case "AccessDenied":
        return "Доступ запрещен."
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
                  src="/owlvpi-logo.png" // Updated logo path
                  alt="OwlVPI Logo"
                  width={32}
                  height={32}
                  className="rounded-lg"
                />
                <h1 className="text-2xl font-bold text-blue-300">OwlVPI ID</h1> {/* Updated project name */}
              </div>
              <p className="text-gray-200/60 text-sm">
                {showRestore
                  ? "Если у вас проблемы со входом или вы потеряли доступ к аккаунту"
                  : emailSent
                    ? `Ссылка для входа отправлена на ${email}. Проверьте свою почту!`
                    : "Добро пожаловать в систему OwlVPI ID! Пожалуйста, авторизуйтесь, чтобы получить доступ ко всем возможностям!"}
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

            {showRestore ? (
              <div className="space-y-6">
                <div>
                  <label className="block text-blue-300 text-sm font-medium mb-2">Email для восстановления</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
                    <input
                      type="email"
                      className="w-full pl-10 pr-4 py-3 bg-blue-900/20 border border-blue-500/30 rounded-lg text-gray-200 placeholder-gray-400/50 focus:outline-none focus:border-blue-400 transition-colors"
                      placeholder="Введите ваш email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <motion.button
                  onClick={handleEmailLogin}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 bg-blue-600/30 hover:bg-blue-600/40 border border-blue-500/40 rounded-lg text-blue-200 font-medium transition-all duration-300"
                >
                  Восстановить доступ
                </motion.button>

                <button
                  onClick={() => setShowRestore(false)}
                  className="w-full text-blue-400 hover:text-blue-300 transition-colors text-sm"
                >
                  ← Вернуться к входу
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  {/* Email Login Form */}
                  <form onSubmit={handleEmailLogin} className="space-y-4">
                    <div>
                      <label htmlFor="email-login" className="block text-blue-300 text-sm font-medium mb-2">
                        Ваш Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
                        <input
                          type="email"
                          id="email-login"
                          className="w-full pl-10 pr-4 py-3 bg-blue-900/20 border border-blue-500/30 rounded-lg text-gray-200 placeholder-gray-400/50 focus:outline-none focus:border-blue-400 transition-colors"
                          placeholder="Введите ваш email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-center gap-3 py-3 bg-blue-600/30 hover:bg-blue-600/40 border border-blue-500/40 rounded-lg text-blue-200 font-medium transition-all duration-300"
                    >
                      <Mail className="w-5 h-5" />
                      Войти по Email
                    </motion.button>
                  </form>

                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-blue-900/10 px-2 text-gray-400">ИЛИ</span>
                  </div>

                  {/* Discord Login Button */}
                  <motion.button
                    onClick={handleDiscordLogin}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-3 py-3 bg-[#5865F2]/20 hover:bg-[#5865F2]/30 border border-[#5865F2]/40 rounded-lg text-gray-200 font-medium transition-all duration-300"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                    </svg>
                    Войти через Discord
                  </motion.button>
                </div>

                <div className="text-center text-sm text-gray-200/60 mb-6">
                  Нажимая на кнопку(и) я подтверждаю что согласен и принимаю{" "}
                  <a href="/rules" className="text-orange-400 hover:text-orange-300">
                    условия использования
                  </a>{" "}
                  и{" "}
                  <a href="/privacy" className="text-orange-400 hover:text-orange-300">
                    политику конфиденциальности
                  </a>
                </div>

                <div className="border-t border-blue-500/20 pt-6">
                  <button
                    onClick={() => setShowRestore(true)}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-blue-900/20 hover:bg-blue-900/30 border border-blue-500/30 rounded-lg text-blue-300 font-medium transition-all duration-300"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Восстановить доступ
                  </button>
                  <p className="text-gray-200/50 text-xs mt-2 text-center">
                    Если у вас проблемы со входом или вы потеряли доступ к аккаунту
                  </p>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </>
  )
}
