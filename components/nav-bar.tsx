"use client";

import React, { useState } from "react";
import { ChevronDown, Menu, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export function NavBar({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen={false}>
      <div className="flex h-screen flex-col w-full">
        <header className="flex h-14 items-center justify-between border-b bg-background px-auto">
          <div className="flex items-center gap-2 ">
            <SidebarTrigger className={"z-50"}>
              <Menu className="h-5 w-5" />
            </SidebarTrigger>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Plus className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-9">
                  GPT 4o mini
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className={"z-50"}>
                <DropdownMenuItem>GPT 4</DropdownMenuItem>
                <DropdownMenuItem>GPT 3.5</DropdownMenuItem>
                <DropdownMenuItem>Claude 2</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="h-9">
              GPT DEMO
            </Button>
            <Button className="h-9">Login</Button>
          </div>
        </header>
        <div className="relative flex flex-1 overflow-hidden">
          <Sidebar>
            <SidebarHeader className="flex h-14 items-center border-b px-4 font-bold">
              GPT DEMO
            </SidebarHeader>
            <SidebarContent>
              <div className="p-4">
                <h3>Your chart save will be here</h3>
              </div>
            </SidebarContent>
          </Sidebar>
          <SidebarInset className="flex-1">
            <main className="h-full overflow-auto p-4">{children}</main>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}
