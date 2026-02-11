"use client";

import DynamicBreadcrumb from "@/components/layout/DynamicBreadcrumb";
import SettingsSidebar from "@/components/dashboard/settings/SettingsSidebar";
import { settingsMenuItems } from "@/components/dashboard/settings/data";
import AllClassSections from "@/components/dashboard/settings/class_sections_setup/AllClassSections";

export default function Settings() {
  return (
    <div className="space-y-4 p-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="text-xl font-bold">Settings</div>
        <DynamicBreadcrumb />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Sidebar */}
        <div className="md:col-span-3">
          <SettingsSidebar menuItems={settingsMenuItems} />
        </div>

        {/* Main Content */}
        <div className="md:col-span-9">
          <AllClassSections />
        </div>
      </div>
    </div>
  );
}
