"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSubItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

import { Icons } from "../icons";
import { Button } from "../ui/button";
import { useState } from "react";
import { FreshtrackTrigger } from "./freshtrack-trigger";

const items = [
  {
    title: "Camera",
    url: "/viewfinder",
    icon: <Icons.Camera className="w-6 h-6"/>,
  },
  {
    title: "Inventory",
    url: "#",
    icon: <Icons.Inbox className="w-6 h-6"/>,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: <Icons.User className="w-6 h-6"/>
  }
];

export function AppSidebar() {
  // const [open, setOpen] = useState<boolean>(false);

  // const { toggleSidebar } = useSidebar();

  return (
    <>
      <div className="">
        <FreshtrackTrigger className="absolute m-3" />

        <Sidebar variant="sidebar" className="z-0">
          <SidebarContent>
            <div className="h-8 w-8 mb-5 invisible" />

            <SidebarGroup>
              {/* <SidebarGroupLabel>Projects</SidebarGroupLabel> */}
              <SidebarGroupContent>
                <SidebarMenu>

                  {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton>
                        <a href={item.url} className="flex gap-2 items-center text-lg">
                          {item.icon}
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}

                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      </div>
    </>
  );
}
