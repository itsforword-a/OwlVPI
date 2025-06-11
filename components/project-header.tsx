"use client"

import { motion } from "framer-motion"
import { Menu, X, Users } from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from '@/components/auth-provider'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

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
  const discordInviteLink = "https://discord.gg/cB7hdKgUN2"

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
  const { user, signOut } = useAuth()
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    router.push('/auth')
  }

  const navigation = [
    { name: "Главная", href: "/" },
    { name: "Новости", href: "/news" },
    { name: "Правила", href: "/rules" },
    { name: "Фракции", href: "/factions" },
    { name: "Донат", href: "/donate" },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0d1117]/80 backdrop-blur-md border-b border-blue-500/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-blue-300">
            Hero Geometric
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-200/80 hover:text-blue-300 transition-colors duration-300 text-sm"
              >
                {item.name}
              </Link>
            ))}
            {user ? (
              <>
                <Link href="/profile" className="text-gray-200/80 hover:text-blue-300 transition-colors duration-300 text-sm">
                  Профиль
                </Link>
                <Button
                  variant="ghost"
                  onClick={handleSignOut}
                  className="text-gray-200/80 hover:text-blue-300 transition-colors duration-300 text-sm"
                >
                  Выйти
                </Button>
              </>
            ) : (
              <Link href="/auth">
                <Button variant="default" className="text-sm">
                  Войти
                </Button>
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-200/80 hover:text-blue-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden py-4"
          >
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-200/80 hover:text-blue-300 transition-colors duration-300 text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {user ? (
                <>
                  <Link
                    href="/profile"
                    className="text-gray-200/80 hover:text-blue-300 transition-colors duration-300 text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Профиль
                  </Link>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      handleSignOut()
                      setIsMenuOpen(false)
                    }}
                    className="text-gray-200/80 hover:text-blue-300 transition-colors duration-300 text-sm"
                  >
                    Выйти
                  </Button>
                </>
              ) : (
                <Link
                  href="/auth"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button variant="default" className="w-full text-sm">
                    Войти
                  </Button>
                </Link>
              )}
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  )
}
