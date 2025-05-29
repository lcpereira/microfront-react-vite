import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type TmpState = {
  temp: Partial<Register>;
  tempUpload?: File;

  setTemp: (data: Partial<Register>) => void;
  clearTemp: () => void;
  setTempUpload: (file: File) => void;
  clearTempUpload: () => void;
};

const useTmpStore = create<TmpState>()(
  persist(
    (set) => ({
      temp: {},
      tempUpload: undefined,

      setTemp: (data) => set((state) => ({ temp: { ...state.temp, ...data } })),
      clearTemp: () => set({ temp: {} }),
      setTempUpload: (file) => set({ tempUpload: file }),
      clearTempUpload: () => set({ tempUpload: undefined }),
    }),
    {
      name: 'tmp-storage',
    }
  )
);

export default useTmpStore;
