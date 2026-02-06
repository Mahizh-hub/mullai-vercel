"use client";

import { useMemo, useState } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { FeeStructure } from "../types";
import { mockFeesData } from "../data";
import { DataTable, DataTableColumn } from "../../DataTable";
import PageHeader from "../../PageHeader";
import ConfirmDeleteDialog from "../../ConfirmDeleteDialog";

export default function FeesSetupList() {
  const [data, setData] = useState<FeeStructure[]>(mockFeesData);
  const [deleteTarget, setDeleteTarget] = useState<FeeStructure | null>(null);

  const columns: DataTableColumn<FeeStructure>[] = useMemo(
    () => [
      {
        key: "class",
        header: "Class",
      },
      {
        key: "section",
        header: "Section",
      },
      {
        key: "group",
        header: "Group",
        cell: (row) => {
           if (row.group === "-") return "-";
           // Determine color based on group name logic or just use a default/random for now as per design
           // Design shows "CS" as blue, "Biology" as green-ish.
           // We can reuse the badge styles if available, or just inline for now.
           // Assuming we want to match the reference visual, let's use some simple logic.
           let badgeClass = "bg-gray-100 text-gray-800";
           if (row.group.includes("CS") || row.group.includes("Computer")) badgeClass = "bg-blue-100 text-blue-700";
           if (row.group.includes("Bio")) badgeClass = "bg-green-100 text-green-700";

           return (
               <span className={`px-2 py-1 rounded-md text-xs font-medium ${badgeClass}`}>
                   {row.group}
               </span>
           );
        }
      },
      {
        key: "breakdown" as keyof FeeStructure, // This key doesn't strictly match a simple string property, handled by cell
        header: "Fee Breakdown",
        cell: (row) => (
          <ul className="mb-0 ps-3 list-none text-sm text-gray-500 space-y-1">
            {row.breakdown.map((item) => (
              <li key={item.id}>
                {item.name}: {item.amount}
              </li>
            ))}
          </ul>
        ),
      },
      {
        key: "total",
        header: "Total",
        cell: (row) => <span className="font-semibold">{row.total}</span>
      },
      {
        key: "actions" as keyof FeeStructure,
        header: "Action",
        align: "right",
        cell: (row) => (
          <div className="flex items-center justify-end gap-2">
            
            <button className="p-1 hover:bg-gray-100 rounded">
              <Pencil className="size-4 text-gray-600" />
            </button>
            <button
              className="p-1 hover:bg-gray-100 rounded"
              onClick={() => setDeleteTarget(row)}
            >
              <Trash2 className="size-4 text-destructive" />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <div className="card-base">
      <PageHeader
        title="Fees Setup"
        subtitle="View and manage fee structures for different classes and groups."
        actionHref="/dashboard/settings/fees/create"
        actionLabel="Create"
        className="mb-6"
      />

      <DataTable
        data={data}
        columns={columns}
        rowKeyAction={(row) => row.id}
      />

      <ConfirmDeleteDialog
        open={!!deleteTarget}
        onOpenChange={() => setDeleteTarget(null)}
        title="Delete Fee Structure"
        description={`Are you sure you want to delete the fee structure for Class ${deleteTarget?.class}?`}
        onConfirm={() => {
          if (!deleteTarget) return;
          setData((prev) => prev.filter((c) => c.id !== deleteTarget.id));
          setDeleteTarget(null);
        }}
      />
    </div>
  );
}
