import AllFees from "@/components/dashboard/fees/AllFees";
import DynamicBreadcrumb from "@/components/layout/DynamicBreadcrumb";

export default function FeesPage() {
  return (
    <div className="space-y-4 p-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h5 className="text-xl font-bold">Fees</h5>
        <DynamicBreadcrumb />
      </div>

      <AllFees />
    </div>
  );
}
