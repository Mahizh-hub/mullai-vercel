"use client";

import { useMemo, useState } from "react";

import { Eye, Pencil, Trash2 } from "lucide-react";
import { SubjectListItem } from "../types";
import { mockSubjectsList } from "../data";
import { DataTable, DataTableColumn } from "../../DataTable";
import PageHeader from "../../PageHeader";
import ConfirmDeleteDialog from "../../ConfirmDeleteDialog";

export default function AllSubjects() {
  const [data, setData] = useState<SubjectListItem[]>(mockSubjectsList);
  const [deleteTarget, setDeleteTarget] = useState<SubjectListItem | null>(null);

  const columns: DataTableColumn<SubjectListItem>[] = useMemo(
    () => [
      {
        key: "class",
        header: "Class",
      },
      {
        key: "sections",
        header: "Sections",
      },
      {
        key: "group",
        header: "Group",
      },
      {
        key: "commonSubjects",
        header: "Common Subjects",
      },
      {
        key: "electiveSubjects",
        header: "Elective Subjects",
      },
      {
        key: "languageChoices",
        header: "Language Choices",
      },
      {
        key: "actions" as keyof SubjectListItem,
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
        title="Subjects List"
        subtitle="View and manage subjects for all classes and grades."
        actionHref="/dashboard/settings/subjects/create"
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
        title="Delete Subject Configuration"
        description={`Are you sure you want to delete the subject configuration for class "${deleteTarget?.class}"?`}
        onConfirm={() => {
          if (!deleteTarget) return;
          setData((prev) => prev.filter((c) => c.id !== deleteTarget.id));
          setDeleteTarget(null);
        }}
      />
    </div>
  );
}
