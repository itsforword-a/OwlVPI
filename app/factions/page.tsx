"use client"

import { motion } from "framer-motion"
import ProjectHeader from "@/components/project-header"
import { Users, Shield, Swords, Landmark } from "lucide-react"
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

const factions = [
  {
    name: "Империя Аврора",
    description:
      "Могущественная фракция, стремящаяся к абсолютному контролю и порядку. Известна своей дисциплиной и военной мощью.",
    icon: <Landmark className="w-8 h-8" />,
    color: "from-red-400 to-red-600",
    members: 120,
    status: "Активна",
  },
  {
    name: "Свободные Торговцы",
    description:
      "Союз независимых торговцев и контрабандистов, ценящих свободу и прибыль. Их влияние распространяется через торговые пути.",
    icon: <Swords className="w-8 h-8" />,
    color: "from-green-400 to-green-600",
    members: 90,
    status: "Активна",
  },
  {
    name: "Орден Хранителей",
    description:
      "Древний орден, посвященный сохранению баланса и знаний. Их методы часто загадочны, но их влияние неоспоримо.",
    icon: <Shield className="w-8 h-8" />,
    color: "from-purple-400 to-purple-600",
    members: 75,
    status: "Активна",
  },
  {
    name: "Кочевники Пустошей",
    description:
      "Выжившие в суровых условиях, эти фракции живут по своим законам. Их сила в адаптации и неожиданных атаках.",
    icon: <Users className="w-8 h-8" />,
    color: "from-yellow-400 to-orange-600",
    members: 60,
    status: "Активна",
  },
]

export default function FactionsPage() {
  return (
    <>
      <ProjectHeader />
      <div className="relative min-h-screen bg-[#0d1117] pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/[0.05] via-transparent to-purple-600/[0.05] blur-3xl" />

        {/* Background shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <ElegantShape
            delay={0.3}
            width={400}
            height={100}
            rotate={12}
            gradient="from-blue-500/[0.1]"
            className="left-[-5%] top-[10%]"
          />
          <ElegantShape
            delay={0.5}
            width={300}
            height={80}
            rotate={-15}
            gradient="from-purple-600/[0.1]"
            className="right-[-5%] top-[60%]"
          />
          <ElegantShape
            delay={0.4}
            width={200}
            height={60}
            rotate={-8}
            gradient="from-cyan-500/[0.1]"
            className="left-[10%] bottom-[10%]"
          />
        </div>

        <div className="relative z-10 container mx-auto px-4 md:px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-blue-500 mb-4">
              Фракции проекта
            </h1>
            <p className="text-gray-200/60 text-lg max-w-2xl mx-auto">
              Исследуйте различные фракции, их цели и особенности в мире OwlVPI.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {factions.map((faction, index) => (
              <motion.div
                key={faction.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-blue-900/10 border border-blue-500/20 rounded-lg p-6 backdrop-blur-sm hover:border-blue-400/30 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${faction.color} rounded-lg shadow-lg flex items-center justify-center`}
                  >
                    <div className="text-white">{faction.icon}</div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-blue-300">{faction.name}</h3>
                    <p className="text-gray-400 text-sm">{faction.members} участников</p>
                  </div>
                </div>
                <p className="text-gray-200/80 leading-relaxed text-sm mb-4">{faction.description}</p>
                <div className="flex items-center gap-2 text-gray-400 text-xs">
                  <span className="font-semibold">Статус:</span>
                  <span className="text-blue-300">{faction.status}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {factions.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center py-12"
            >
              <p className="text-gray-200/60 text-lg">Фракций пока нет.</p>
            </motion.div>
          )}
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-[#0d1117]/80 pointer-events-none" />
      </div>
    </>
  )
}
