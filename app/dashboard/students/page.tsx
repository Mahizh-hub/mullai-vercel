import DynamicBreadcrumb from "@/components/dashboard/DynamicBreadcrumb";
import AllStudents from "@/components/dashboard/students/AllStudents";

export default function Students() {
  return (
    <div className="space-y-6 p-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="text-xl font-bold">Student Management</div>
        <DynamicBreadcrumb />
      </div>

      <AllStudents />
    </div>
  );
}
