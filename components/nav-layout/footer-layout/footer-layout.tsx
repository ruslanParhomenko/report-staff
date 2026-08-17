"use client";

import { cn } from "@/lib/utils";

import LogOutButton from "@/components/buttons/logout-button";
import { useSession } from "next-auth/react";

export default function FooterBar() {
  const { data } = useSession();

  const userRole = data?.user?.role;

  if (!userRole) return null;
  return (
    <div
      className={cn(
        "bg-background sticky bottom-0 z-10 flex items-center gap-1 py-2 md:flex-row justify-between md:gap-2 px-4 w-full",
      )}
    >
      <LogOutButton />
      <span className="text-xs text-muted-foreground">{userRole}</span>
    </div>
  );
}
