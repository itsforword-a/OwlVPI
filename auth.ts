import NextAuth from "next-auth"
import Discord from "next-auth/providers/discord"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

if (!process.env.DISCORD_CLIENT_ID) {
  throw new Error("DISCORD_CLIENT_ID is not set")
}

if (!process.env.DISCORD_CLIENT_SECRET) {
  throw new Error("DISCORD_CLIENT_SECRET is not set")
}

if (!process.env.AUTH_SECRET) {
  throw new Error("AUTH_SECRET is not set")
}

// Логируем переменные окружения для отладки
console.log("AUTH_URL:", process.env.AUTH_URL)
console.log(
  "AUTH_SECRET (first 5 chars):",
  process.env.AUTH_SECRET.substring(0, 5)
)
console.log("DISCORD_CLIENT_ID:", process.env.DISCORD_CLIENT_ID)

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Discord({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
  },
  pages: {
    signIn: "/auth",
    error: "/auth/error",
  },
  secret: process.env.AUTH_SECRET,
})
