"use client";

import DynamicBreadcrumb from "@/components/dashboard/DynamicBreadcrumb";
import SettingsSidebar from "@/components/dashboard/settings/SettingsSidebar";
import PageHeader from "@/components/dashboard/PageHeader";
import { settingsMenuItems } from "@/components/dashboard/settings/data";

export default function TeacherMapping() {
  return (
    <div className="space-y-4 p-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="text-xl font-bold">Settings</div>
        <DynamicBreadcrumb />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-3">
          <SettingsSidebar menuItems={settingsMenuItems} />
        </div>

        {/* Main Content */}
        <div className="md:col-span-9">
          <div className="card-base">
            <PageHeader
              title="Teacher Mapping"
              subtitle="Assign teachers to subjects and classes"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
