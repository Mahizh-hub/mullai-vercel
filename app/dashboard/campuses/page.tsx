import AllCampus from "@/components/dashboard/campus/AllCampus";
import DynamicBreadcrumb from "@/components/dashboard/DynamicBreadcrumb";

export default function Campuses() {
  return (
    <div className="space-y-4 p-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h5 className="text-xl font-bold">School Campuses</h5>
        <DynamicBreadcrumb />
      </div>

      <AllCampus />
    </div>
  );
}
