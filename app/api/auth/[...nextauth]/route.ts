import NextAuth from "next-auth"
import Discord from "next-auth/providers/discord"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"

// Log environment variables for debugging
console.log("NEXTAUTH_URL:", process.env.NEXTAUTH_URL)
console.log("DISCORD_CLIENT_ID:", process.env.DISCORD_CLIENT_ID)
console.log("DISCORD_CLIENT_SECRET:", process.env.DISCORD_CLIENT_SECRET)
console.log("DATABASE_URL:", process.env.DATABASE_URL)

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Discord({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "identify email",
          prompt: "consent",
        },
      },
      profile(profile) {
        console.log("Discord profile:", profile)
        return {
          id: profile.id,
          name: profile.username,
          email: profile.email,
          image: `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`,
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth",
    error: "/auth",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log("SignIn callback:", { user, account, profile })
      return true
    },
    async session({ session, user }) {
      console.log("Session callback:", { session, user })
      if (session.user) {
        session.user.id = user.id
      }
      return session
    },
    async jwt({ token, user, account, profile }) {
      console.log("JWT callback:", { token, user, account, profile })
      if (user) {
        token.id = user.id
      }
      return token
    },
  },
  debug: true,
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }
