"use client";

import { useMemo, useState } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { FeeStructure } from "@/components/dashboard/settings/types";
import { mockFeesData } from "@/components/dashboard/settings/data";
import { DataTable, DataTableColumn } from "@/components/shared/DataTable";
import ConfirmDeleteDialog from "@/components/shared/ConfirmDeleteDialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import PageHeader from "@/components/layout/PageHeader";

export default function FeesSetupList() {
  const [data, setData] = useState<FeeStructure[]>(mockFeesData);
  const [deleteTarget, setDeleteTarget] = useState<FeeStructure | null>(null);
  const [viewTarget, setViewTarget] = useState<FeeStructure | null>(null);

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
        key: "patternName",
        header: "Fee Pattern Name",
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
            <button 
              className="p-1 hover:bg-gray-100 rounded"
              onClick={() => setViewTarget(row)}
            >
              <Eye className="size-4 text-gray-600" />
            </button>
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

      <Dialog open={!!viewTarget} onOpenChange={(open) => !open && setViewTarget(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Fee Breakdown</DialogTitle>
          </DialogHeader>
          {viewTarget && (
            <div className="space-y-4">
              <div className="bg-gray-50 p-3 rounded-md mb-2">
                 <div className="text-sm font-medium text-gray-500">Pattern Name</div>
                 <div className="font-semibold">{viewTarget.patternName || "-"}</div>
              </div>
              <div className="border rounded-md overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
                    <tr>
                      <th className="px-4 py-2 text-left">Component</th>
                      <th className="px-4 py-2 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {viewTarget.breakdown.map((item) => (
                      <tr key={item.id}>
                        <td className="px-4 py-2">{item.name}</td>
                        <td className="px-4 py-2 text-right">{item.amount}</td>
                      </tr>
                    ))}
                    <tr className="bg-gray-50 font-semibold">
                      <td className="px-4 py-2">Total</td>
                      <td className="px-4 py-2 text-right">{viewTarget.total}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
