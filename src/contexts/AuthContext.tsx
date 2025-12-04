import React, { createContext, useContext, useState, useEffect } from 'react'

type UserRole = 'student' | 'recruiter' | 'admin'

interface User {
  id: string
  name: string
  email: string
  role: UserRole
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  signup: (name: string, email: string, password: string, role: UserRole) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('user')
    return saved ? JSON.parse(saved) : null
  })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      localStorage.removeItem('user')
    }
  }, [user])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Demo credentials
    const demoUsers: Record<string, { password: string; user: User }> = {
      'student@example.com': {
        password: 'password123',
        user: {
          id: 'student-1',
          name: 'Alex Johnson',
          email: 'student@example.com',
          role: 'student'
        }
      },
      'recruiter@example.com': {
        password: 'password123',
        user: {
          id: 'recruiter-1',
          name: 'Sarah Wilson',
          email: 'recruiter@example.com',
          role: 'recruiter'
        }
      },
      'admin@example.com': {
        password: 'password123',
        user: {
          id: 'admin-1',
          name: 'Admin User',
          email: 'admin@example.com',
          role: 'admin'
        }
      }
    }

    if (demoUsers[email] && demoUsers[email].password === password) {
      setUser(demoUsers[email].user)
      setIsLoading(false)
      return true
    }
    
    setIsLoading(false)
    return false
  }

  const signup = async (name: string, email: string, password: string, role: UserRole): Promise<boolean> => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Check if email already exists in localStorage
    const existingUser = localStorage.getItem('user')
    if (existingUser && JSON.parse(existingUser).email === email) {
      setIsLoading(false)
      return false
    }

    const newUser: User = {
      id: `${role}-${Date.now()}`,
      name,
      email,
      role
    }

    setUser(newUser)
    setIsLoading(false)
    return true
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}