import DynamicBreadcrumb from "@/components/dashboard/DynamicBreadcrumb";
import CreateStudentForm from "@/components/dashboard/students/createStudent/CreateStudentForm";

export default function CreateStudentPage() {
  return (
    <div className="space-y-6 p-5 md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-xl font-semibold">Student Management</h3>
        <DynamicBreadcrumb />
      </div>

      <div className="rounded-lg bg-white">
        <div className="border-b border-gray-50 p-6">
          <h3 className="text-lg font-semibold">Create a new Student</h3>
          <p className="text-sm text-muted-foreground">
            Enter the student’s personal details to get started. You can add
            contact and parent information in the next steps.
          </p>
        </div>

        <CreateStudentForm />
      </div>
    </div>
  );
}
