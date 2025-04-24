import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type UserRole = 'Creator' | 'Admin' | 'Viewer'

interface User {
    phone_number: string
    email: string
    full_name: string
    role: UserRole
    user_id: string
}

interface UserStore {
    user: User | null
    setUser: (user: User) => void
    clearUser: () => void
}

export const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            user: null,
            setUser: (user) => set({ user }),
            clearUser: () => set({ user: null }),
        }),
        {
            name: 'user-storage', // key in localStorage
        }
    )
)
