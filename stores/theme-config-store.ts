import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ThemeConfig {
  mode: "light" | "dark" | "system";
  colorScheme:
    | "blue"
    | "orange"
    | "red"
    | "pink"
    | "violet"
    | "green"
    | "yellow";
  font: "inter" | "system" | "mono" | "poppins" | "rubik" | "outfit";
  fontSize: "sm" | "base" | "lg" | "xl";
}

const defaultConfig: ThemeConfig = {
  mode: "system",
  colorScheme: "blue",
  font: "system",
  fontSize: "base",
};

interface ThemeConfigStore {
  config: ThemeConfig;
  updateConfig: (updates: Partial<ThemeConfig>) => void;
  resetConfig: () => void;
}

export const useThemeConfigStore = create<ThemeConfigStore>()(
  persist(
    (set, get) => ({
      config: defaultConfig,
      updateConfig: (updates) => {
        const newConfig = { ...get().config, ...updates };
        set({ config: newConfig });
      },
      resetConfig: () => set({ config: defaultConfig }),
    }),
    {
      name: "theme-config",
    }
  )
);
