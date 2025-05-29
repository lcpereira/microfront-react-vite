import { create } from 'zustand';

export interface Register {
  email: string;
  select: string;
  multiSelect: string[];
  text: string;
}

export interface UploadInfo {
  email?: string;
  fileName: string;
  timestamp: number;
}

interface RegisterStore {
  temp: Partial<Register>;
  tempUpload?: File;

  setTemp: (data: Partial<Register>) => void;
  clearTemp: () => void;
  setTempUpload: (file: File) => void;
  clearTempUpload: () => void;

  addRegister: (c: Register) => void;
  getRegisters: () => Register[];

  addUpload: (upload: UploadInfo) => void;
  getUploads: () => UploadInfo[];
}

const useRegisterStore = create<RegisterStore>((set) => ({
  temp: {},
  tempUpload: undefined,

  setTemp: (data) => set((state) => ({ temp: { ...state.temp, ...data } })),
  clearTemp: () => set({ temp: {} }),
  setTempUpload: (file) => set({ tempUpload: file }),
  clearTempUpload: () => set({ tempUpload: undefined }),

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

export default useRegisterStore;
