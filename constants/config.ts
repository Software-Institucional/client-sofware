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
    subtitle: "Predeterminado",
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
