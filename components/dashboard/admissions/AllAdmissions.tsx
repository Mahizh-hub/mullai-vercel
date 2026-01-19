"use client"

import { useMemo, useState } from "react";
import PageHeader from "../PageHeader";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DataTable } from "../DataTable";
import ConfirmDeleteDialog from "../ConfirmDeleteDialog";
import { admissionsColumns } from "./admission-columns";

export type AdmissionRow = {
  id: number;
  name: string;
  phone: string;
  admissionType: "Enrollment" | "Enquiry";
  class: string;
  status: "active" | "inactive";
  avatar?: string;
};

export const admissionsData: AdmissionRow[] = [
  {
    id: 1,
    name: "Arjun Das K",
    phone: "9734567890",
    admissionType: "Enrollment",
    class: "10",
    status: "active",
    avatar: "/users/user53.jpg",
  },
  {
    id: 2,
    name: "Sneha Iyer",
    phone: "9876543211",
    admissionType: "Enquiry",
    class: "9",
    status: "inactive",
    avatar: "/users/user54.jpg",
  },
];

export default function AllAdmissions() {
  const [data, setData] = useState<AdmissionRow[]>(admissionsData);
  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<AdmissionRow | null>(null);

  const filtered = useMemo(
    () =>
      data.filter((s) => s.name.toLowerCase().includes(search.toLowerCase())),
    [data, search]
  );

  return (
    <div className="card-base">
      <PageHeader
        title="Admissions List"
        subtitle="View and manage all students admissions easily."
        actionHref="/dashboard/admissions/create"
        actionLabel="Create Admission"
        subtitleExtra="Use filters and search to quickly find students across different classes and sections"
      />

      <div className="relative w-full sm:max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search here..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          className="pl-9 h-10"
        />
      </div>

      <DataTable
        data={filtered}
        columns={admissionsColumns((s) => setDeleteTarget(s))}
        rowKeyAction={(row) => row.id}
      />

      <ConfirmDeleteDialog
        open={!!deleteTarget}
        onOpenChange={() => setDeleteTarget(null)}
        title="Delete Student"
        description={`Are you sure you want to delete "${deleteTarget?.name}"?`}
        onConfirm={() => {
          if (!deleteTarget) return;
          setData((prev) => prev.filter((s) => s.id !== deleteTarget.id));
          setDeleteTarget(null);
        }}
      />
    </div>
  );
}