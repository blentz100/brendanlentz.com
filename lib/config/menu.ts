import { HomeIcon, NotesIcon, ProjectsIcon, ToolIcon } from "../../components/Icons";
import type { MenuItemProps } from "../../components/MenuItem";

export const menuItems: MenuItemProps[] = [
  {
    icon: HomeIcon,
    text: "Home",
    href: "/",
  },
  {
    icon: ToolIcon,
    text: "Tools",
    href: "/tools",
  },
  {
    icon: NotesIcon,
    text: "Blog",
    href: "/blog",
  },
  {
    icon: ProjectsIcon,
    text: "Projects",
    href: "/projects",
  },
];
