"use client"

import { motion } from "framer-motion"
import { Pacifico } from "next/font/google"
import { Copy, Check } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
})

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-green-500/[0.08]",
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
            "backdrop-blur-[2px] border-2 border-green-400/[0.15]",
            "shadow-[0_8px_32px_0_rgba(76,175,80,0.1)]",
            "after:absolute after:inset-0 after:rounded-lg",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(76,175,80,0.2),transparent_70%)]",
          )}
        />
      </motion.div>
    </motion.div>
  )
}

function CopyIPButton() {
  const [copied, setCopied] = useState(false)
  const serverIP = "world.viewp.ru"

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(serverIP)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  return (
    <motion.button
      onClick={copyToClipboard}
      className={cn(
        "inline-flex items-center gap-3 px-8 py-4 rounded-lg",
        "bg-green-600/20 hover:bg-green-600/30 border border-green-500/30",
        "text-green-300 hover:text-green-200 transition-all duration-300",
        "backdrop-blur-sm shadow-lg hover:shadow-green-500/20",
        "font-mono text-xl tracking-wider",
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span>{serverIP}</span>
      {copied ? <Check className="w-6 h-6 text-green-400" /> : <Copy className="w-6 h-6" />}
    </motion.button>
  )
}

export default function HeroGeometric({
  badge = "1.21.1",
  title1 = "ViewPoint",
  title2 = "Survival",
}: {
  badge?: string
  title1?: string
  title2?: string
}) {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#0a0f0a] pt-4">
      <div className="absolute inset-0 bg-gradient-to-br from-green-600/[0.05] via-transparent to-amber-600/[0.05] blur-3xl" />

      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.3}
          width={600}
          height={140}
          rotate={12}
          gradient="from-green-500/[0.15]"
          className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
        />

        <ElegantShape
          delay={0.5}
          width={500}
          height={120}
          rotate={-15}
          gradient="from-amber-600/[0.15]"
          className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
        />

        <ElegantShape
          delay={0.4}
          width={300}
          height={80}
          rotate={-8}
          gradient="from-emerald-500/[0.15]"
          className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
        />

        <ElegantShape
          delay={0.6}
          width={200}
          height={60}
          rotate={20}
          gradient="from-yellow-500/[0.15]"
          className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
        />

        <ElegantShape
          delay={0.7}
          width={150}
          height={40}
          rotate={-25}
          gradient="from-lime-500/[0.15]"
          className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
        />

        <ElegantShape
          delay={0.8}
          width={180}
          height={50}
          rotate={18}
          gradient="from-orange-500/[0.15]"
          className="right-[10%] md:right-[15%] bottom-[20%] md:bottom-[25%]"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-green-900/[0.3] border border-green-500/[0.3] mb-8 md:mb-12"
          >
            <div className="w-4 h-4 bg-green-500 rounded-sm shadow-sm"></div>
            <span className="text-sm text-green-300 tracking-wide font-mono">Minecraft {badge}</span>
          </motion.div>

          <motion.div custom={1} variants={fadeUpVariants} initial="hidden" animate="visible">
            <h1 className="text-5xl sm:text-7xl md:text-9xl font-bold mb-6 md:mb-8 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-green-300 to-green-500 block">
                {title1}
              </span>
              <span
                className={cn(
                  "bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-400",
                  pacifico.className,
                )}
              >
                {title2}
              </span>
            </h1>
          </motion.div>

          <motion.div custom={2} variants={fadeUpVariants} initial="hidden" animate="visible">
            <p className="text-base sm:text-lg md:text-xl text-green-200/60 mb-8 leading-relaxed font-light tracking-wide max-w-2xl mx-auto px-4">
              Присоединяйтесь к нашему ванильному серверу выживания. Исследуйте, стройте и выживайте вместе с друзьями в
              чистом Minecraft опыте.
            </p>
          </motion.div>

          <motion.div custom={3} variants={fadeUpVariants} initial="hidden" animate="visible">
            <div className="flex flex-col items-center justify-center gap-4 mb-8">
              <CopyIPButton />
            </div>
          </motion.div>

          <motion.div
            custom={4}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap justify-center gap-4 text-sm text-green-300/70"
          >
            <span className="px-4 py-2 bg-green-900/20 rounded-lg border border-green-500/20 backdrop-blur-sm">
              🌱 Ванильное выживание
            </span>
            <span className="px-4 py-2 bg-green-900/20 rounded-lg border border-green-500/20 backdrop-blur-sm">
              🏠 Приватные территории
            </span>
            <span className="px-4 py-2 bg-green-900/20 rounded-lg border border-green-500/20 backdrop-blur-sm">
              ⚔️ PvP зоны
            </span>
            <span className="px-4 py-2 bg-green-900/20 rounded-lg border border-green-500/20 backdrop-blur-sm">
              🎯 Ежедневные квесты
            </span>
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f0a] via-transparent to-[#0a0f0a]/80 pointer-events-none" />
    </div>
  )
}
