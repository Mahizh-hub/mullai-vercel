import { Field } from "@/components/dashboard/form/Field";
import { Button } from "@/components/ui/button";
import { useFormContext } from "react-hook-form";
import { StudentFormValues } from "../CreateStudentForm";

export default function ContactStep({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const { register } = useFormContext<StudentFormValues>();

  return (
    <section className="space-y-6">
      <h4 className="font-semibold">Contact Information</h4>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field label="Door Number" required {...register("address.door")} />
        <Field label="Address Line 1" {...register("address.line1")} />

        <Field label="Address Line 2" required {...register("address.line2")} />
        <Field label="Landmark" {...register("address.landmark")} />

        <Field label="City" required {...register("address.city")} />
        <Field label="State" {...register("address.state")} />

        <Field label="PIN Code" required {...register("address.pin")} />
        <Field label="Country" {...register("address.country")} />

        <Field
          label="Email"
          type="email"
          required
          {...register("address.email")}
        />
      </div>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="ghost" onClick={onBack}>
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
