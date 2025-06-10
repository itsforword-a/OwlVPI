"use client"

import { motion } from "framer-motion"
import ProjectHeader from "@/components/project-header"
import { Newspaper, CalendarDays } from "lucide-react"
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

const newsArticles = [
  {
    id: 1,
    title: "Запуск нового сезона: 'Эпоха Возрождения'",
    date: "15.06.2025",
    content:
      "Мы рады объявить о запуске нового сезона нашей военно-политической игры! 'Эпоха Возрождения' принесет множество новых механик, фракций и глобальных событий. Приготовьтесь к новым вызовам и возможностям!",
  },
  {
    id: 2,
    title: "Обновление дипломатической системы",
    date: "01.06.2025",
    content:
      "В последнем патче мы значительно улучшили дипломатическую систему. Теперь игроки смогут заключать более сложные союзы, торговые соглашения и пакты о ненападении. Подробности в нашем Discord-канале.",
  },
  {
    id: 3,
    title: "Итоги первого турнира фракций",
    date: "20.05.2025",
    content:
      "Поздравляем победителей первого официального турнира фракций! Команда 'Железный Кулак' показала выдающиеся стратегические навыки и одержала заслуженную победу. Следите за анонсами следующих турниров!",
  },
]

export default function NewsPage() {
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
              Новости проекта
            </h1>
            <p className="text-gray-200/60 text-lg max-w-2xl mx-auto">
              Будьте в курсе последних событий и обновлений в мире OwlVPI.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-blue-900/10 border border-blue-500/20 rounded-lg p-6 backdrop-blur-sm hover:border-blue-400/30 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Newspaper className="w-6 h-6 text-blue-400" />
                  <h3 className="text-xl font-bold text-blue-300">{article.title}</h3>
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
                  <CalendarDays className="w-4 h-4" />
                  <span>{article.date}</span>
                </div>
                <p className="text-gray-200/80 leading-relaxed text-sm">{article.content}</p>
              </motion.div>
            ))}
          </div>

          {newsArticles.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center py-12"
            >
              <p className="text-gray-200/60 text-lg">Новостей пока нет.</p>
            </motion.div>
          )}
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-[#0d1117]/80 pointer-events-none" />
      </div>
    </>
  )
}
