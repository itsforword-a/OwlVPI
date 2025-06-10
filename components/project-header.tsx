"use client"

import { motion } from "framer-motion"
import { Menu, X, Users } from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import Image from "next/image"
import { signOut, useSession } from "next-auth/react"

function OnlineStats() {
  const [online, setOnline] = useState(0)

  useEffect(() => {
    const updateOnline = () => {
      setOnline(Math.floor(Math.random() * 200) + 50)
    }

    updateOnline()
    const interval = setInterval(updateOnline, 30000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center gap-1 text-gray-400 text-xs font-mono">
      <Users className="w-3 h-3" />
      <span>{online} онлайн</span>
    </div>
  )
}

function JoinDiscordButton() {
  const discordInviteLink = "https://discord.gg/your-invite-link"

  return (
    <motion.a
      href={discordInviteLink}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1 rounded-md",
        "bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30",
        "text-blue-300 hover:text-blue-200 transition-all duration-300",
        "backdrop-blur-sm shadow-lg hover:shadow-blue-500/20",
        "font-mono text-xs tracking-wider",
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span>Discord</span>
    </motion.a>
  )
}

export default function ProjectHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { data: session } = useSession()

  const navItems = [
    { name: "Главная", href: "/" },
    { name: "Правила", href: "/rules" },
    { name: "Донат", href: "/donate" },
    { name: "Новости", href: "/news" },
    { name: "Фракции", href: "/factions" },
    { name: "Вики", href: "https://your-project-wiki.gitbook.io/", external: true },
  ]

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.23, 0.86, 0.39, 0.96] }}
      className="fixed top-0 left-0 right-0 z-50 bg-[#0d1117]/80 backdrop-blur-md"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-12">
          {/* Logo */}
          <Link href="/">
            <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.05 }}>
              <Image
                src="/owlvpi-logo.png"
                alt="OwlVPI Logo"
                width={32}
                height={32}
                className="rounded-lg shadow-lg"
              />
              <div className="flex flex-col">
                <span className="text-blue-300 font-bold text-lg tracking-wide">OwlVPI</span>
                <OnlineStats />
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <motion.div key={item.name}>
                {item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-200/80 hover:text-blue-300 transition-colors duration-300 font-medium tracking-wide"
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className="text-gray-200/80 hover:text-blue-300 transition-colors duration-300 font-medium tracking-wide"
                  >
                    {item.name}
                  </Link>
                )}
              </motion.div>
            ))}
            {session ? (
              <>
                <Link
                  href="/profile"
                  className="text-gray-200/80 hover:text-blue-300 transition-colors duration-300 font-medium tracking-wide"
                >
                  Профиль
                </Link>
                <button
                  onClick={() => signOut()}
                  className="px-3 py-1 bg-red-600/30 hover:bg-red-600/40 border border-red-500/40 rounded-md text-red-300 hover:text-red-200 transition-all duration-300 font-medium text-sm"
                >
                  Выйти
                </button>
              </>
            ) : (
              <Link
                href="/auth"
                className="px-3 py-1 bg-blue-600/30 hover:bg-blue-600/40 border border-blue-500/40 rounded-md text-blue-300 hover:text-blue-200 transition-all duration-300 font-medium text-sm"
              >
                Войти
              </Link>
            )}
          </nav>

          {/* Right side controls */}
          <div className="flex items-center gap-3">
            <JoinDiscordButton />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-blue-300 hover:text-blue-200 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4"
          >
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                {item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block py-2 text-gray-200/80 hover:text-blue-300 transition-colors duration-300 font-medium tracking-wide"
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className="block py-2 text-gray-200/80 hover:text-blue-300 transition-colors duration-300 font-medium tracking-wide"
                  >
                    {item.name}
                  </Link>
                )}
              </motion.div>
            ))}
            {session ? (
              <>
                <Link
                  href="/profile"
                  className="block py-2 text-gray-200/80 hover:text-blue-300 transition-colors duration-300 font-medium tracking-wide"
                >
                  Профиль
                </Link>
                <button
                  onClick={() => signOut()}
                  className="w-full mt-2 px-3 py-2 bg-red-600/30 hover:bg-red-600/40 border border-red-500/40 rounded-md text-red-300 hover:text-red-200 transition-all duration-300 font-medium text-sm"
                >
                  Выйти
                </button>
              </>
            ) : (
              <Link
                href="/auth"
                className="block w-full mt-2 px-3 py-2 bg-blue-600/30 hover:bg-blue-600/40 border border-blue-500/40 rounded-md text-blue-300 hover:text-blue-200 transition-all duration-300 font-medium text-sm text-center"
              >
                Войти
              </Link>
            )}
          </motion.nav>
        )}
      </div>
    </motion.header>
  )
}
