"use client";

import { usePathname } from "next/navigation";
import { sidebarNavItems } from "lib/navigation";

export function useActivePage() {
  const pathname = usePathname();

  const currentNavItem = sidebarNavItems
    .slice()
    .sort((a, b) => b.href.length - a.href.length) // Sort by href length (desc)
    .find(item => pathname.startsWith(item.href));

  return currentNavItem?.title || '';
}
