import { Field } from "@/components/dashboard/form/Field";
import { Button } from "@/components/ui/button";
import { useFormContext, Controller } from "react-hook-form";
import { AdmissionFormValues } from "../CreateAdmissionForm";
import { INDIAN_CITIES, INDIAN_STATES, COUNTRIES } from "@/lib/constants/locations";

export default function ContactStep({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const { register, control } = useFormContext<AdmissionFormValues>();

  return (
    <section className="space-y-6">
      <div>
        <h4 className="font-semibold">Contact Information</h4>
        <p className="text-sm text-muted-foreground">
          Provide contact details to enable communication with the student and guardians.
        </p>
      </div>

      <div>
        <h5 className="font-semibold mb-4">Address</h5>
        <div className="space-y-4">
          {/* Door Number, Address Line 1 - 2 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Door Number" placeholder="e.g., No. 12/38" required {...register("address.door")} />
            <Field label="Address Line 1" placeholder="Street name" {...register("address.line1")} />
          </div>

          {/* Address Line 2, Landmark - 2 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Address Line 2" placeholder="Area / Locality" required {...register("address.line2")} />
            <Field label="Landmark" placeholder="Nearby landmark (optional)" {...register("address.landmark")} />
          </div>

          {/* City, State, PIN Code - 3 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Controller
              name="address.city"
              control={control}
              render={({ field }) => (
                <Field
                  label="City"
                  as="select"
                  required
                  placeholder="Select"
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
                  label="State / Province / Region"
                  as="select"
                  required
                  placeholder="Select"
                  value={field.value}
                  onValueChange={field.onChange}
                  options={INDIAN_STATES.map((state) => ({
                    label: state,
                    value: state,
                  }))}
                />
              )}
            />

            <Field label="ZIP / Postal / PIN Code" placeholder="Enter PIN code" required {...register("address.pin")} />
          </div>

          {/* Country, Email - 2 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Controller
              name="address.country"
              control={control}
              render={({ field }) => (
                <Field
                  label="Country"
                  as="select"
                  required
                  placeholder="Select"
                  value={field.value}
                  onValueChange={field.onChange}
                  options={COUNTRIES.map((country) => ({
                    label: country,
                    value: country,
                  }))}
                />
              )}
            />

            <Field
              label="Mail ID"
              type="email"
              placeholder="example@email.com"
              required
              {...register("address.email")}
            />
          </div>
        </div>
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
          className="bg-pink-500 text-white"
          onClick={onNext}
        >
          Next
        </Button>
      </div>
    </section>
  );
}
