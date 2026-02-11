import FeeForm from "@/components/dashboard/fees/FeeForm";
import DynamicBreadcrumb from "@/components/layout/DynamicBreadcrumb";

export default function CreateFeePage() {
  return (
    <div className="space-y-4 p-4">
      {/* Header + Breadcrumb */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-xl font-semibold">Fees</h3>
        <DynamicBreadcrumb />
      </div>

      {/* Card */}
      <div className="rounded-lg bg-white">
        <div className="border-b border-gray-50 p-6">
          <h3 className="text-lg font-semibold">Add Fees Entry</h3>
          <p className="text-sm text-muted-foreground">
            Record a fee payment entry for a student.
          </p>
        </div>

        <FeeForm />
      </div>
    </div>
  );
}
