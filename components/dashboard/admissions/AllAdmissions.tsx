"use client"

import { useMemo, useState } from "react";
import PageHeader from "@/components/layout/PageHeader";
import { DataTable } from "@/components/shared/DataTable";
import ConfirmDeleteDialog from "@/components/shared/ConfirmDeleteDialog";
import { admissionsColumns } from "./admission-columns";
import AdmissionFilters from "./AdmissionFilters";

export type AdmissionRow = {
  id: number;
  name: string;
  phone: string;
  admissionType: "Enrollment" | "Enquiry";
  class: string;
  academicYear: string;
  status: "active" | "inactive";
  avatar?: string;
  createdDate?: string;
};

export const admissionsData: AdmissionRow[] = [
  {
    id: 1,
    name: "Arjun Das K",
    phone: "9734567890",
    admissionType: "Enrollment",
    class: "10",
    academicYear: "2025-2026",
    status: "active",
    avatar: "/users/user53.jpg",
    createdDate: "Jan 12, 2025",
  },
  {
    id: 2,
    name: "Sneha Iyer",
    phone: "9876543211",
    admissionType: "Enquiry",
    class: "9",
    academicYear: "2024-2025",
    status: "inactive",
    avatar: "/users/user54.jpg",
    createdDate: "Dec 05, 2024",
  },
];

export default function AllAdmissions() {
  const [data, setData] = useState<AdmissionRow[]>(admissionsData);
  const [search, setSearch] = useState("");
  const [academicYear, setAcademicYear] = useState<string | undefined>(undefined);
  const [classFilter, setClassFilter] = useState<string | undefined>(undefined);
  const [deleteTarget, setDeleteTarget] = useState<AdmissionRow | null>(null);

  const filtered = useMemo(() => {
    return data.filter((admission) => {
      // Search filter
      const matchesSearch = admission.name
        .toLowerCase()
        .includes(search.toLowerCase());

      // Academic year filter
      const matchesAcademicYear =
        !academicYear || academicYear === "all" || admission.academicYear === academicYear;

      // Class filter
      const matchesClass =
        !classFilter || classFilter === "all" || admission.class === classFilter;

      return matchesSearch && matchesAcademicYear && matchesClass;
    });
  }, [data, search, academicYear, classFilter]);

  return (
    <div className="card-base">
      <PageHeader
        title="Admissions List"
        subtitle="View and manage all students admissions easily."
        actionHref="/dashboard/admissions/create"
        actionLabel="Create Admission"
        subtitleExtra="Use filters and search to quickly find students across different classes and sections"
      />

      <AdmissionFilters
        search={search}
        onSearchChange={setSearch}
        academicYear={academicYear}
        onAcademicYearChange={setAcademicYear}
        classFilter={classFilter}
        onClassFilterChange={setClassFilter}
      />

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