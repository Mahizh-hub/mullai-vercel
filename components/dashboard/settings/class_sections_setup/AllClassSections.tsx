"use client";

import { useMemo, useState } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { ClassSection } from "../types";
import { mockClassSections } from "../data";
import { DataTable, DataTableColumn } from "../../DataTable";
import PageHeader from "../../PageHeader";
import ConfirmDeleteDialog from "../../ConfirmDeleteDialog";

export default function AllClassSections() {
  const [data, setData] = useState<ClassSection[]>(mockClassSections);
  const [deleteTarget, setDeleteTarget] = useState<ClassSection | null>(null);

  const columns: DataTableColumn<ClassSection>[] = useMemo(
    () => [
      {
        key: "class",
        header: "Class",
      },
      {
        key: "total",
        header: "Total",
      },
      {
        key: "sections",
        header: "Sections",
      },
      {
        key: "actions" as keyof ClassSection,
        header: "Action",
        align: "right",
        cell: (row) => (
          <div className="flex items-center justify-end gap-2">
            <button className="p-1 hover:bg-gray-100 rounded">
              <Eye className="size-4 text-primary" />
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
        title="Class & Sections"
        subtitle="View and manage all classes and their sections for the academic year."
        actionHref="/dashboard/settings/class-section/create"
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
        title="Delete Class & Section"
        description={`Are you sure you want to delete class "${deleteTarget?.class}"?`}
        onConfirm={() => {
          if (!deleteTarget) return;
          setData((prev) => prev.filter((c) => c.id !== deleteTarget.id));
          setDeleteTarget(null);
        }}
      />
    </div>
  );
}
