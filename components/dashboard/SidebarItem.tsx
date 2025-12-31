"use client";

import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { ComponentType, SVGProps } from "react";

interface Props {
  label: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  collapsed?: boolean;
}

export default function SidebarItem({
  label,
  href,
  icon: Icon,
  collapsed = false,
}: Props) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  const content = (
    <Link
      href={href}
      className={cn(
        "group flex items-center gap-2 rounded-md px-3 py-3 text-sm font-medium transition-colors",
        "focus:outline-none focus:ring-2 focus:ring-pink-500",
        isActive
          ? "bg-pink-500 text-white"
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
      )}
    >
      <Icon
        className={cn(
          "size-6 shrink-0 transition-colors",
          isActive ? "text-white" : "text-gray-600 group-hover:text-gray-900",
        )}
      />
      {!collapsed && label}
    </Link>
  );

  if (!collapsed) return content;

  return (
    <Tooltip>
      <TooltipTrigger asChild>{content}</TooltipTrigger>
      <TooltipContent className="bg-white text-gray-800" side="right">
        {label}
      </TooltipContent>
    </Tooltip>
  );
}
