import CreateAdmissionForm from "@/components/dashboard/admissions/createAdmission/CreateAdmissionForm";
import DynamicBreadcrumb from "@/components/dashboard/DynamicBreadcrumb";

export default function CreateAdmissionPage() {
  return (
    <div className="space-y-6 p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-xl font-semibold">Admissions Management</h3>
        <DynamicBreadcrumb />
      </div>

      <div className="rounded-lg bg-white">
        <div className="border-b text-center md:text-start border-gray-50 p-6">
          <h3 className="text-lg font-semibold">Admission - Create Student</h3>
          <p className="text-sm text-muted-foreground">
            Add a new student by entering the required details.
          </p>
        </div>

        <CreateAdmissionForm/>
      </div>
    </div>
  );
}
