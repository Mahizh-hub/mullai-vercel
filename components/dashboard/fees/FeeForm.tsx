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
      <section className="space-y-4">
        {/* Row 1: Roll No, Student Name */}
        <div className="grid grid-cols-2 gap-4">
          <Field label="Roll No" placeholder="Enter roll number" required {...register("rollNo")} />
          <Field label="Student Name" placeholder="Enter student name" {...register("studentName")} />
        </div>

        {/* Row 2: Class, Section, Academic Year */}
        <div className="grid grid-cols-3 gap-4">
          <Field label="Class" placeholder="Enter class" {...register("className")} />
          <Field label="Section" placeholder="Enter section" {...register("section")} />
          <Field label="Academic Year" placeholder="e.g., 2024-2025" {...register("academicYear")} />
        </div>

        {/* Row 3: Date of Payment, Payment Type, Payment Mode */}
        <div className="grid grid-cols-3 gap-4">
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
        </div>
      </section>

      {/* Fees Structure */}
      <section>
        <h4 className="font-semibold mb-3">Fees structure</h4>

        <div className="space-y-4">
          {/* Row 1: Tuition - Term 1, Tuition - Term 2 */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Tuition - Term 1" placeholder="Enter amount" {...register("term1")} />
            <Field label="Tuition - Term 2" placeholder="Enter amount" {...register("term2")} />
          </div>

          {/* Row 2: Tuition - Term 3, Books & Stationery */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Tuition - Term 3" placeholder="Enter amount" {...register("term3")} />
            <Field label="Books & Stationery" placeholder="Enter amount" {...register("books")} />
          </div>

          {/* Row 3: Transport, Extra-Curricular */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Transport" placeholder="Enter amount" {...register("transport")} />
            <Field label="Extra-Curricular" placeholder="Enter amount" {...register("extra")} />
          </div>

          {/* Row 4: Others (right column only) */}
          <div className="grid grid-cols-2 gap-4">
            <div></div>
            <Field label="Others" placeholder="Enter amount" {...register("others")} />
          </div>

          {/* Row 5: Subtotal (right column only) */}
          <div className="grid grid-cols-2 gap-4">
            <div></div>
            <Field label="Subtotal" placeholder="Auto-calculated" {...register("subtotal")} />
          </div>

          {/* Row 6: TOTAL PAYMENT (right column only) */}
          <div className="grid grid-cols-2 gap-4">
            <div></div>
            <Field label="TOTAL PAYMENT" placeholder="Auto-calculated" {...register("total")} />
          </div>
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
