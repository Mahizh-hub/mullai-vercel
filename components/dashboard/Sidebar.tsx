"use client";

import Image from "next/image";
import SidebarItem from "./SidebarItem";
import { useAppStore } from "@/lib/store";
import { TooltipProvider } from "../ui/tooltip";
import { useSidebar } from "./SidebarContext";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import {
  AdminManagementIcon,
  AdmissionsIcon,
  CampusIcon,
  DashboardIcon,
  ExamsIcon,
  FeesIcon,
  SettingsIcon,
  TeachersIcon,
  TimetablesIcon,
} from "../Icons";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard/",
    icon: DashboardIcon,
  },
  {
    name: "Campuses",
    href: "/dashboard/campuses",
    icon: CampusIcon,
    adminOnly: true,
  },
  {
    name: "Employee Management",
    href: "/dashboard/employee-management",
    icon: AdminManagementIcon,
    adminOnly: true,
  },
  {
    name: "Students",
    href: "/dashboard/students",
    icon: TeachersIcon, // reuse or add StudentsIcon
  },
  {
    name: "Timetables",
    href: "/dashboard/timetables",
    icon: TimetablesIcon,
  },
  {
    name: "Exams",
    href: "/dashboard/exams",
    icon: ExamsIcon,
  },
  {
    name: "Admissions",
    href: "/dashboard/admissions",
    icon: AdmissionsIcon,
  },
  {
    name: "Fees",
    href: "/dashboard/fees",
    icon: FeesIcon,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: SettingsIcon,
  },
];

export default function Sidebar() {
  const { currentUserRole } = useAppStore();
  const { collapsed } = useSidebar();
  const pathname = usePathname();

  const isHome = pathname === "/dashboard";

  const filteredNavigation = navigation.filter(
    (item) => !item.adminOnly || currentUserRole === "admin",
  );

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50",
          "bg-white flex flex-col border-r border-gray-100",
          "transition-all duration-300 ease-in-out",
          "will-change-[width,transform]",
          "h-full",
          collapsed ? "lg:w-20.5 w-0" : "lg:w-66 w-66",
          !collapsed && "max-lg:shadow-xl",
          // Mobile handling: translate off-screen when collapsed on mobile
          collapsed ? "max-lg:-translate-x-full" : "max-lg:translate-x-0",
          isHome ? "" : "drop-shadow-sm",
        )}
        style={{ transform: "translateZ(0)" }}
      >
        <div className="h-24 flex border-b border-gray-200 items-center px-6 relative overflow-hidden shrink-0">
          {/* Logo Container for transitions */}
          <div className="relative w-full h-10 flex items-center">
            {/* Icon Logo (Visible when collapsed) */}
            <div
              className={cn(
                "absolute inset-0 flex items-center justify-center transition-all duration-300",
                collapsed
                  ? "opacity-100 visible translate-x-0"
                  : "opacity-0 invisible -translate-x-4",
              )}
            >
              <Image
                src="/logo-icon.png"
                alt="Mullai Logo"
                width={40}
                height={40}
                className="object-contain"
                priority
              />
            </div>

            {/* Full Logo (Visible when expanded) */}
            <div
              className={cn(
                "absolute inset-0 flex items-center transition-all duration-300",
                !collapsed
                  ? "opacity-100 visible translate-x-0"
                  : "opacity-0 invisible translate-x-4",
              )}
            >
              <Image
                src="/logo-mullai.png"
                alt="Mullai Full Logo"
                width={170}
                height={40}
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-3 text-sm text-gray-600 overflow-y-auto overflow-x-hidden scrollbar-none">
          <div
            className={cn(
              "overflow-hidden transition-all duration-300 ease-in-out",
              collapsed ? "h-0 opacity-0 mb-0" : "h-5 opacity-100 mb-0",
            )}
          >
            <p className="hidden lg:block uppercase text-xs font-medium text-gray-400 px-1 whitespace-nowrap">
              Menus
            </p>
          </div>

          <div className="flex mt-2 flex-col gap-1">
            {filteredNavigation.map((item) => (
              <SidebarItem
                key={item.name}
                label={item.name}
                href={item.href}
                icon={item.icon}
                collapsed={collapsed}
              />
            ))}
          </div>
        </nav>
      </aside>
    </TooltipProvider>
  );
}
