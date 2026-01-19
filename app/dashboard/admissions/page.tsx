import AllAdmissions from "@/components/dashboard/admissions/AllAdmissions";
import DynamicBreadcrumb from "@/components/dashboard/DynamicBreadcrumb";

export default function Admissions() {
  return (
    <div className="space-y-6 p-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="text-xl font-bold">Admissions Management</div>
        <DynamicBreadcrumb />
      </div>

      <AllAdmissions />
    </div>
  );
}
