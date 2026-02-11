import { useFormContext, Controller } from "react-hook-form";
import { Field } from "@/components/dashboard/form/Field";
import { FileUploadField } from "@/components/dashboard/form/FileUploadField";
import { Button } from "@/components/ui/button";
import { BLOOD_GROUPS, ID_PROOF_TYPES } from "@/constants/locations";
import { AdmissionFormValues } from "../CreateAdmissionForm";

export default function PersonalStep({ onNext }: { onNext: () => void }) {
  const { register, watch, setValue, control } =
    useFormContext<AdmissionFormValues>();

  const photo = watch("photo");

  return (
    <section className="space-y-6">
      <div>
        <h4 className="font-semibold">Personal Information</h4>
        <p className="text-sm text-muted-foreground">
          Enter student's basic personal details for identification and records.
        </p>
      </div>

      <div className="space-y-4">
        {/* Campus - Full Width */}
        <Controller
          name="branch"
          control={control}
          render={({ field }) => (
            <Field
              label="Campus"
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
        
        {/* Class, Section, Group, Language Group - 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Controller
            name="class"
            control={control}
            render={({ field }) => (
              <Field
                label="Class"
                as="select"
                required
                placeholder="Select class"
                value={field.value}
                onValueChange={field.onChange}
                options={[
                  { label: "1", value: "1" },
                  { label: "2", value: "2" },
                  { label: "3", value: "3" },
                  { label: "4", value: "4" },
                  { label: "5", value: "5" },
                  { label: "6", value: "6" },
                  { label: "7", value: "7" },
                  { label: "8", value: "8" },
                  { label: "9", value: "9" },
                  { label: "10", value: "10" },
                  { label: "11", value: "11" },
                  { label: "12", value: "12" },
                ]}
              />
            )}
          />

          <Controller
            name="section"
            control={control}
            render={({ field }) => (
              <Field
                label="Section"
                as="select"
                required
                placeholder="Select section"
                value={field.value}
                onValueChange={field.onChange}
                options={[
                  { label: "A", value: "A" },
                  { label: "B", value: "B" },
                  { label: "C", value: "C" },
                  { label: "D", value: "D" },
                ]}
              />
            )}
          />
        
        <Controller
            name="admissionType"
            control={control}
            render={({ field }) => (
              <Field
                label="Admission Type"
                as="select"
                required
                placeholder="Select type"
                value={field.value}
                onValueChange={field.onChange}
                options={[
                  { label: "Enrolled", value: "enrolled" },
                  { label: "Enquiry", value: "enquiry" },
                ]}
              />
            )}
          />
            
        <Controller
            name="admissionYear"
            control={control}
            render={({ field }) => {
              const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                // Get only digits from input
                const digits = e.target.value.replace(/\D/g, '');
                
                // Format as yyyy - yyyy
                let formatted = '';
                if (digits.length > 0) {
                  // First year (first 4 digits)
                  formatted = digits.substring(0, 4);
                  
                  // Add separator and second year if we have more than 4 digits
                  if (digits.length > 4) {
                    formatted += ' - ' + digits.substring(4, 8);
                  }
                }
                
                field.onChange(formatted);
              };
              
              return (
                <div className="space-y-3">
                  <label className="text-gray-700">
                    Admission Year <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="yyyy - yyyy"
                    value={field.value || ''}
                    onChange={handleChange}
                    className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-12 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-pink-600 focus-visible:ring-0 aria-invalid:border-destructive aria-invalid:ring-0"
                  />
                </div>
              );
            }}
          />
        </div>

        {/* First Name, Last Name - 2 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="First Name" placeholder="Enter first name" required {...register("firstName")} />
          <Field label="Last Name" placeholder="Enter last name" required {...register("lastName")} />
        </div>

        {/* Roll Number, Join Date - 2 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Roll Number" placeholder="Enter roll number" required {...register("rollNumber")} />
          <Field
            label="Join Date"
            type="date"
            required
            {...register("joinDate")}
          />
        </div>


        {/* Date of Birth, Gender, Blood Group - 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Controller
            name="group"
            control={control}
            render={({ field }) => (
              <Field
                label="Group"
                as="select"
                placeholder="Select group"
                value={field.value}
                onValueChange={field.onChange}
                options={[
                  { label: "Science", value: "Science" },
                  { label: "Commerce", value: "Commerce" },
                  { label: "Arts", value: "Arts" },
                ]}
              />
            )}
          />

          <Controller
            name="languageGroup"
            control={control}
            render={({ field }) => (
              <Field
                label="Language Group"
                as="select"
                placeholder="Select language"
                value={field.value}
                onValueChange={field.onChange}
                options={[
                  { label: "Tamil", value: "Tamil" },
                  { label: "Hindi", value: "Hindi" },
                  { label: "Sanskrit", value: "Sanskrit" },
                  { label: "French", value: "French" },
                ]}
              />
            )}
          />
          <Field
            label="Date of Birth"
            type="date"
            required
            {...register("dob")}
          />

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
                options={BLOOD_GROUPS}
              />
            )}
          />
        </div>

        {/* ID Proof, ID Reference Number - 2 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                options={ID_PROOF_TYPES}
              />
            )}
          />

          <Field
            label="Identification Reference Number"
            placeholder="Enter reference number"
            required
            {...register("tdRefNumber")}
          />
        </div>
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
