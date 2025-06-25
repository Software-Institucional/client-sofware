import { Bell, Monitor, Moon, Palette, Sun, User } from "lucide-react";

export const settingsTabs = [
  {
    value: "account",
    label: "Cuenta",
    icon: User,
    description: "Gestiona tu información personal",
  },
  {
    value: "appearance",
    label: "Apariencia",
    icon: Palette,
    description: "Personaliza el tema y la interfaz",
  },
  {
    value: "notifications",
    label: "Notificaciones",
    icon: Bell,
    description: "Configura tus preferencias de notificaciones",
  },
];

export const themeOptions = [
  {
    value: "system",
    label: "Tema del Sistema",
    subtitle: "Por defecto",
    description: "Este tema utilizará el tema que su sistema está utilizando.",
    icon: Monitor,
    preview: "mixed",
  },
  {
    value: "light",
    label: "Tema Claro",
    subtitle: "Modo claro",
    description:
      "Activo cuando su sistema está configurado para utilizar el modo de claro.",
    icon: Sun,
    preview: "light",
  },
  {
    value: "dark",
    label: "Tema Oscuro",
    subtitle: "Modo oscuro",
    description: "Diseño agradable a la vista para entornos con poca luz.",
    icon: Moon,
    preview: "dark",
  },
];

export const colorSchemes = [
  { value: "red", label: "Rojo", bg: "#fb2c36" },
  { value: "green", label: "Verde", bg: "#00c951" },
  { value: "pink", label: "Rosa", bg: "#ff2056" },
  { value: "blue", label: "Azul", bg: "#2b7fff" },
  { value: "orange", label: "Naranja", bg: "#ff6900" },
  { value: "violet", label: "Violeta", bg: "#8e51ff" },
  { value: "yellow", label: "Amarillo", bg: "#f0b100" },
];

export const fonts = [
  { value: "inter", label: "Inter", class: "font-inter" },
  { value: "system", label: "Sistema", class: "font-system" },
  { value: "mono", label: "Mono", class: "font-mono" },
  { value: "poppins", label: "Poppins", class: "font-poppins" },
  { value: "rubik", label: "Rubik", class: "font-rubik" },
  { value: "outfit", label: "Outfit", class: "font-outfit" },
];

export const fontSizes = [
  { value: "sm", label: "Pequeño", description: "14px – Compacto", size: "text-[14px]" },
  { value: "base", label: "Normal", description: "16px – Estándar", size: "text-[16px]" },
  { value: "lg", label: "Grande", description: "18px – Cómodo", size: "text-[18px]" },
];

