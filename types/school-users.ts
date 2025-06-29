import { School, Sede } from "@/types/school";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  isEmailVerified: boolean;
  activate: boolean;
  school: School;
  sedes: Sede;
}

export type Filters = {
  role: string[];
  activate: string[];
  isEmailVerified: string[];
};
