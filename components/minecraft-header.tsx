"use client"

import { motion } from "framer-motion"
import { Copy, Check, Menu, X, Users } from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import Image from "next/image"

function OnlineStats() {
  const [online, setOnline] = useState(0)

  useEffect(() => {
    // Симуляция получения онлайн статистики
    const updateOnline = () => {
      setOnline(Math.floor(Math.random() * 50) + 15) // 15-65 игроков
    }

    updateOnline()
    const interval = setInterval(updateOnline, 30000) // обновление каждые 30 сек

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center gap-1 text-green-500/60 text-xs font-mono">
      <Users className="w-3 h-3" />
      <span>{online}/100</span>
    </div>
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
        "inline-flex items-center gap-2 px-3 py-1 rounded-md",
        "bg-green-600/20 hover:bg-green-600/30 border border-green-500/30",
        "text-green-300 hover:text-green-200 transition-all duration-300",
        "backdrop-blur-sm shadow-lg hover:shadow-green-500/20",
        "font-mono text-xs tracking-wider",
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="hidden sm:inline">{serverIP}</span>
      <span className="sm:hidden">IP</span>
      {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
    </motion.button>
  )
}

export default function MinecraftHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { name: "Главная", href: "/" },
    { name: "Правила", href: "/rules" },
    { name: "Донат", href: "/donate" },
    { name: "Карта", href: "http://map.viewp.ru:25601/#world:-48:27:55:296:0:0:0:1:flat", external: true },
    { name: "Вики", href: "https://world-viewpoint.gitbook.io/", external: true },
  ]

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.23, 0.86, 0.39, 0.96] }}
      className="fixed top-0 left-0 right-0 z-50 bg-[#0a0f0a]/80 backdrop-blur-md"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-12">
          {/* Logo */}
          <Link href="/">
            <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.05 }}>
              <Image src="/logo.webp" alt="ViewPoint" width={32} height={32} className="rounded-lg shadow-lg" />
              <div className="flex flex-col">
                <span className="text-green-300 font-bold text-lg tracking-wide">ViewPoint</span>
                <div className="flex items-center gap-2">
                  <Image src="/minecraft_logo.png" alt="Minecraft" width={12} height={12} />
                  <span className="text-green-500/60 text-xs font-mono">1.21.1</span>
                  <OnlineStats />
                </div>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item, index) => (
              <motion.div key={item.name}>
                {item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-200/80 hover:text-green-300 transition-colors duration-300 font-medium tracking-wide"
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className="text-green-200/80 hover:text-green-300 transition-colors duration-300 font-medium tracking-wide"
                  >
                    {item.name}
                  </Link>
                )}
              </motion.div>
            ))}
          </nav>

          {/* Right side controls */}
          <div className="flex items-center gap-3">
            <CopyIPButton />
            <Link
              href="/auth"
              className="hidden sm:inline-flex items-center px-3 py-1 bg-green-600/30 hover:bg-green-600/40 border border-green-500/40 rounded-md text-green-300 hover:text-green-200 transition-all duration-300 font-medium text-sm"
            >
              Войти
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-green-300 hover:text-green-200 transition-colors"
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
                    className="block py-2 text-green-200/80 hover:text-green-300 transition-colors duration-300 font-medium tracking-wide"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className="block py-2 text-green-200/80 hover:text-green-300 transition-colors duration-300 font-medium tracking-wide"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </motion.div>
            ))}
            <Link href="/auth" className="block py-2 text-green-300 font-medium" onClick={() => setIsMenuOpen(false)}>
              Войти
            </Link>
          </motion.nav>
        )}
      </div>
    </motion.header>
  )
}
