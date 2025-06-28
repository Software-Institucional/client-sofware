import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getColumnLabel(id: string): string {
  switch (id) {
    case "name":
      return "Nombre";
    case "email":
      return "Correo electrónico";
    case "role":
      return "Rol";
    case "activate":
      return "Estado";
    case "isEmailVerified":
      return "Verificación";
    case "actions":
      return "Acciones";
    default:
      return id.charAt(0).toUpperCase() + id.slice(1);
  }
}
