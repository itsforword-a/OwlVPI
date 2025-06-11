import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from '@/components/auth-provider'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "OwlVPI - Военно-политическая игра в Discord", // Updated title
  description:
    "Погрузитесь в мир стратегических решений, дипломатии и военных конфликтов в нашей уникальной Discord игре.", // Updated description
  keywords: "военная игра, политическая игра, стратегия, Discord, ролевая игра, фракции, дипломатия, OwlVPI", // Updated keywords
  icons: {
    icon: "/owlvpi-logo.png", // Updated logo path
    shortcut: "/owlvpi-logo.png",
    apple: "/owlvpi-logo.png",
  },
  openGraph: {
    title: "OwlVPI - Военно-политическая игра в Discord", // Updated title
    description:
      "Погрузитесь в мир стратегических решений, дипломатии и военных конфликтов в нашей уникальной Discord игре.", // Updated description
    type: "website",
    images: [
      {
        url: "/owlvpi-logo.png", // Updated logo path
        width: 512,
        height: 512,
        alt: "OwlVPI Logo",
      },
    ],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <head>
        <style>{`
          /* Custom scrollbar */
          ::-webkit-scrollbar {
            width: 8px;
          }
          
          ::-webkit-scrollbar-track {
            background: rgba(13, 17, 23, 0.5); /* Darker background for track */
          }
          
          ::-webkit-scrollbar-thumb {
            background: linear-gradient(to bottom, #3b82f6, #2563eb); /* Blue gradient */
            border-radius: 4px;
            box-shadow: 0 0 10px rgba(59, 130, 246, 0.5); /* Blue shadow */
          }
          
          ::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(to bottom, #2563eb, #1d4ed8); /* Darker blue on hover */
          }
          
          /* Firefox */
          html {
            scrollbar-width: thin;
            scrollbar-color: #3b82f6 rgba(13, 17, 23, 0.5); /* Blue thumb, dark track */
          }
        `}</style>
      </head>
      <body>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}
