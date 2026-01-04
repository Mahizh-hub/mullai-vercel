import { useFormContext, Controller } from "react-hook-form";
import { StudentFormValues } from "../CreateStudentForm";
import { Field } from "@/components/dashboard/form/Field";
import { FileUploadField } from "@/components/dashboard/form/FileUploadField";
import { Button } from "@/components/ui/button";

export default function PersonalStep({ onNext }: { onNext: () => void }) {
  const { register, watch, setValue, control } =
    useFormContext<StudentFormValues>();

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
        {/* Branch – SELECT */}
        <Controller
          name="branch"
          control={control}
          render={({ field }) => (
            <Field
              label="Branch"
              as="select"
              required
              placeholder="Select"
              value={field.value}
              onValueChange={field.onChange}
              options={[
                { label: "Branch 1", value: "Branch 1" },
                { label: "Branch 2", value: "Branch 2" },
                { label: "Branch 3", value: "Branch 3" },
              ]}
            />
          )}
        />

        {/* INPUTS – unchanged */}
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

        {/* Gender – SELECT */}
        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <Field
              label="Gender"
              as="select"
              required
              placeholder="Select"
              value={field.value}
              onValueChange={field.onChange}
              options={[
                { label: "Male", value: "Male" },
                { label: "Female", value: "Female" },
              ]}
            />
          )}
        />

        {/* Blood Group – SELECT */}
        <Controller
          name="bloodGroup"
          control={control}
          render={({ field }) => (
            <Field
              label="Blood Group"
              as="select"
              required
              placeholder="Select"
              value={field.value}
              onValueChange={field.onChange}
              options={[
                { label: "A+", value: "A+" },
                { label: "B+", value: "B+" },
                { label: "O+", value: "O+" },
              ]}
            />
          )}
        />

        {/* ID Proof – SELECT */}
        <Controller
          name="idProof"
          control={control}
          render={({ field }) => (
            <Field
              label="Identification Proof"
              as="select"
              required
              placeholder="Select"
              value={field.value}
              onValueChange={field.onChange}
              options={[
                { label: "Aadhaar", value: "Aadhaar" },
                { label: "PAN", value: "PAN" },
              ]}
            />
          )}
        />

        {/* INPUT – unchanged */}
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
