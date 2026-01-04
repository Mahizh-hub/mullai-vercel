import CampusForm from "@/components/dashboard/campus/CampusForm";
import DynamicBreadcrumb from "@/components/dashboard/DynamicBreadcrumb";

export default function CreateCampusPage() {
  return (
    <div className="space-y-4 p-4">
      {/* Header + Breadcrumb */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-xl font-semibold">School Campuses</h3>
        <DynamicBreadcrumb />
      </div>

      {/* Card */}
      <div className="rounded-lg bg-white">
        <div className="border-b text-center md:text-start border-gray-50 p-6">
          <h3 className="text-lg font-semibold">Create a new Campus</h3>
          <p className="text-sm text-muted-foreground">
            View and manage all registered campuses, including their classes,
            staff, and student details.
          </p>
        </div>

        <CampusForm />
      </div>
    </div>
  );
}
