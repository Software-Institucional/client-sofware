import { create } from "zustand";
import { persist } from "zustand/middleware";

import { User } from "@/types/user";
import { useSchoolStore } from "@/stores/school-store";

type AuthState = {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => {
        const schoolStore = useSchoolStore.getState();
        schoolStore.reset(); 
        set({ user: null });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
