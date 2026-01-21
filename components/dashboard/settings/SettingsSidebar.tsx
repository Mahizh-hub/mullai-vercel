"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { SettingsMenuItem } from "./types";
import {
  ClassSectionIcon,
  SubjectsSetupIcon,
  TeacherMapIcon,
  FeesIcon,
  CalenderIcon,
  ExamSetupIcon,
  IconProps,
} from "@/components/Icons";

type Props = {
  menuItems: SettingsMenuItem[];
};

type IconComponent = React.ComponentType<IconProps>;

// Icon mapping
const iconMap: Record<string, IconComponent> = {
  "ClassSectionIcon": ClassSectionIcon,
  "SubjectsSetupIcon": SubjectsSetupIcon,
  "TeacherMapIcon": TeacherMapIcon,
  "FeesIcon": FeesIcon,
  "CalenderIcon": CalenderIcon,
  "ExamSetupIcon": ExamSetupIcon,
};

export default function SettingsSidebar({ menuItems }: Props) {
  const pathname = usePathname();

  return (
    <div className="rounded-lg bg-white border border-gray-100">
      <div className="px-4 py-5">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = iconMap[item.icon] || ClassSectionIcon;
            
            // Find the most specific matching menu item
            // Check exact match first, then check if pathname starts with this href
            let isActive = pathname === item.href;
            
            // For sub-page matching, only if pathname starts with this href
            // AND there's no other menu item with a more specific match
            if (!isActive && pathname.startsWith(item.href + "/")) {
              // Check if any other menu item has a more specific match
              const hasMoreSpecificMatch = menuItems.some(
                (otherItem) =>
                  otherItem.href !== item.href &&
                  otherItem.href.startsWith(item.href) &&
                  pathname.startsWith(otherItem.href)
              );
              isActive = !hasMoreSpecificMatch;
            }

            return (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center text-sm font-medium gap-2 p-3.5 rounded-md transition-all",
                    isActive
                      ? "bg-pink-500 text-white"
                      : "text-gray-600 hover:bg-gray-50 hover:text-pink-500"
                  )}
                >
                  <Icon
                    className={cn(
                      "size-5",
                      isActive ? "text-white" : "text-gray-600"
                    )}
                  />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
