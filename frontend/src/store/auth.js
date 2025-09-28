import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => {
        set({ user: null });
        useSubscStore.getState().setSubsc(null);
      },
    }),
    {
      name: "auth-storage",
    }
  )
);

export const useSubscStore = create(
  persist(
    (set) => ({
      subsc: null,
      setSubsc: (subsc) => set({ subsc }),
    }),
    {
      name: "subsc-storage",
    }
  )
);
