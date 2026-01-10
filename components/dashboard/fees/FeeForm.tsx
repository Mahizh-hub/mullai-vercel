"use client";

import { Button } from "@/components/ui/button";
import { Field } from "@/components/dashboard/form/Field";
import { useForm } from "react-hook-form";

type FeeFormValues = {
  rollNo: string;
  studentName: string;
  className: string;
  section: string;
  academicYear: string;
  paymentDate: string;
  paymentType: string;
  paymentMode: string;

  term1: string;
  term2: string;
  term3: string;
  books: string;
  transport: string;
  extra: string;
  others: string;
  subtotal: string;
  total: string;
};

export default function FeeForm() {
  const { register, handleSubmit } = useForm<FeeFormValues>();

  const onSubmit = (data: FeeFormValues) => {
    console.log("FEE CREATE PAYLOAD", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
      {/* Student Info */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Roll No" required {...register("rollNo")} />
        <Field label="Student Name" {...register("studentName")} />
        <Field label="Class" {...register("className")} />
        <Field label="Section" {...register("section")} />
        <Field label="Academic Year" {...register("academicYear")} />
        <Field
          label="Date of Payment"
          type="date"
          required
          {...register("paymentDate")}
        />
        <Field
          label="Payment Type"
          as="select"
          required
          options={[
            { label: "Full", value: "full" },
            { label: "Partial", value: "partial" },
          ]}
        />
        <Field
          label="Payment Mode"
          as="select"
          required
          options={[
            { label: "Cash", value: "cash" },
            { label: "Card", value: "card" },
            { label: "Net Banking", value: "netbanking" },
            { label: "UPI", value: "upi" },
          ]}
        />
      </section>

      {/* Fees Structure */}
      <section>
        <h4 className="font-semibold mb-3">Fees Structure</h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Tuition - Term 1" {...register("term1")} />
          <Field label="Tuition - Term 2" {...register("term2")} />
          <Field label="Tuition - Term 3" {...register("term3")} />
          <Field label="Books & Stationery" {...register("books")} />
          <Field label="Transport" {...register("transport")} />
          <Field label="Extra-Curricular" {...register("extra")} />
          <Field label="Others" {...register("others")} />
          <Field label="Subtotal" {...register("subtotal")} />
          <Field label="Total Payment" {...register("total")} />
        </div>
      </section>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-6">
        <Button type="button" variant="ghost" className="text-red-600">
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}
