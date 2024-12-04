'use client';

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
  SidebarMenuItem,
  SidebarMenuSubItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { Icons } from "../icons";

const items = [
  {
    title: "Home",
    url: "#",
    icon: <Icons.logo/>,
  },
  {
    title: "Inbox",
    url: "#",
    icon: <Icons.Inbox/>,
  },
  // {
  //   title: "Calendar",
  //   url: "#",
  //   icon: Icons.Calendar,
  // },
  // {
  //   title: "Search",
  //   url: "#",
  //   icon: Icons.Search,
  // },
  // {
  //   title: "Settings",
  //   url: "#",
  //   icon: Icons.Settings,
  // },
];

export function AppSidebar() {
  return (
    <div className="flex flex-row">
      <Sidebar collapsible="icon">
        <SidebarContent>
          <SidebarGroup>

            <SidebarGroupLabel>Application</SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuSubItem>
                      <a href={item.url} >
                        {/* <item.icon/> */}
                        {item.icon}
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuSubItem>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarTrigger />
    </div>
  );
}
