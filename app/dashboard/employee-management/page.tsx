import DynamicBreadcrumb from "@/components/dashboard/DynamicBreadcrumb";
import AllEmployee from "@/components/dashboard/employee/AllEmployee";

export default function AdminManagement() {
  return (
    <div className="space-y-6 p-5 md:p-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="text-xl font-bold">Employee Management</div>
        <DynamicBreadcrumb />
      </div>

      <AllEmployee />
    </div>
  );
}
