"use client";

import { useEffect, useRef, useState } from "react";
import { Calendar, ChevronDown, School } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useSidebar } from "./SidebarContext";
import Notifications from "../topbar/Notifications";
import Fullscreen from "../topbar/Fullscreen";
import { MenuIcon } from "../Icons";
import dynamic from "next/dynamic";

const Profile = dynamic(() => import('../topbar/Profile'), { ssr: false });
const CampusSelect = dynamic(() => import('./main/CampusSelect'), { ssr: false });

export default function Topbar({
  variant = "contained",
}: {
  variant?: "full" | "contained";
}) {
  const { toggle } = useSidebar();
  const lastScroll = useRef(0);
  const [visible, setVisible] = useState(true);
  const [showShadow, setShowShadow] = useState(false);

  const todayLabel = `Today - ${new Date().toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })}`;

  useEffect(() => {
    const container = document.getElementById("dashboard-scroll");
    if (!container) return;

    const onScroll = () => {
      const curr = container.scrollTop;

      if (curr < lastScroll.current) setVisible(true);
      else if (curr > 80) setVisible(false);

      setShowShadow(curr > 10);

      lastScroll.current = curr;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (e.clientY < 80) setVisible(true);
    };

    container.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      container.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-transform duration-300",
        visible ? "translate-y-0" : "-translate-y-full",
        showShadow && "drop-shadow-md",
      )}
    >
      <div
        className={cn(
          "h-18 bg-white flex items-center justify-between",
          variant === "contained" && "mx-6 rounded-b-lg px-4",
          variant === "full" && "w-full px-4",
        )}
      >
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon-lg" onClick={toggle}>
            <MenuIcon className="size-6 fill-gray-600" />
          </Button>

          <CampusSelect />
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex text-wrap text-pink-600 border border-pink-200 bg-pink-50 text-sm rounded-md py-1 px-3 items-center gap-2.5">
            <Calendar className="size-4" />
            {todayLabel}
          </div>
          <Fullscreen />
          <Notifications />
          <Profile />
        </div>
      </div>
    </header>
  );
}
