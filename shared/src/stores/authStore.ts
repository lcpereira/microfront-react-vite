import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type User = {
  email: string;
  permissions: string[];
};

type AuthState = {
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
};

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: (email) => {
        let permissions: string[] = [];

        if (email === 'email1@email.com') {
          permissions = ['register'];
        } else if (email === 'email2@email.com') {
          permissions = ['register', 'upload'];
        } else {
          permissions = [];
        }

        set({ user: { email, permissions } });
      },
      logout: () => set({ user: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state: AuthState) => ({ user: state.user }),
    }
  )
);

export default useAuthStore;
