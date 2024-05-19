import { create } from "zustand";
import { persist } from "zustand/middleware";

type Store = {
  token: string;
}

type Actions = {
  setToken: (token: string) => void;
}

export const authStore = create<Store & Actions>()(
  persist((set) => ({
    token: '',
    setToken: (token) => set(() => ({ token: token })),
  }),
    {
      name: 'auth',
    }
  )
)