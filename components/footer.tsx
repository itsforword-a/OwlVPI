"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Heart } from "lucide-react"

export default function Footer() {
  const footerLinks = [
    {
      title: "Проект",
      links: [
        { name: "Правила", href: "/rules" },
        { name: "Донат", href: "/donate" },
        { name: "Фракции", href: "/factions" },
        { name: "Новости", href: "/news" },
      ],
    },
    {
      title: "Сообщество",
      links: [
        { name: "Discord", href: "https://discord.gg/your-invite-link", external: true }, // Replace with actual Discord invite
        { name: "Telegram", href: "https://t.me/your-telegram-channel", external: true }, // Replace with actual Telegram link
        { name: "Вики", href: "https://your-project-wiki.gitbook.io/", external: true },
        { name: "Поддержка", href: "#" },
      ],
    },
    {
      title: "Информация",
      links: [
        { name: "О проекте", href: "#" },
        { name: "Команда", href: "#" },
        { name: "Контакты", href: "#" },
        { name: "Политика конфиденциальности", href: "/privacy" },
      ],
    },
  ]

  return (
    <footer className="relative bg-[#0d1117] border-t border-blue-500/20">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/[0.03] via-transparent to-purple-600/[0.03]" />
      <div className="relative z-10 container mx-auto px-4 md:px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="md:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-4"
            >
              <Image
                src="/owlvpi-logo.png" // Updated logo path
                alt="OwlVPI Logo"
                width={40}
                height={40}
                className="rounded-lg shadow-lg"
              />
              <div>
                <h3 className="text-blue-300 font-bold text-xl">OwlVPI</h3> {/* Updated project name */}
                <p className="text-gray-400/60 text-sm font-mono">Военно-политическая игра</p>
              </div>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-gray-200/60 text-sm leading-relaxed mb-4"
            >
              Глубокая военно-политическая игра в Discord, где каждое ваше решение имеет значение.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-2 text-blue-400 text-sm"
            >
              <Heart className="w-4 h-4" />
              <span>Развиваемся вместе с вами</span>
            </motion.div>
          </div>

          {/* Links */}
          {footerLinks.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
            >
              <h4 className="text-blue-300 font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-200/60 hover:text-blue-300 transition-colors text-sm"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link href={link.href} className="text-gray-200/60 hover:text-blue-300 transition-colors text-sm">
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="border-t border-blue-500/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-gray-200/40 text-sm">© 2024 OwlVPI. Все права защищены.</p> {/* Updated project name */}
          <div className="flex items-center gap-4 text-gray-200/40 text-sm">
            <span>Discord: discord.gg/invite</span>
            <span>•</span>
            <span>Версия: 1.0</span>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
