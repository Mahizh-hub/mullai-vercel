import DynamicBreadcrumb from "@/components/layout/DynamicBreadcrumb";
import CreateEmployeeForm from "@/components/dashboard/employee/createEmployee/CreateEmployeeForm";

export default function CreateEmployeePage() {
  return (
    <div className="space-y-6 p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-xl font-semibold">Employee Management</h3>
        <DynamicBreadcrumb />
      </div>

      <div className="rounded-lg bg-white">
        <div className="border-b text-center md:text-start border-gray-50 p-6">
          <h3 className="text-lg font-semibold">Create a new Employee</h3>
          <p className="text-sm text-muted-foreground">
            Enter the employee’s personal details to get started. You can add
            contact and role information in the next steps.
          </p>
        </div>

        <CreateEmployeeForm />
      </div>
    </div>
  );
}
