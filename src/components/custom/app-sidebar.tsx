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
    title: "Inbox",
    url: "#",
    icon: <Icons.Inbox />,
  },
  {
    title: "Camera",
    url: "/viewfinder",
    icon: <Icons.Camera />,
  },
];

export function AppSidebar() {
  // const [open, setOpen] = useState<boolean>(false);

  // const { toggleSidebar } = useSidebar();

  return (
    <>
      <div className="">
        <FreshtrackTrigger className="absolute m-2" />

        <Sidebar variant="sidebar" className="z-10">
          <SidebarContent>
            <div className="h-8 w-8 invisible" />

            <SidebarGroup>
              {/* <SidebarGroupLabel>Projects</SidebarGroupLabel> */}
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton>
                        <a href={item.url}>
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
