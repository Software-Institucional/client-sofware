import { School } from "./school";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  isEmailVerified: boolean;
  activate: boolean;
  schools: School[];
}