"use client"

import { motion } from "framer-motion"
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

function JoinDiscordButton() {
  const discordInviteLink = "https://discord.gg/your-invite-link" // Replace with actual Discord invite

  return (
    <motion.a
      href={discordInviteLink}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-3 px-8 py-4 rounded-lg",
        "bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30",
        "text-blue-300 hover:text-blue-200 transition-all duration-300",
        "backdrop-blur-sm shadow-lg hover:shadow-blue-500/20",
        "font-mono text-xl tracking-wider",
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span>Присоединиться к Discord</span>
    </motion.a>
  )
}

export default function ProjectHero({
  badge = "Discord Проект",
  title1 = "OwlVPI:", // Updated project name
  title2 = "Стратегия", // Updated project name
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
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#0d1117] pt-4">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/[0.05] via-transparent to-purple-600/[0.05] blur-3xl" />

      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.3}
          width={600}
          height={140}
          rotate={12}
          gradient="from-blue-500/[0.15]"
          className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
        />

        <ElegantShape
          delay={0.5}
          width={500}
          height={120}
          rotate={-15}
          gradient="from-purple-600/[0.15]"
          className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
        />

        <ElegantShape
          delay={0.4}
          width={300}
          height={80}
          rotate={-8}
          gradient="from-cyan-500/[0.15]"
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
          gradient="from-red-500/[0.15]"
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
            className="inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-blue-900/[0.3] border border-blue-500/[0.3] mb-8 md:mb-12"
          >
            <div className="w-4 h-4 bg-blue-500 rounded-sm shadow-sm"></div>
            <span className="text-sm text-blue-300 tracking-wide font-mono">{badge}</span>
          </motion.div>

          <motion.div custom={1} variants={fadeUpVariants} initial="hidden" animate="visible">
            <h1 className="text-5xl sm:text-7xl md:text-9xl font-bold mb-6 md:mb-8 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-blue-300 to-blue-500 block">
                {title1}
              </span>
              <span
                className={cn("bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-300 to-red-400")}
              >
                {title2}
              </span>
            </h1>
          </motion.div>

          <motion.div custom={2} variants={fadeUpVariants} initial="hidden" animate="visible">
            <p className="text-base sm:text-lg md:text-xl text-gray-200/60 mb-8 leading-relaxed font-light tracking-wide max-w-2xl mx-auto px-4">
              Погрузитесь в мир стратегических решений, дипломатии и военных конфликтов. Создайте свою фракцию,
              развивайте экономику и доминируйте на политической арене в нашей уникальной Discord игре.
            </p>
          </motion.div>

          <motion.div custom={3} variants={fadeUpVariants} initial="hidden" animate="visible">
            <div className="flex flex-col items-center justify-center gap-4 mb-8">
              <JoinDiscordButton />
            </div>
          </motion.div>

          <motion.div
            custom={4}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap justify-center gap-4 text-sm text-blue-300/70"
          >
            <span className="px-4 py-2 bg-blue-900/20 rounded-lg border border-blue-500/20 backdrop-blur-sm">
              ⚔️ Военные действия
            </span>
            <span className="px-4 py-2 bg-blue-900/20 rounded-lg border border-blue-500/20 backdrop-blur-sm">
              🤝 Дипломатия
            </span>
            <span className="px-4 py-2 bg-blue-900/20 rounded-lg border border-blue-500/20 backdrop-blur-sm">
              💰 Экономика
            </span>
            <span className="px-4 py-2 bg-blue-900/20 rounded-lg border border-blue-500/20 backdrop-blur-sm">
              🗺️ Глобальная карта
            </span>
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-[#0d1117]/80 pointer-events-none" />
    </div>
  )
}
