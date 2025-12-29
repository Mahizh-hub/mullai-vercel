"use client";

import Footer from "@/components/dashboard/main/Footer";
import Sidebar from "@/components/dashboard/Sidebar";
import SidebarProvider from "@/components/dashboard/SidebarContext";
import Topbar from "@/components/dashboard/Topbar";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHome = pathname === "/dashboard";

  return (
    <SidebarProvider>
      <div className={`flex h-screen ${isHome ? "bg-white" : "bg-gray-100"}`}>
        <Sidebar />

        <div
          id="dashboard-scroll"
          className="flex-1 flex flex-col overflow-y-auto"
        >
          <Topbar variant="contained" />
          <main className="flex-1 py-1 px-2">{children}</main>
          <footer className="px-6">
            <Footer />
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
}
