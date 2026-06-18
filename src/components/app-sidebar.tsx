"use client";

import * as React from "react";

import { NavMain } from "@/components/nav-main";
// import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Users,
  ListPlus,
  UserRound,
  SquareActivity,
} from "lucide-react";

const data = {
  user: {
    name: "Joaquin",
    email: "example@gmail.com",
    avatar: "",
  },
  navMain: [
    {
      title: "Live Feed",
      url: "/dashboard/live-feed",
      icon: <SquareActivity />,
      isActive: true,
    },
    {
      title: "Analytics",
      url: "/dashboard/analytics",
      icon: <LayoutDashboard />,
    },
    {
      title: "Employees",
      url: "/dashboard/employees",
      icon: <Users />,
    },
  ],
  navSecondary: [{}, {}],
  projects: [{}, {}, {}],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <ListPlus className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">CLIFSA</span>
                  <span className="truncate text-xs">Attendance</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      {/*<SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>*/}
    </Sidebar>
  );
}
