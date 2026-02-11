import { Field } from "@/components/dashboard/form/Field";
import { Button } from "@/components/ui/button";
import { useFormContext, Controller } from "react-hook-form";
import { AdmissionFormValues } from "../CreateAdmissionForm";
import { ANNUAL_INCOME_RANGES } from "@/constants/locations";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ParentBlock = ({
  title,
  path,
}: {
  title: string;
  path: "father" | "mother" | "guardian";
}) => {
  const { register, control } = useFormContext<AdmissionFormValues>();
  const [countryCode, setCountryCode] = useState("+91");

  return (
    <div className="space-y-4">
      <h5 className="font-semibold">{title}</h5>

      <div className="space-y-4">
        {/* Full Name, Phone Number with Country Code - 2 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field
            label="Full Name"
            placeholder="Enter full name"
            required
            {...register(`parents.${path}.name`)}
          />

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-gray-700">
                Phone Number <span className="text-red-500">*</span>
              </Label>
              <label className="flex-center-gap-2 text-sm">
                <input
                  type="checkbox"
                  {...register(`parents.${path}.allowAppAccess`)}
                />
                Allow access to parent app
              </label>
            </div>
            <div className="relative flex items-center">
              <Select value={countryCode} onValueChange={setCountryCode}>
                <SelectTrigger className="w-[120px] h-12 rounded-r-none border-r-0 bg-gray-50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="+91">IN +91</SelectItem>
                  <SelectItem value="+1">US +1</SelectItem>
                  <SelectItem value="+44">UK +44</SelectItem>
                  <SelectItem value="+971">AE +971</SelectItem>
                  <SelectItem value="+966">SA +966</SelectItem>
                </SelectContent>
              </Select>
              <Input
                type="tel"
                placeholder="Enter phone number"
                className="flex-1 rounded-l-none"
                {...register(`parents.${path}.phone`)}
              />
            </div>
          </div>
        </div>

        {/* Degree/Class, Course, School/University, Passout Year - 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Field
            label="Degree / Class"
            placeholder="e.g., B.Tech, 12th Grade"
            {...register(`parents.${path}.degreeOrClass`)}
          />
          <Field label="Course" placeholder="e.g., Computer Science" {...register(`parents.${path}.course`)} />
          <Field
            label="School / College / University"
            placeholder="School / College / University name"
            {...register(`parents.${path}.institution`)}
          />
          <Field
            label="Passout Year"
            placeholder="YYYY"
            {...register(`parents.${path}.passedOutYear`)}
          />
        </div>

        {/* Occupation, Annual Income - 2 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field
            label="Occupation"
            placeholder="Enter occupation"
            {...register(`parents.${path}.occupation`)}
          />
          <Controller
            name={`parents.${path}.annualIncome`}
            control={control}
            render={({ field }) => (
              <Field
                label="Annual Income"
                as="select"
                placeholder="Select income range"
                value={field.value}
                onValueChange={field.onChange}
                options={ANNUAL_INCOME_RANGES}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default function ParentsStep({ onBack }: { onBack: () => void }) {
  return (
    <section className="space-y-8">
      <div>
        <h4 className="font-semibold">Parent Information</h4>
        <p className="text-sm text-muted-foreground">
          Add parent or guardian details for emergency contact and communication purposes.
        </p>
      </div>

      <ParentBlock title="Father's Info" path="father" />
      <ParentBlock title="Mother's Info" path="mother" />
      <ParentBlock title="Guardian's Info" path="guardian" />

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          className="border-red-600 text-red-600 hover:text-red-700"
          onClick={onBack}
        >
          Back
        </Button>
        <Button type="submit" className="bg-pink-500 text-white">
          Submit
        </Button>
      </div>
    </section>
  );
}
