'use client'

import { motion } from "framer-motion"
import ProjectHeader from "@/components/project-header"
import { Star, Zap, Gift, Shield, Gem, ScrollText, Handshake } from "lucide-react"

const donatePackages = [
  {
    name: "Набор Рекрута",
    price: "150₽",
    icon: <Star className="w-8 h-8" />,
    color: "from-gray-400 to-gray-600",
    description: "Базовый набор для старта",
    features: ["Поддержка проекта", "Доступ к эксклюзивным каналам", "Приоритет в регистрации", "Косметические бонусы"],
  },
  {
    name: "Пакет Стратега",
    price: "250₽",
    icon: <Zap className="w-8 h-8" />,
    color: "from-blue-400 to-blue-600",
    description: "Расширенные возможности",
    features: [
      "Все привилегии Рекрута",
      "Дополнительные ресурсы",
      "Ускоренное обучение",
      "Уникальный префикс в Discord",
    ],
  },
  {
    name: "Дипломатический Корпус",
    price: "250₽",
    icon: <Handshake className="w-8 h-8" />,
    color: "from-purple-400 to-purple-600",
    description: "Поддержка дипломатии",
    features: ["Доступ к закрытым дипломатическим чатам", "Возможность влиять на политику", "Специальные роли"],
  },
  {
    name: "Архив Знаний",
    price: "250₽",
    icon: <ScrollText className="w-8 h-8" />,
    color: "from-yellow-400 to-orange-600",
    description: "Доступ к секретной информации",
    features: ["Доступ к историческим данным", "Секретные документы", "Аналитические сводки"],
  },
  {
    name: "Военный Фонд",
    price: "300₽",
    icon: <Shield className="w-8 h-8" />,
    color: "from-red-400 to-red-600",
    description: "Поддержка военных операций",
    features: ["Вклад в развитие армии", "Участие в военных советах", "Эксклюзивные награды"],
  },
  {
    name: "Элитный Спонсор",
    price: "500₽",
    icon: <Gem className="w-8 h-8" />,
    color: "from-green-400 to-green-600",
    description: "Максимальная поддержка",
    features: [
      "Все привилегии предыдущих пакетов",
      "Персональная консультация с разработчиками",
      "Участие в закрытых голосованиях",
      "Особая благодарность",
    ],
  },
]

export default function DonateClient() {
  return (
    <div className="min-h-screen bg-[#0d1117] pt-20">
      <ProjectHeader />
      <div className="container mx-auto px-4 md:px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-blue-500 mb-4">
            Поддержать проект
          </h1>
          <p className="text-gray-200/60 text-lg max-w-2xl mx-auto">
            Ваша поддержка помогает развивать проект и добавлять новые возможности в игру.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {donatePackages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-blue-900/10 border border-blue-500/20 rounded-lg p-6 backdrop-blur-sm hover:border-blue-400/40 transition-all duration-300"
            >
              <div className="text-center mb-6">
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${pkg.color} rounded-lg shadow-lg flex items-center justify-center mx-auto mb-4`}
                >
                  <div className="text-white">{pkg.icon}</div>
                </div>
                <h3 className="text-2xl font-bold text-blue-300 mb-2">{pkg.name}</h3>
                <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-blue-500">
                  {pkg.price}
                </div>
                {pkg.description && <p className="text-gray-200/60 text-sm mt-2">{pkg.description}</p>}
              </div>

              <ul className="space-y-3 mb-6">
                {pkg.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="text-gray-200/80 text-sm flex items-start gap-2">
                    <span className="text-blue-400 mt-1">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 bg-blue-600/30 hover:bg-blue-600/40 border border-blue-500/40 rounded-lg text-blue-200 font-medium transition-all duration-300"
              >
                Купить
              </motion.button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-6 max-w-2xl mx-auto"
        >
          <div className="flex items-center gap-3 mb-4">
            <Gift className="w-6 h-6 text-blue-400" />
            <h3 className="text-xl font-bold text-blue-300">Важная информация</h3>
          </div>
          <ul className="space-y-2 text-gray-200/70 text-sm">
            <li>• Все покупки активируются автоматически после оплаты</li>
            <li>• Привилегии действуют бессрочно</li>
            <li>• Возврат средств возможен в течение 24 часов</li>
            <li>• При проблемах обращайтесь в Discord поддержку</li>
          </ul>
        </motion.div>
      </div>
    </div>
  )
} 