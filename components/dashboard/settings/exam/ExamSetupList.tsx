"use client";

import { useMemo, useState } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { ExamPattern } from "@/components/dashboard/settings/types";
import { mockExamPatterns } from "@/components/dashboard/settings/data";
import { DataTable, DataTableColumn } from "@/components/shared/DataTable";
import ConfirmDeleteDialog from "@/components/shared/ConfirmDeleteDialog";
import PageHeader from "@/components/layout/PageHeader";

export default function ExamSetupList() {
  const [data, setData] = useState<ExamPattern[]>(mockExamPatterns);
  const [deleteTarget, setDeleteTarget] = useState<ExamPattern | null>(null);

  const columns: DataTableColumn<ExamPattern>[] = useMemo(
    () => [
      {
        key: "classRange",
        header: "Class",
      },
      {
        key: "patternName",
        header: "Exam Pattern Name",
      },
      {
        key: "examTypes",
        header: "Exam Type/Exam name",
        cell: (row) => (
            <ul className="mb-0 ps-3 list-none space-y-1 text-sm text-gray-600">
                {row.examTypes.map((exam) => (
                    <li key={exam.id}>{exam.name}</li>
                ))}
            </ul>
        )
      },
      {
        key: "actions" as keyof ExamPattern,
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
        title="Exam Pattern Setup"
        subtitle="Manage exam patterns and their associated exams."
        actionHref="/dashboard/settings/exam/create"
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
        title="Delete Exam Pattern"
        description={`Are you sure you want to delete the exam pattern "${deleteTarget?.patternName}"?`}
        onConfirm={() => {
          if (!deleteTarget) return;
          setData((prev) => prev.filter((c) => c.id !== deleteTarget.id));
          setDeleteTarget(null);
        }}
      />
    </div>
  );
}
