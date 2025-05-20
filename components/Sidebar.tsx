"use client";

import { useState } from "react";
import Image from "next/image";
import {
  LayoutDashboard,
  ListTodo,
  Settings,
  BarChart,
  Menu,
  List,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { cn } from "lib/utils";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ModeToggle } from "./ui/modetoggle";
import { sidebarNavItems } from "lib/navigation";



export function Sidebar() {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);



  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 right-4 z-50 md:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <Menu className="h-6 w-6" />
      </Button>
      <div
        className={cn(
          "fixed top-0 left-0 z-40 w-64 h-screen transition-transform bg-background border-r",
          !isSidebarOpen && "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="h-full px-3 py-4">
          <div className="mb-4 flex items-center justify-center object-cover w-full">
            <Image
              src="/amplify.webp" // No need to specify 'public' because it's implicitly included
              alt="Amplify Image"
              width={20} // Adjusted size to make it more visible
              height={20} // Adjusted size to make it more visible
              className="h-14 w-40 bg-white rounded-md object-contain"
            />
          </div>
          

          <ScrollArea className="h-[calc(100vh-8rem)] px-1">
            <div className="space-y-8">
              {sidebarNavItems.map((item) => (
                <Button
                  key={item.href}
                  variant={pathname === item.href ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-2",
                    pathname === item.href && "bg-primary"
                  )}
                  asChild
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <Link href={item.href}>
                    <item.icon className="h-5 w-5 " />
                    {item.title}
                  </Link>
                </Button>
              ))}

              <ModeToggle />
            </div>
          </ScrollArea>
        </div>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </>
  );
}
