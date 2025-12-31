"use client";

import { useMemo, useState } from "react";
import PageHeader from "../PageHeader";
import { Input } from "@/components/ui/input";
import { DataTable } from "../DataTable";
import { employeeColumns } from "./employee-columns";
import ConfirmDeleteDialog from "../ConfirmDeleteDialog";

export type Employee = {
  id: number;
  name: string;
  status: "active" | "inactive";
  phone: string;
  roles: string[];
  avatar?: string;
};

const sampleUsers: Employee[] = [
  {
    id: 1,
    name: "Vijay John",
    status: "active",
    phone: "9734567890",
    roles: ["Teacher", "Branch Admin", "Owner"],
    avatar: "/users/user53.jpg",
  },
  {
    id: 2,
    name: "Michael Bay",
    status: "inactive",
    phone: "9734567891",
    roles: ["Teacher", "Branch Admin"],
    avatar: "/users/user54.jpg",
  },
  {
    id: 3,
    name: "Arun Kumar",
    status: "active",
    phone: "9734567892",
    roles: ["Teacher"],
    avatar: "/users/user55.jpg",
  },
  {
    id: 4,
    name: "Suresh Patel",
    status: "inactive",
    phone: "9734567893",
    roles: ["Other Staff"],
    avatar: "/users/user56.jpg",
  },
  {
    id: 5,
    name: "Karthik Raja",
    status: "active",
    phone: "9734567894",
    roles: ["Campus Admin"],
    avatar: "/users/user57.jpg",
  },
  {
    id: 6,
    name: "Rahul Verma",
    status: "inactive",
    phone: "9734567895",
    roles: ["Teacher"],
    avatar: "/users/user53.jpg",
  },
  {
    id: 7,
    name: "Manoj Singh",
    status: "active",
    phone: "9734567896",
    roles: ["Teacher", "Other Staff"],
    avatar: "/users/user54.jpg",
  },
  {
    id: 8,
    name: "Deepak Sharma",
    status: "inactive",
    phone: "9734567897",
    roles: ["Other Staff"],
    avatar: "/users/user55.jpg",
  },
  {
    id: 9,
    name: "Praveen Nair",
    status: "active",
    phone: "9734567898",
    roles: ["Teacher"],
    avatar: "/users/user56.jpg",
  },
  {
    id: 10,
    name: "Ajith Menon",
    status: "inactive",
    phone: "9734567899",
    roles: ["Teacher", "Branch Admin"],
    avatar: "/users/user57.jpg",
  },
  {
    id: 11,
    name: "Sanjay Gupta",
    status: "active",
    phone: "9734567800",
    roles: ["Owner"],
    avatar: "/users/user53.jpg",
  },
  {
    id: 12,
    name: "Naveen Prasad",
    status: "inactive",
    phone: "9734567801",
    roles: ["Other Staff"],
    avatar: "/users/user54.jpg",
  },
  {
    id: 13,
    name: "Rohit Malhotra",
    status: "active",
    phone: "9734567802",
    roles: ["Teacher"],
    avatar: "/users/user55.jpg",
  },
  {
    id: 14,
    name: "Balaji Iyer",
    status: "inactive",
    phone: "9734567803",
    roles: ["Campus Admin"],
    avatar: "/users/user56.jpg",
  },
  {
    id: 15,
    name: "Vinoth Kumar",
    status: "active",
    phone: "9734567804",
    roles: ["Teacher"],
    avatar: "/users/user57.jpg",
  },
  {
    id: 16,
    name: "Ashwin Rao",
    status: "inactive",
    phone: "9734567805",
    roles: ["Other Staff"],
    avatar: "/users/user53.jpg",
  },
  {
    id: 17,
    name: "Harish Patel",
    status: "active",
    phone: "9734567806",
    roles: ["Teacher", "Branch Admin"],
    avatar: "/users/user54.jpg",
  },
  {
    id: 18,
    name: "Lokesh Anand",
    status: "inactive",
    phone: "9734567807",
    roles: ["Teacher"],
    avatar: "/users/user55.jpg",
  },
];

export default function AllEmployee() {
  const [data, setData] = useState(sampleUsers);
  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<Employee | null>(null);

  const filtered = useMemo(
    () =>
      data.filter((u) => u.name.toLowerCase().includes(search.toLowerCase())),
    [data, search],
  );

  return (
    <div className="rounded-lg bg-white p-6 space-y-4">
      <PageHeader
        title="Employee List"
        subtitle="Manage employee records, update details, and track roles and assignments."
        actionLabel="Create Employee"
        actionHref="/dashboard/employee-management/create"
      />

      <Input
        placeholder="Search employee..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        className="max-w-xs"
      />

      <DataTable
        data={filtered}
        columns={employeeColumns((u) => setDeleteTarget(u))}
        rowKeyAction={(row) => row.id}
      />

      <ConfirmDeleteDialog
        open={!!deleteTarget}
        onOpenChange={() => setDeleteTarget(null)}
        title="Delete Employee"
        description={`Are you sure you want to delete "${deleteTarget?.name}"?`}
        onConfirm={() => {
          if (!deleteTarget) return;
          setData((prev) => prev.filter((u) => u.id !== deleteTarget.id));
          setDeleteTarget(null);
        }}
      />
    </div>
  );
}
