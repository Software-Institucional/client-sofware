import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { School } from "@/types/school";

interface SchoolStore {
  selectedSchool: School | null;
  setSelectedSchool: (school: School) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  reset: () => void;
}

export const useSchoolStore = create<SchoolStore>()(
  persist(
    (set) => ({
      selectedSchool: null,
      currentPage: 1,
      setSelectedSchool: (school) => set({ selectedSchool: school }),
      setCurrentPage: (page) => set({ currentPage: page }),
      reset: () =>
        set({
          selectedSchool: null,
          currentPage: 1,
        }),
    }),
    {
      name: "school-store",
    }
  )
);
