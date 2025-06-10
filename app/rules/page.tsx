"use client"

import { motion } from "framer-motion"
import ProjectHeader from "@/components/project-header" // Changed import
import { Shield, Ban, AlertTriangle, Search, Gavel, BookOpen, UsersIcon } from "lucide-react" // Added new icons
import { cn } from "@/lib/utils"
import { useState } from "react"

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-blue-500/[0.08]", // Changed gradient
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
            "backdrop-blur-[2px] border-2 border-blue-400/[0.15]", // Changed border color
            "shadow-[0_8px_32px_0_rgba(66,135,245,0.1)]", // Changed shadow color
            "after:absolute after:inset-0 after:rounded-lg",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(66,135,245,0.2),transparent_70%)]", // Changed radial gradient color
          )}
        />
      </motion.div>
    </motion.div>
  )
}

const rules = [
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: "Общие положения",
    items: [
      "Проект является военно-политической игрой в Discord.",
      "Участие в проекте подразумевает согласие с данными правилами.",
      "Незнание правил не освобождает от ответственности.",
      "Администрация оставляет за собой право изменять правила без уведомления.",
      "Решения администрации являются окончательными и не подлежат обсуждению.",
    ],
  },
  {
    icon: <UsersIcon className="w-6 h-6" />,
    title: "Взаимодействие с игроками",
    items: [
      "Запрещены оскорбления, угрозы и дискриминация участников.",
      "Запрещено разглашение личной информации других игроков без их согласия.",
      "Запрещен спам, флуд и оффтоп в игровых и общих чатах.",
      "Провокации и подстрекательство к нарушению правил запрещены.",
      "Уважайте мнение других участников, даже если оно отличается от вашего.",
    ],
  },
  {
    icon: <Gavel className="w-6 h-6" />,
    title: "Игровой процесс и механики",
    items: [
      "Запрещено использование багов и уязвимостей игры для получения преимущества.",
      "Запрещены любые формы мошенничества и нечестной игры.",
      "Все действия должны соответствовать логике и правилам игрового мира.",
      "Запрещено создание фракций/государств, нарушающих баланс или правила.",
      "Дипломатические соглашения должны быть зафиксированы и одобрены администрацией.",
    ],
  },
  {
    icon: <Ban className="w-6 h-6" />,
    title: "Запрещенные действия",
    items: [
      "Запрещена реклама сторонних проектов без разрешения администрации.",
      "Запрещено распространение вредоносного ПО или ссылок.",
      "Запрещено выдавать себя за администрацию или других игроков.",
      "Запрещено использование сторонних программ для автоматизации действий.",
      "Любые действия, направленные на дестабилизацию работы проекта, запрещены.",
    ],
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Администрация и модерация",
    items: [
      "Администрация и модераторы следят за соблюдением правил.",
      "При возникновении спорных ситуаций обращайтесь к администрации.",
      "Запрещено оспаривать решения администрации в публичных чатах.",
      "Все жалобы и апелляции рассматриваются в установленном порядке.",
      "Администрация вправе применять наказания вне рамок правил в особых случаях.",
    ],
  },
  {
    icon: <AlertTriangle className="w-6 h-6" />,
    title: "Система наказаний",
    items: [
      "Наказания могут включать предупреждения, временные блокировки, муты или перманентный бан.",
      "Серьезность наказания зависит от тяжести нарушения и истории игрока.",
      "Попытка обхода наказания приведет к ужесточению меры.",
      "Предупреждения могут быть сняты по истечении определенного срока или по решению администрации.",
      "Покупка разблокировки возможна только в определенных случаях и не снимает предупреждений.",
    ],
  },
]

export default function RulesPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredRules = rules
    .map((section) => ({
      ...section,
      items: section.items.filter((item) => item.toLowerCase().includes(searchTerm.toLowerCase())),
    }))
    .filter((section) => section.items.length > 0 || section.title.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <>
      <ProjectHeader /> {/* Changed component name */}
      <div className="relative min-h-screen bg-[#0d1117] pt-8 overflow-hidden">
        {" "}
        {/* Changed background color */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/[0.05] via-transparent to-purple-600/[0.05] blur-3xl" />{" "}
        {/* Changed gradient colors */}
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
          <ElegantShape
            delay={0.6}
            width={150}
            height={40}
            rotate={20}
            gradient="from-yellow-500/[0.1]"
            className="right-[20%] top-[20%]"
          />
          <ElegantShape
            delay={0.7}
            width={180}
            height={50}
            rotate={-12}
            gradient="from-red-500/[0.1]"
            className="left-[15%] top-[50%]"
          />
          <ElegantShape
            delay={0.8}
            width={120}
            height={35}
            rotate={25}
            gradient="from-orange-500/[0.1]"
            className="right-[10%] bottom-[30%]"
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
              Правила проекта
            </h1>
            <p className="text-gray-200/60 text-lg max-w-2xl mx-auto mb-8">
              Ознакомьтесь с правилами "Стратегия: Эпоха" для комфортной игры всех участников.
            </p>

            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />{" "}
              {/* Changed icon color */}
              <input
                type="text"
                placeholder="Поиск по правилам..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-blue-900/20 border border-blue-500/30 rounded-lg text-gray-200 placeholder-gray-400/50 focus:outline-none focus:border-blue-400 transition-colors" // Changed input colors
              />
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredRules.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-blue-900/10 border border-blue-500/20 rounded-lg p-6 backdrop-blur-sm hover:border-blue-400/30 transition-all duration-300" // Changed background/border colors
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-blue-400">{section.icon}</div> {/* Changed icon color */}
                  <h3 className="text-xl font-bold text-blue-300">{section.title}</h3> {/* Changed text color */}
                </div>
                <ul className="space-y-3">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-gray-200/80 text-sm leading-relaxed flex items-start gap-2">
                      {" "}
                      {/* Changed text color */}
                      <span className="text-blue-400 mt-1 text-xs">•</span> {/* Changed bullet color */}
                      <span
                        dangerouslySetInnerHTML={{
                          __html: searchTerm
                            ? item.replace(
                                new RegExp(`(${searchTerm})`, "gi"),
                                '<mark class="bg-yellow-400/30 text-yellow-200">$1</mark>',
                              )
                            : item,
                        }}
                      />
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {filteredRules.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center py-12"
            >
              <p className="text-gray-200/60 text-lg">По вашему запросу ничего не найдено</p> {/* Changed text color */}
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="grid md:grid-cols-2 gap-6"
          >
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6 backdrop-blur-sm">
              {" "}
              {/* Changed background/border colors */}
              <h3 className="text-xl font-bold text-red-300 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Важно помнить
              </h3>
              <p className="text-red-200/70 leading-relaxed text-sm">
                Незнание правил не освобождает от ответственности. Администрация оставляет за собой право изменять
                правила без предварительного уведомления. Руководители проекта в особых случаях в праве наказывать
                нарушителей вне рамок правил проекта.
              </p>
            </div>

            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-6 backdrop-blur-sm">
              {" "}
              {/* Changed background/border colors */}
              <h3 className="text-xl font-bold text-blue-300 mb-3 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Проверки
              </h3>
              <p className="text-blue-200/70 leading-relaxed text-sm">
                Поддержка вправе вызвать вас на глобальную проверку с помощью приложения AnyDesk. В случае игнорирования
                вызова, выхода с сервера или отказа после вызова на проверку вы будете заблокированы.
              </p>
            </div>
          </motion.div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-[#0d1117]/80 pointer-events-none" />{" "}
        {/* Changed gradient colors */}
      </div>
    </>
  )
}
