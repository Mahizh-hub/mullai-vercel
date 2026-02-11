import DynamicBreadcrumb from "@/components/layout/DynamicBreadcrumb";
import ExamsPage from "@/components/dashboard/exams/ExamsPage";

export default function Campuses() {
  return (
    <div className="space-y-4 p-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h5 className="text-xl font-bold">Exams</h5>
        <DynamicBreadcrumb />
      </div>

      <ExamsPage />
    </div>
  );
}
