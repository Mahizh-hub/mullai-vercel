import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { EmployeeFormValues } from "@/lib/validations/employee.schema";
import { Field } from "@/components/dashboard/form/Field";
import { Label } from "@/components/ui/label";

const ROLES = ["Owner", "Campus Admin", "Teacher", "Other Staff"] as const;

export default function EmployeeInfoStep({ onBack }: { onBack: () => void }) {
  const { register, control } = useFormContext<EmployeeFormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  });

  return (
    <section className="space-y-6">
      <h4 className="font-semibold">Employee Information</h4>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field
          label="Designation"
          placeholder="Enter designation"
          required
          {...register("designation")}
        />
        <Field
          label="Employee ID"
          placeholder="Enter employee ID"
          required
          {...register("employeeId")}
        />
        <Field
          label="Joining Date"
          type="date"
          required
          {...register("joiningDate")}
        />
        <Field label="Leaving Date" type="date" {...register("leavingDate")} />
      </div>

      {/* Roles */}
      <div className="space-y-2">
        <Label className="font-medium">Roles</Label>
        <div className="flex flex-wrap gap-4">
          {ROLES.map((role) => (
            <label key={role} className="flex items-center gap-2 text-sm">
              <input type="checkbox" value={role} {...register("roles")} />
              {role}
            </label>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="space-y-4 max-w-6xl">
        <h5 className="font-semibold">Education</h5>

        {fields.map((field, index) => (
          <div
            key={field.id}
            className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1.5fr_0.8fr_auto] gap-3 items-end"
          >
            <Field
              label="Degree"
              placeholder="Degree"
              {...register(`education.${index}.degree`)}
            />

            <Field
              label="Course"
              placeholder="Course"
              {...register(`education.${index}.course`)}
            />

            <Field
              label="Institution"
              placeholder="Institution"
              {...register(`education.${index}.institution`)}
            />

            <Field
              label="Year"
              placeholder="YYYY"
              {...register(`education.${index}.year`)}
            />

            <div className="flex pb-1">
              {index === 0 ? (
                <Button
                  type="button"
                  variant="outline"
                  className="text-white bg-pink-500 hover:bg-pink-600 hover:text-white transition-colors"
                  onClick={() =>
                    append({
                      degree: "",
                      course: "",
                      institution: "",
                      year: "",
                    })
                  }
                >
                  + Add
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => remove(index)}
                >
                  Delete
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="ghost" onClick={onBack}>
          Back
        </Button>
        <Button type="submit" className="bg-pink-500 text-white">
          Submit
        </Button>
      </div>
    </section>
  );
}
