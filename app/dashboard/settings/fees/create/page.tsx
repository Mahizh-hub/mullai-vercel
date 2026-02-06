"use client";

import DynamicBreadcrumb from "@/components/dashboard/DynamicBreadcrumb";
import SettingsSidebar from "@/components/dashboard/settings/SettingsSidebar";
import PageHeader from "@/components/dashboard/PageHeader";
import { settingsMenuItems } from "@/components/dashboard/settings/data";
import FeesSetupForm from "@/components/dashboard/settings/fees_setup/FeesSetupForm";

export default function CreateFeesSetup() {
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
              title="Create Fees Setup"
              subtitle="Add fee components and amounts for each term and calculate the total fee."
              actionHref="/dashboard/settings/fees"
              actionLabel="List"
              className="mb-6"
              icon="back"
            />
            <FeesSetupForm />
          </div>
        </div>
      </div>
    </div>
  );
}
