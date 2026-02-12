"use client";

import Footer from "@/components/dashboard/main/Footer";
import Sidebar from "@/components/layout/Sidebar";
import SidebarProvider from "@/components/layout/SidebarContext";
import Topbar from "@/components/layout/Topbar";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/components/layout/SidebarContext";

function DashboardLayoutInner({
  children,
  isHome,
}: {
  children: React.ReactNode;
  isHome: boolean;
}) {
  const { collapsed, toggle } = useSidebar();

  return (
    <div
      className={`relative flex h-screen ${isHome ? "bg-white" : "bg-gray-100"}`}
    >
      <Sidebar />

      {/* Mobile backdrop */}
      {!collapsed && (
        <div
          onClick={toggle}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      <div
        id="dashboard-scroll"
        className="flex-1 flex flex-col overflow-y-auto relative z-10 will-change-transform"
        style={{ transform: 'translateZ(0)' }}
      >
        <Topbar variant="contained" />
        <main className="flex-1 py-1 px-2">{children}</main>
        <footer className="px-6">
          <Footer />
        </footer>
      </div>
    </div>
  );
}

import { CalendarProvider } from "@/components/dashboard/settings/calendar/CalendarContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHome = pathname === "/dashboard";

  return (
    <SidebarProvider>
      <CalendarProvider>
        <DashboardLayoutInner isHome={isHome}>{children}</DashboardLayoutInner>
      </CalendarProvider>
    </SidebarProvider>
  );
}
