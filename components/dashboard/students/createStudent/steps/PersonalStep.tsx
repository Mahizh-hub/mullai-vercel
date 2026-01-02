import { useFormContext } from "react-hook-form";
import { StudentFormValues } from "../CreateStudentForm";
import { Field } from "@/components/dashboard/form/Field";
import { FileUploadField } from "@/components/dashboard/form/FileUploadField";
import { Button } from "@/components/ui/button";

export default function PersonalStep({ onNext }: { onNext: () => void }) {
  const { register, watch, setValue } = useFormContext<StudentFormValues>();

  const photo = watch("photo");

  return (
    <section className="space-y-6">
      <div>
        <h4 className="font-semibold">Personal Information</h4>
        <p className="text-sm text-muted-foreground">
          Enter student academic and personal details
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field label="Branch" required as="select" {...register("branch")}>
          <option>Branch 1</option>
          <option>Branch 2</option>
          <option>Branch 3</option>
        </Field>
        <Field label="Roll Number" required {...register("rollNumber")} />

        <Field label="First Name" required {...register("firstName")} />
        <Field label="Last Name" required {...register("lastName")} />

        <Field
          label="Join Date"
          type="date"
          required
          {...register("joinDate")}
        />
        <Field label="Class" required {...register("class")} />

        <Field label="Section" required {...register("section")} />
        <Field label="Group" {...register("group")} />

        <Field label="Language Group" {...register("languageGroup")} />
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
          label="ID Reference Number"
          required
          {...register("tdRefNumber")}
        />
      </div>

      <FileUploadField
        label="Upload photo in JPG, JPEG or PNG format"
        helperText="Please upload your image with a size of 135 x 135"
        value={photo}
        onChange={(file) => setValue("photo", file, { shouldValidate: true })}
      />

      <div className="flex justify-end">
        <Button type="button" onClick={onNext}>
          Next
        </Button>
      </div>
    </section>
  );
}
