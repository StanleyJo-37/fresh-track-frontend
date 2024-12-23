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
import { useContext, useState } from "react";
import { FreshtrackTrigger } from "./freshtrack-trigger";
import { AuthContext } from "@/contexts/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthAPI from "@/api/AuthAPI";
import { deleteSession } from "@/lib/session";

const items = [
  {
    title: "Home",
    url: "/",
    icon: <Icons.House className="w-6 h-6" />,
  },
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: <Icons.LayoutDashboard className="w-6 h-6" />,
  },
  {
    title: "Camera",
    url: "/viewfinder",
    icon: <Icons.Camera className="w-6 h-6" />,
  },
  {
    title: "Inventory",
    url: "/inventory",
    icon: <Icons.Inbox className="w-6 h-6" />,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: <Icons.User className="w-6 h-6" />,
  },
];

export function AppSidebar() {
  const router = useRouter();
  const { isAuth, setToken } = useContext(AuthContext);
  const { setOpen } = useSidebar();

  return (
    <>
      <div className="">
        <FreshtrackTrigger className="absolute m-3" />

        <Sidebar variant="sidebar">
          <SidebarContent>
            <div className="mt-3 h-8 flex items-center pl-14 font-semibold tracking-wider text-green-500 text-xl">
              <h2>FreshTrack</h2>
            </div>

            <SidebarGroup>
              {/* <SidebarGroupLabel>Projects</SidebarGroupLabel> */}
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton>
                        <a
                          href={item.url}
                          className="flex gap-2 items-center text-lg"
                        >
                          {item.icon}
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}

                  {!isAuth ? (
                    <>
                      <SidebarMenuItem className="mt-4">
                        <Button className="w-full" onClick={()=>{
                          router.push('/login');
                          setOpen(false);
                        }}>Log In</Button>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                      <Button className="w-full" onClick={()=>{
                          router.push('/register');
                          setOpen(false);
                        }}>Register</Button>
                      </SidebarMenuItem>
                    </>
                  ) : (
                    <SidebarMenuItem>
                      <Button className="w-full" onClick={async ()=>{
                        localStorage.removeItem('freshtrack_token');
                        setToken("");
                        const resp = await AuthAPI.logout();
                      }}>Logout</Button>
                    </SidebarMenuItem>
                  )}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      </div>
    </>
  );
}
