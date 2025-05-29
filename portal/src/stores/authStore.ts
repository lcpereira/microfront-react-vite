import { create } from 'zustand';

export type User = {
  email: string;
  permissions: string[];
};

type AuthState = {
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  login: (email) => {
    let permissions: string[] = [];

    if (email === 'email1@email.com') {
      permissions = ['cadastro'];
    } else if (email === 'email2@email.com') {
      permissions = ['cadastro', 'documentacao'];
    } else {
      permissions = [];
    }

    set({ user: { email, permissions } });
  },
  logout: () => set({ user: null }),
}));
