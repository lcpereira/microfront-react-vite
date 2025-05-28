import { create } from 'zustand';

export type User = {
  email: string;
  permissions: string[];
};

type UserStore = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
