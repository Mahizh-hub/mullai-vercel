"use client";

import { useEffect, useRef, useState } from "react";
import { Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useSidebar } from "./SidebarContext";
import Notifications from "../topbar/Notifications";
import Profile from "../topbar/Profile";
import Fullscreen from "../topbar/Fullscreen";

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
          variant === "contained" && "mx-6 rounded-b-lg px-6",
          variant === "full" && "w-full px-6",
        )}
      >
        <Button variant="ghost" size="icon-lg" onClick={toggle}>
          <svg
            height="40px"
            viewBox="0 -960 960 960"
            width="40px"
            className="size-6 fill-gray-500"
          >
            <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
          </svg>
        </Button>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex text-pink-600 border border-pink-200 bg-pink-50 text-sm rounded-md py-1 px-3 items-center gap-2.5">
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
