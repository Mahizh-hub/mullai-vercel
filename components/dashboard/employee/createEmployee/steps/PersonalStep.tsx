import { Field } from "@/components/dashboard/form/Field";
import { FileUploadField } from "@/components/dashboard/form/FileUploadField";
import { Button } from "@/components/ui/button";
import { EmployeeFormValues } from "@/lib/validations/employee.schema";
import { useFormContext } from "react-hook-form";

export default function PersonalStep({ onNext }: { onNext: () => void }) {
  const { register } = useFormContext();
  const { watch, setValue } = useFormContext<EmployeeFormValues>();

  const photo = watch("photo");

  return (
    <section className="space-y-6">
      <div>
        <h4 className="font-semibold">Personal Information</h4>
        <p className="text-sm text-muted-foreground">
          Enter the employee&apos;s basic personal details to get started
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field
          label="First Name"
          placeholder="Enter first name"
          required
          {...register("firstName")}
        />
        <Field
          label="Last Name"
          placeholder="Enter last name"
          required
          {...register("lastName")}
        />

        <Field
          label="Date of Birth"
          type="date"
          required
          {...register("dob")}
        />

        <Field label="Gender" as="select" required {...register("gender")}>
          <option value="">Select</option>
          <option>Male</option>
          <option>Female</option>
        </Field>

        <Field
          label="Blood Group"
          as="select"
          required
          {...register("bloodGroup")}
        >
          <option value="">Select</option>
          <option>A+</option>
          <option>B+</option>
          <option>O+</option>
        </Field>

        <Field
          label="Identification Proof"
          as="select"
          required
          {...register("idProof")}
        >
          <option value="">Select</option>
          <option>Aadhaar</option>
          <option>PAN</option>
        </Field>

        <Field
          label="Identification Reference Number"
          placeholder="Enter reference number"
          required
          {...register("idNumber")}
        />
      </div>

      <FileUploadField
        label="Upload photo in JPG, JPEG or PNG format"
        helperText="Please upload your image with a size of 135 × 135"
        value={photo ?? undefined}
        onChange={(file) =>
          setValue("photo", file ?? undefined, { shouldValidate: true })
        }
      />

      <div className="flex mt-2 justify-end">
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
