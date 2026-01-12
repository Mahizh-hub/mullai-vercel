import { useFormContext, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { EmployeeFormValues } from "@/lib/validations/employee.schema";
import { Field } from "@/components/dashboard/form/Field";
import { INDIAN_CITIES, INDIAN_STATES, COUNTRIES } from "@/lib/constants/locations";

export default function ContactStep({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const { register, control } = useFormContext<EmployeeFormValues>();

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

        <Controller
          name="address.city"
          control={control}
          render={({ field }) => (
            <Field
              label="City"
              as="select"
              required
              placeholder="Select city"
              value={field.value}
              onValueChange={field.onChange}
              options={INDIAN_CITIES.map((city) => ({
                label: city,
                value: city,
              }))}
            />
          )}
        />

        <Controller
          name="address.state"
          control={control}
          render={({ field }) => (
            <Field
              label="State / Province"
              as="select"
              placeholder="Select state"
              value={field.value}
              onValueChange={field.onChange}
              options={INDIAN_STATES.map((state) => ({
                label: state,
                value: state,
              }))}
            />
          )}
        />

        <Field
          placeholder="Enter PIN code"
          label="PIN Code"
          required
          {...register("address.pin")}
        />

        <Controller
          name="address.country"
          control={control}
          render={({ field }) => (
            <Field
              label="Country"
              as="select"
              placeholder="Select country"
              value={field.value}
              onValueChange={field.onChange}
              options={COUNTRIES.map((country) => ({
                label: country,
                value: country,
              }))}
            />
          )}
        />
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
