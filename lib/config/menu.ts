import { ActivityIcon, HomeIcon, ProjectsIcon, ToolIcon } from "../../components/Icons";
import type { MenuItemProps } from "../../components/MenuItem";

export const menuItems: MenuItemProps[] = [
  {
    icon: HomeIcon,
    text: "Home",
    href: "/",
  },
  {
    icon: ActivityIcon,
    text: "Habits",
    href: "/habits",
  },
  {
    icon: ToolIcon,
    text: "Tools",
    href: "/tools",
  },
  {
    icon: ProjectsIcon,
    text: "Projects",
    href: "/projects",
  },
];
