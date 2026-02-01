"use client";

import DynamicBreadcrumb from "@/components/dashboard/DynamicBreadcrumb";
import SettingsSidebar from "@/components/dashboard/settings/SettingsSidebar";
import PageHeader from "@/components/dashboard/PageHeader";
import { settingsMenuItems } from "@/components/dashboard/settings/data";
import TeacherMappingForm from "@/components/dashboard/settings/teacher-mapping/TeacherMappingForm";

export default function CreateTeacherMapping() {
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
            <div className="flex items-center justify-between mb-6">
               <PageHeader
                title="Subject Teacher Mapping"
                subtitle="Assign teachers to each subject for the selected class and section."
              />
              <a
                href="/dashboard/settings/teacher-mapping"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-primary text-primary hover:bg-primary/10 h-10 px-4 py-2"
              >
                List
              </a>
            </div>

            <TeacherMappingForm />
          </div>
        </div>
      </div>
    </div>
  );
}
