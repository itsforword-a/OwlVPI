"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Home, ArrowLeft, DiscIcon as Discord } from "lucide-react"
import { cn } from "@/lib/utils"

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

export default function NotFound() {
  const discordInviteLink = "https://discord.gg/your-invite-link" // Replace with actual Discord invite

  return (
    <div className="relative min-h-screen bg-[#0d1117] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/[0.05] via-transparent to-purple-600/[0.05] blur-3xl" />
      {/* Background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.3}
          width={400}
          height={100}
          rotate={12}
          gradient="from-red-500/[0.1]"
          className="left-[-5%] top-[20%]"
        />
        <ElegantShape
          delay={0.5}
          width={300}
          height={80}
          rotate={-15}
          gradient="from-orange-600/[0.1]"
          className="right-[-5%] top-[60%]"
        />
        <ElegantShape
          delay={0.4}
          width={200}
          height={60}
          rotate={-8}
          gradient="from-yellow-500/[0.1]"
          className="left-[10%] bottom-[10%]"
        />
        <ElegantShape
          delay={0.6}
          width={150}
          height={40}
          rotate={20}
          gradient="from-blue-500/[0.1]"
          className="right-[20%] top-[15%]"
        />
      </div>
      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto"
        >
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <Image
              src="/owlvpi-logo.png" // Updated logo path
              alt="OwlVPI Logo"
              width={64}
              height={64}
              className="rounded-lg shadow-lg"
            />
            <div>
              <h1 className="text-blue-300 font-bold text-2xl">OwlVPI</h1> {/* Updated project name */}
              <p className="text-gray-400/60 text-sm font-mono">Военно-политическая игра</p>
            </div>
          </div>

          {/* 404 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <h2 className="text-8xl md:text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-orange-500 mb-4">
              404
            </h2>
            <h3 className="text-2xl md:text-3xl font-bold text-blue-300 mb-4">Страница не найдена</h3>
            <p className="text-gray-200/60 text-lg leading-relaxed max-w-lg mx-auto">
              Похоже, вы заблудились в стратегических картах! Эта страница не существует или была перемещена.
            </p>
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600/30 hover:bg-blue-600/40 border border-blue-500/40 rounded-lg text-blue-200 font-medium transition-all duration-300"
              >
                <Home className="w-5 h-5" />
                На главную
              </motion.button>
            </Link>

            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-900/20 hover:bg-blue-900/30 border border-blue-500/30 rounded-lg text-blue-300 font-medium transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
              Назад
            </button>
          </motion.div>

          {/* Discord Invite */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 p-6 bg-blue-900/10 border border-blue-500/20 rounded-lg backdrop-blur-sm"
          >
            <p className="text-gray-200/60 text-sm mb-2">Присоединяйтесь к нашему сообществу в Discord!</p>
            <a
              href={discordInviteLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-300 font-mono text-lg hover:text-blue-200 transition-colors"
            >
              <Discord className="w-5 h-5" />
              Присоединиться
            </a>
          </motion.div>
        </motion.div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-[#0d1117]/80 pointer-events-none" />
    </div>
  )
}
