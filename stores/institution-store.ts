import { create } from "zustand";
import { persist } from "zustand/middleware";

import { School } from "@/types/school";

type InstitutionState = {
  institution: School | null;
  setInstitution: (school: School) => void;
  clearInstitution: () => void;
};

export const useInstitutionStore = create<InstitutionState>()(
  persist(
    (set) => ({
      institution: null,
      setInstitution: (institution) => set({ institution }),
      clearInstitution: () => set({ institution: null }),
    }),
    {
      name: "institution-store",
    }
  )
);
