"use client";

import { useMemo, useState } from "react";
import PageHeader from "../PageHeader";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { DataTable } from "../DataTable";
import { employeeColumns } from "./employee-columns";
import ConfirmDeleteDialog from "../ConfirmDeleteDialog";

export type Employee = {
  id: number;
  code: number;
  name: string;
  status: "active" | "inactive";
  phone: string;
  roles: string[];
  avatar?: string;
};

const sampleUsers: Employee[] = [
  {
    id: 1,
    code: 101,
    name: "Vijay John",
    status: "active",
    phone: "9734567890",
    roles: ["Teacher", "Branch Admin", "Owner"],
    avatar: "/users/user53.jpg",
  },
  {
    id: 2,
    code: 102,
    name: "Michael Bay",
    status: "inactive",
    phone: "9734567891",
    roles: ["Teacher", "Branch Admin"],
    avatar: "/users/user54.jpg",
  },
  {
    id: 3,
    code: 103,
    name: "Arun Kumar",
    status: "active",
    phone: "9734567892",
    roles: ["Teacher"],
    avatar: "/users/user55.jpg",
  },
  {
    id: 4,
    code: 104,
    name: "Suresh Patel",
    status: "inactive",
    phone: "9734567893",
    roles: ["Other Staff"],
    avatar: "/users/user56.jpg",
  },
  {
    id: 5,
    code: 105,
    name: "Karthik Raja",
    status: "active",
    phone: "9734567894",
    roles: ["Branch Admin"],
    avatar: "/users/user57.jpg",
  },
  {
    id: 6,
    code: 106,
    name: "Rahul Verma",
    status: "inactive",
    phone: "9734567895",
    roles: ["Teacher"],
    avatar: "/users/user53.jpg",
  },
  {
    id: 7,
    code: 107,
    name: "Manoj Singh",
    status: "active",
    phone: "9734567896",
    roles: ["Teacher", "Other Staff"],
    avatar: "/users/user54.jpg",
  },
  {
    id: 8,
    code: 108,
    name: "Deepak Sharma",
    status: "inactive",
    phone: "9734567897",
    roles: ["Other Staff"],
    avatar: "/users/user55.jpg",
  },
  {
    id: 9,
    code: 109,
    name: "Praveen Nair",
    status: "active",
    phone: "9734567898",
    roles: ["Teacher"],
    avatar: "/users/user56.jpg",
  },
  {
    id: 10,
    code: 110,
    name: "Ajith Menon",
    status: "inactive",
    phone: "9734567899",
    roles: ["Teacher", "Branch Admin"],
    avatar: "/users/user57.jpg",
  },
  {
    id: 11,
    code: 111,
    name: "Sanjay Gupta",
    status: "active",
    phone: "9734567800",
    roles: ["Owner"],
    avatar: "/users/user53.jpg",
  },
  {
    id: 12,
    code: 112,
    name: "Naveen Prasad",
    status: "inactive",
    phone: "9734567801",
    roles: ["Other Staff"],
    avatar: "/users/user54.jpg",
  },
  {
    id: 13,
    code: 113,
    name: "Rohit Malhotra",
    status: "active",
    phone: "9734567802",
    roles: ["Teacher"],
    avatar: "/users/user55.jpg",
  },
  {
    id: 14,
    code: 114,
    name: "Balaji Iyer",
    status: "inactive",
    phone: "9734567803",
    roles: ["Branch Admin"],
    avatar: "/users/user56.jpg",
  },
  {
    id: 15,
    code: 115,
    name: "Vinoth Kumar",
    status: "active",
    phone: "9734567804",
    roles: ["Teacher"],
    avatar: "/users/user57.jpg",
  },
  {
    id: 16,
    code: 116,
    name: "Ashwin Rao",
    status: "inactive",
    phone: "9734567805",
    roles: ["Other Staff"],
    avatar: "/users/user53.jpg",
  },
  {
    id: 17,
    code: 117,
    name: "Harish Patel",
    status: "active",
    phone: "9734567806",
    roles: ["Teacher", "Branch Admin"],
    avatar: "/users/user54.jpg",
  },
  {
    id: 18,
    code: 118,
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
    <div className="card-base">
      <PageHeader
        title="Employee List"
        subtitle="Manage employee records, update details, and track roles and assignments."
        actionLabel="Create Employee"
        actionHref="/dashboard/employee-management/create"
        subtitleExtra="Assign roles and permissions to control access across different modules"
      />

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search employee..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          className="pl-9 h-10"
        />
      </div>

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
