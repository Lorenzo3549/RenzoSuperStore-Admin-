import { create } from 'zustand'
import { User } from '@types/index'
import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  sendPasswordReset,
} from '@services/firebase/auth'

interface AuthStore {
  user: User | null
  loading: boolean
  error: string | null
  register: (data: {
    email: string
    password: string
    firstName: string
    lastName: string
  }) => Promise<void>
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  checkAuth: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  clearError: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  loading: false,
  error: null,

  register: async (data) => {
    set({ loading: true, error: null })
    try {
      const user = await registerUser(data)
      set({ user, loading: false })
    } catch (error: any) {
      set({ error: error.message, loading: false })
      throw error
    }
  },

  login: async (email, password) => {
    set({ loading: true, error: null })
    try {
      const user = await loginUser({ email, password })
      set({ user, loading: false })
    } catch (error: any) {
      set({ error: error.message, loading: false })
      throw error
    }
  },

  logout: async () => {
    set({ loading: true, error: null })
    try {
      await logoutUser()
      set({ user: null, loading: false })
    } catch (error: any) {
      set({ error: error.message, loading: false })
      throw error
    }
  },

  checkAuth: async () => {
    set({ loading: true })
    try {
      const user = await getCurrentUser()
      set({ user, loading: false })
    } catch (error: any) {
      set({ error: error.message, loading: false })
    }
  },

  resetPassword: async (email) => {
    set({ loading: true, error: null })
    try {
      await sendPasswordReset(email)
      set({ loading: false })
    } catch (error: any) {
      set({ error: error.message, loading: false })
      throw error
    }
  },

  clearError: () => set({ error: null }),
}))
