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
          collapsed ? "lg:w-20.5 w-0 overflow-hidden" : "lg:w-66 w-66",
          collapsed ? "max-lg:-translate-x-full" : "max-lg:translate-x-0",
          !collapsed && "max-lg:shadow-xl",
          isHome ? "" : "drop-shadow-sm",
        )}
        style={{ transform: 'translateZ(0)' }}
      >
        <div className="h-24 flex border-b border-gray-200 items-center py-3 px-6 ">
          {collapsed ? (
            <div className="flex items-center justify-center">
              <Image
                src="/logo-icon.png"
                alt="Mullai Logo"
                width={40}
                height={40}
                className="object-contain"
                priority
              />
            </div>
          ) : (
            <Image
              src="/logo-mullai.png"
              alt="Mullai Full Logo"
              width={170}
              height={40}
              className="object-contain"
              priority
            />
          )}
        </div>

        <nav className="flex-1 px-4 py-4 space-y-3 text-sm text-gray-600">
          {!collapsed && (
            <p className="hidden lg:block uppercase text-xs font-medium text-gray-400 px-1">
              Menus
            </p>
          )}

          {collapsed ? (
            <div className="flex flex-col gap-1">
              {filteredNavigation.map((item) => (
                <SidebarItem
                  key={`${item.name}-collapsed`}
                  label={item.name}
                  href={item.href}
                  icon={item.icon}
                  collapsed
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              {filteredNavigation.map((item) => (
                <SidebarItem
                  key={item.name}
                  label={item.name}
                  href={item.href}
                  icon={item.icon}
                  collapsed={false}
                />
              ))}
            </div>
          )}
        </nav>
      </aside>
    </TooltipProvider>
  );
}
