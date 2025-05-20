import {
  LayoutDashboard,
  ListTodo,
  List,
  BarChart,
  Settings,
} from "lucide-react";

export const sidebarNavItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Products",
    href: "/products",
    icon: ListTodo,
  },
  {
    title: "Order Lists",
    href: "/order",
    icon: List,
  },
  {
    title: "",
    href: "",
    icon: BarChart,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];
