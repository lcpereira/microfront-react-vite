import { create } from 'zustand';

interface Register {
  email: string;
  select: string;
  multiSelect: string[];
  text: string;
}

interface UploadInfo {
  email?: string;
  fileName: string;
  timestamp: number;
}

interface RegisterStore {
  temp: Partial<Register>;
  setTemp: (data: Partial<Register>) => void;
  clearTemp: () => void;

  addRegister: (c: Register) => void;
  getRegisters: () => Register[];

  addUpload: (upload: UploadInfo) => void;
  getUploads: () => UploadInfo[];
}

export const useRegisterStore = create<RegisterStore>((set) => ({
  temp: {},
  setTemp: (data) => set((state) => ({ temp: { ...state.temp, ...data } })),
  clearTemp: () => set({ temp: {} }),

  addRegister: (register) => {
    const existing = JSON.parse(localStorage.getItem('registers') || '[]');
    existing.push(register);
    localStorage.setItem('registers', JSON.stringify(existing));
  },

  getRegisters: () => {
    return JSON.parse(localStorage.getItem('registers') || '[]');
  },

  addUpload: (upload) => {
    const existing = JSON.parse(localStorage.getItem('uploads') || '[]');
    existing.push(upload);
    localStorage.setItem('uploads', JSON.stringify(existing));
  },

  getUploads: () => {
    return JSON.parse(localStorage.getItem('uploads') || '[]');
  },
}));
