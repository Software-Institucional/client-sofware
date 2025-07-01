import {
  BarChartIcon,
  CameraIcon,
  ClipboardListIcon,
  DatabaseIcon,
  FileCodeIcon,
  FileIcon,
  FileTextIcon,
  FolderIcon,
  HelpCircleIcon,
  LayoutDashboardIcon,
  ListIcon,
  School,
  SearchIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";

export const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
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
