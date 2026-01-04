import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { EmployeeFormValues } from "@/lib/validations/employee.schema";
import { Field } from "@/components/dashboard/form/Field";

export default function ContactStep({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const { register, control } = useFormContext<EmployeeFormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "emergencyContacts",
  });

  return (
    <section className="space-y-6">
      <div>
        <h4 className="font-semibold">Contact Information</h4>
        <p className="text-sm text-muted-foreground">
          Enter the employee&apos;s contact details
        </p>
      </div>

      {/* Address */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field
          placeholder="e.g, No.12/38"
          label="Door Number"
          required
          {...register("address.door")}
        />
        <Field
          placeholder="Street name"
          label="Address Line 1"
          {...register("address.line1")}
        />
        <Field
          placeholder="Area / Locality"
          label="Address Line 2"
          required
          {...register("address.line2")}
        />
        <Field
          placeholder="Nearby landmark (optional)"
          label="Landmark"
          {...register("address.landmark")}
        />
        <Field
          placeholder="City"
          label="City"
          required
          {...register("address.city")}
        />
        <Field
          placeholder="State"
          label="State / Province"
          {...register("address.state")}
        />
        <Field
          placeholder="Enter PIN code"
          label="PIN Code"
          required
          {...register("address.pin")}
        />
        <Field
          placeholder="India"
          label="Country"
          {...register("address.country")}
        />
      </div>

      {/* Emergency Contacts */}
      <div className="space-y-4 max-w-6xl">
        <h5 className="font-semibold">Emergency Contact</h5>

        {fields.map((field, index) => (
          <div
            key={field.id}
            className="grid grid-cols-1 md:grid-cols-[1.2fr_1.2fr_1.5fr_auto] gap-3 items-end"
          >
            <Field
              label="Person name"
              required
              placeholder="Enter person name"
              {...register(`emergencyContacts.${index}.name`)}
            />

            <Field
              label="Relation name"
              required
              placeholder="Enter relation name"
              {...register(`emergencyContacts.${index}.relation`)}
            />

            <Field
              label="Phone number"
              required
              placeholder="Enter phone number"
              {...register(`emergencyContacts.${index}.phone`)}
            />

            <div className="flex pb-1">
              {index === 0 ? (
                <Button
                  type="button"
                  className="bg-pink-500 text-white"
                  onClick={() => append({ name: "", relation: "", phone: "" })}
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
        <Button
          type="button"
          variant="outline"
          className="border-red-600 text-red-600 hover:text-red-700"
          onClick={onBack}
        >
          Back
        </Button>
        <Button
          type="button"
          onClick={onNext}
          className="bg-pink-500 text-white"
        >
          Next
        </Button>
      </div>
    </section>
  );
}
