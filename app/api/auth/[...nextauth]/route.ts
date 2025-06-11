import NextAuth from "next-auth"
import DiscordProvider from "next-auth/providers/discord"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      authorization: { params: { scope: "identify email guilds" } },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id
        // Проверяем, является ли пользователь администратором
        session.user.role = user.email === "kartabak86@gmail.com" ? "admin" : "user"
      }
      return session
    },
    async signIn({ user }) {
      // Проверяем, является ли пользователь администратором
      if (user.email === "kartabak86@gmail.com") {
        await prisma.user.update({
          where: { email: user.email },
          data: { role: "admin" }
        })
      }
      return true
    }
  },
  pages: {
    signIn: "/auth",
  },
})

export { handler as GET, handler as POST } 