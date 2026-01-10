"use client";

import { useMemo, useState } from "react";
import PageHeader from "../PageHeader";
import { Input } from "@/components/ui/input";
import ConfirmDeleteDialog from "../ConfirmDeleteDialog";
import { DataTable } from "../DataTable";
import { studentColumns } from "./student-columns";

export type Student = {
  id: number;
  name: string;
  phone: string;
  rollNumber: string;
  class: string;
  section: string;
  status: "active" | "inactive";
  avatar?: string;
};

const sampleStudents: Student[] = [
  {
    id: 1,
    name: "Arjun Kumar",
    phone: "9876543210",
    rollNumber: "A101",
    class: "10",
    section: "A",
    status: "active",
    avatar: "/users/user53.jpg",
  },
  {
    id: 2,
    name: "Sneha Iyer",
    phone: "9876543211",
    rollNumber: "A102",
    class: "10",
    section: "A",
    status: "active",
    avatar: "/users/user54.jpg",
  },
  {
    id: 3,
    name: "Rahul Verma",
    phone: "9876543212",
    rollNumber: "A103",
    class: "10",
    section: "B",
    status: "inactive",
    avatar: "/users/user55.jpg",
  },
  {
    id: 4,
    name: "Priya Natarajan",
    phone: "9876543213",
    rollNumber: "B201",
    class: "9",
    section: "B",
    status: "active",
    avatar: "/users/user56.jpg",
  },
  {
    id: 5,
    name: "Karthik Ramesh",
    phone: "9876543214",
    rollNumber: "C301",
    class: "8",
    section: "C",
    status: "inactive",
    avatar: "/users/user57.jpg",
  },
  {
    id: 6,
    name: "Ananya Sharma",
    phone: "9876543215",
    rollNumber: "D401",
    class: "7",
    section: "A",
    status: "active",
    avatar: "/users/user53.jpg",
  },
];

export default function AllStudents() {
  const [data, setData] = useState<Student[]>(sampleStudents);
  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<Student | null>(null);

  const filtered = useMemo(
    () =>
      data.filter((s) => s.name.toLowerCase().includes(search.toLowerCase())),
    [data, search],
  );

  return (
    <div className="rounded-lg bg-white p-6 space-y-4 border border-gray-50">
      <PageHeader
        title="Students List"
        subtitle="View and manage student profiles, academic details, staff, and parent information."
        actionHref="/dashboard/students/create"
        actionLabel="Create Student"
      />

      <Input
        placeholder="Search student..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        className="max-w-70 h-8"
      />

      <DataTable
        data={filtered}
        columns={studentColumns((s) => setDeleteTarget(s))}
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
