import {
  HelpCircleIcon,
  LayoutDashboardIcon,
  School,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";

export const data = {
  navMain: [
    {
      title: "Inicio",
      url: "/dashboard",
      icon: LayoutDashboardIcon,
    },
  ],
  navSecondary: [
    {
      title: "Configuración",
      url: "/config",
      icon: SettingsIcon,
    },
    {
      title: "Soporte",
      url: "#",
      icon: HelpCircleIcon,
    },
  ],
  administration: [
    {
      name: "Instituciones",
      url: "/institutions",
      icon: School,
    },
    {
      name: "Usuarios",
      url: "/users",
      icon: UsersIcon,
    },
  ],
};
