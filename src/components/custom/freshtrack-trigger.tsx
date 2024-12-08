"use client";

import { useSidebar } from "@/components/ui/sidebar";
import { Icons } from "../icons";
import { cn } from "@/lib/utils";

export function FreshtrackTrigger({ className }: { className?: string }) {
  const { toggleSidebar } = useSidebar();

  return (
    <div
      onClick={toggleSidebar}
      className={cn(
        "hover:cursor-pointer h-8 w-8 aspect-square z-20",
        className
      )}
    >
      <Icons.logo className="w-full h-full" />
    </div>
  );
}
