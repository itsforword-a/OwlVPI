"use client"

import { createContext, useContext, useEffect, useState } from 'react'
import { useSession, signOut as nextAuthSignOut } from 'next-auth/react'

type User = {
  id: string
  name: string | null
  email: string | null
  image: string | null
}

type AuthContextType = {
  user: User | null
  loading: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    if (session?.user) {
      setUser({
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
      })
    } else {
      setUser(null)
    }
  }, [session])

  const signOut = async () => {
    await nextAuthSignOut()
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading: status === 'loading',
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
