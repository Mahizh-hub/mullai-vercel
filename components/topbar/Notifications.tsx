"use client";

import {
  LucideIcon,
  MessageSquareMore,
  MessageSquareDot,
  User,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { NotificationIcon } from "@/components/Icons";

type Notification = {
  id: string;
  icon: LucideIcon;
  color: string;
  message: React.ReactNode;
  time: string;
  link: string;
  isNew?: boolean;
};

const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    icon: MessageSquareMore,
    color: "text-indigo-600",
    message: (
      <>
        You have requested a{" "}
        <strong className="font-semibold">withdrawal</strong>
      </>
    ),
    time: "2 hrs ago",
    link: "/",
  },
  {
    id: "2",
    icon: User,
    color: "text-sky-500",
    message: (
      <>
        <strong className="font-semibold">A new user</strong> was added
      </>
    ),
    time: "3 hrs ago",
    link: "/",
    isNew: true,
  },
  {
    id: "3",
    icon: MessageSquareDot,
    color: "text-emerald-500",
    message: (
      <>
        You have requested a{" "}
        <strong className="font-semibold">withdrawal</strong>
      </>
    ),
    time: "1 day ago",
    link: "/",
  },
];

export default function Notifications() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const clearAll = () => setNotifications([]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        onClick={() => setOpen((prev) => !prev)}
        className="relative text-gray-600 hover:text-gray-800 transition"
      >
        <NotificationIcon />
        {notifications.some((n) => n.isNew) && (
          <span className="absolute top-0.75 right-1.5 size-1.5 bg-pink-600 rounded-full" />
        )}
      </Button>

      {open && (
        <div
          className="fixed sm:absolute z-50
              inset-x-0 top-20 sm:top-auto
              sm:right-0 right-0 sm:left-auto sm:inset-x-auto
              mt-0 border sm:mt-6
              w-full sm:w-96
              rounded-2xl sm:rounded-xl
              bg-white shadow-lg"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-4 border-dashed border-b border-gray-200">
            <h4 className="font-semibold text-sm text-gray-600">
              Notifications{" "}
              <span className="text-gray-500 text-sm font-normal">
                ({notifications.length})
              </span>
            </h4>
            {notifications.length > 0 && (
              <button
                onClick={clearAll}
                className="text-sm cursor-pointer text-gray-500 hover:text-gray-700"
              >
                Clear all
              </button>
            )}
          </div>

          {/* List */}
          <ul className="max-h-96 overflow-y-auto">
            {notifications.map(
              ({ id, icon: Icon, color, message, time, link, isNew }) => (
                <li key={id}>
                  <Link
                    href={link}
                    className="relative flex gap-4 px-4 transition-colors hover:bg-gray-50 py-4 border-b border-gray-100 last:border-none"
                  >
                    <div
                      className={`w-10 h-10 flex items-center justify-center rounded-full bg-pink-50 ${color}`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="flex-1">
                      <p className="text-sm text-gray-700">{message}</p>

                      <p className="text-xs text-gray-500 mt-1">{time}</p>
                    </div>

                    {isNew && (
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 size-1.5 bg-pink-600 rounded-full" />
                    )}
                  </Link>
                </li>
              ),
            )}

            {notifications.length === 0 && (
              <li className="py-8 text-center text-sm text-gray-500">
                No notifications
              </li>
            )}
          </ul>

          {/* Footer */}
          <Link href="/notifications">
            <div className="py-3 border-t border-dashed border-gray-200 text-center hover:bg-gray-50">
              <p className="text-sm font-medium text-gray-600 hover:text-gray-500 transition-colors">
                See all notifications
              </p>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}
