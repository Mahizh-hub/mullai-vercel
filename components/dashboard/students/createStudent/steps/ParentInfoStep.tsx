import { Field } from "@/components/dashboard/form/Field";
import { Button } from "@/components/ui/button";
import { useFormContext } from "react-hook-form";
import { StudentFormValues } from "../CreateStudentForm";

const ParentBlock = ({
  title,
  path,
}: {
  title: string;
  path: "father" | "mother" | "guardian";
}) => {
  const { register } = useFormContext<StudentFormValues>();

  return (
    <div className="space-y-4">
      <h5 className="font-semibold">{title}</h5>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field
          label="Full Name"
          required
          {...register(`parents.${path}.name`)}
        />

        <div className="flex flex-col gap-2">
          <Field
            label="Phone Number"
            required
            {...register(`parents.${path}.phone`)}
          />

          <label className="flex items-center gap-2 text-sm mb-2">
            <input
              type="checkbox"
              {...register(`parents.${path}.allowAppAccess`)}
            />
            Allow access to parent app
          </label>
        </div>

        <Field
          label="Degree / Class"
          {...register(`parents.${path}.degreeOrClass`)}
        />
        <Field label="Course" {...register(`parents.${path}.course`)} />
        <Field
          label="School / University"
          {...register(`parents.${path}.institution`)}
        />
        <Field
          label="Passed Out Year"
          {...register(`parents.${path}.passedOutYear`)}
        />
        <Field label="Occupation" {...register(`parents.${path}.occupation`)} />
        <Field
          label="Annual Income"
          {...register(`parents.${path}.annualIncome`)}
        />
      </div>
    </div>
  );
};

export default function ParentsStep({ onBack }: { onBack: () => void }) {
  return (
    <section className="space-y-8">
      <ParentBlock title="Father's Information" path="father" />
      <ParentBlock title="Mother's Information" path="mother" />
      <ParentBlock title="Guardian Information" path="guardian" />

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
