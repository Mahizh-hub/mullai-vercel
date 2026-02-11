"use client";

import Image from "next/image";
import PageHeader from "@/components/layout/PageHeader";
import { DataTable } from "@/components/shared/DataTable";
import { feeHistoryColumns } from "./fee-history-columns";
import { feesData } from "./fees.data";
import { Fee } from "./fees-columns";

type Props = {
  feeId: number;
};

export default function FeeDetails({ feeId }: Props) {
  const fee: Fee | undefined = feesData.find((f) => f.id === feeId);

  /* ---------- Not found guard ---------- */
  if (!fee) {
    return (
      <div className="card-base">
        <PageHeader
          title="Student Fees Details"
          subtitle="The requested fee record could not be found."
        />
        <p className="text-sm text-muted-foreground">
          Please go back to the fees list and try again.
        </p>
      </div>
    );
  }

  return (
    <div className="card-base space-y-6">
      <PageHeader
        title="Student Fees Details"
        subtitle="View the student’s fee summary, pending balance, and complete payment history."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ---------------- Left : Payment History ---------------- */}
        <div className="lg:col-span-8">
          <h4 className="font-semibold mb-3">Payment History</h4>

          <DataTable
            data={fee.history ?? []}
            columns={feeHistoryColumns}
            rowKeyAction={(row) => row.id}
          />
        </div>

        {/* ---------------- Right : Student Summary ---------------- */}
        <div className="lg:col-span-4">
          <div className="card-nested">
            {/* Student header */}
            <div className="flex-center-gap-3">
              <Image
                src={fee.avatar ?? "/users/user-placeholder.jpg"}
                alt={fee.name}
                width={56}
                height={56}
                className="rounded-full border"
              />
              <div>
                <h4 className="font-semibold">{fee.name}</h4>
                <p className="text-sm text-muted-foreground">
                  Roll No: {fee.rollNo}
                </p>
              </div>
            </div>

            <Summary
              label="Class & Section"
              value={`${fee.className} "${fee.section}"`}
            />
            <Summary
              label="Total Fees"
              value={`₹ ${fee.total.toLocaleString()}`}
            />
            <Summary
              label="Fees Paid"
              value={`₹ ${fee.paid.toLocaleString()}`}
            />
            <Summary
              label="Pending Due"
              value={`₹ ${fee.due.toLocaleString()}`}
              className="text-red-600"
            />
            <Summary label="Phone Number" value={fee.phone} />
            <Summary label="Academic Year" value={fee.academicYear ?? "-"} />
            <Summary label="D.O.B" value={fee.dob ?? "-"} />
            <Summary label="Address" value={fee.address ?? "-"} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Reusable summary row ---------- */
function Summary({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className={`font-medium ${className ?? ""}`}>{value}</p>
    </div>
  );
}
