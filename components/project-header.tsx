"use client"

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/components/auth-provider'
import { Menu, X } from 'lucide-react'

export default function ProjectHeader() {
  const { user, signOut } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navigation = [
    { name: 'Главная', href: '/' },
    { name: 'Новости', href: '/news' },
    { name: 'Правила', href: '/rules' },
    { name: 'Фракции', href: '/factions' },
    { name: 'Донат', href: '/donate' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0d1117]/80 backdrop-blur-md border-b border-blue-500/20">
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                OwlVPI
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-blue-400 transition-colors"
              >
                {item.name}
              </Link>
            ))}
            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  href="/profile"
                  className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition-colors"
                >
                  <img
                    src={user.image || '/placeholder.svg'}
                    alt={user.name || 'User'}
                    className="w-8 h-8 rounded-full"
                  />
                  <span>{user.name}</span>
                </Link>
                <button
                  onClick={() => signOut()}
                  className="px-4 py-2 rounded-md bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                >
                  Выйти
                </button>
              </div>
            ) : (
              <Link
                href="/auth"
                className="px-4 py-2 rounded-md bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors"
              >
                Войти
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-blue-400 transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-gray-300 hover:text-blue-400 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {user ? (
              <div className="space-y-4">
                <Link
                  href="/profile"
                  className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <img
                    src={user.image || '/placeholder.svg'}
                    alt={user.name || 'User'}
                    className="w-8 h-8 rounded-full"
                  />
                  <span>{user.name}</span>
                </Link>
                <button
                  onClick={() => {
                    signOut()
                    setIsMobileMenuOpen(false)
                  }}
                  className="w-full px-4 py-2 rounded-md bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                >
                  Выйти
                </button>
              </div>
            ) : (
              <Link
                href="/auth"
                className="block px-4 py-2 rounded-md bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Войти
              </Link>
            )}
          </div>
        )}
      </nav>
    </header>
  )
}
