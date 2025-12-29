"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Building2, ChevronDown, LogOut, UserCog } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { Badge } from "../ui/badge";

export default function Profile() {
  const { currentUserRole, setCurrentUserRole } = useAppStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 h-9 px-2 hover:bg-accent"
        >
          <Avatar className="size-8">
            <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
              {currentUserRole === "admin" ? "A" : "C"}
            </AvatarFallback>
          </Avatar>
          <span className="text-[14px] font-medium inline-flex items-center gap-1">
            {currentUserRole === "admin" ? "Admin" : "Campus Admin"}
            <ChevronDown className="size-3 mt-1 text-muted-foreground" />
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 mt-5">
        <div className="px-2 py-1.5 text-sm font-medium text-muted-foreground">
          Switch Role
        </div>
        <DropdownMenuItem onClick={() => setCurrentUserRole("admin")}>
          <UserCog className="mr-2 h-4 w-4" />
          Main Admin
          {currentUserRole === "admin" && (
            <Badge variant="secondary" className="ml-auto text-xs">
              Active
            </Badge>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setCurrentUserRole("campus_admin")}>
          <Building2 className="mr-2 h-4 w-4" />
          Campus Admin
          {currentUserRole === "campus_admin" && (
            <Badge variant="secondary" className="ml-auto text-xs">
              Active
            </Badge>
          )}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive focus:text-destructive">
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
