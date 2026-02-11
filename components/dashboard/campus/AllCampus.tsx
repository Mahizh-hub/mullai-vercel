"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import PageHeader from "@/components/layout/PageHeader";
import { campusColumns } from "./campus-columns";
import { DataTable } from "@/components/shared/DataTable";
import ConfirmDeleteDialog from "@/components/shared/ConfirmDeleteDialog";

export type Campus = {
  id: number;
  code: string; // #011
  name: string; // Saras International School
  city: string; // Chennai
  classes: string; // 1 to 12
  sections: number;
  admin: string;
  phone: string;
  avatar?: string; // optional admin avatar
};

const sampleCampus: Campus[] = [
  {
    id: 1,
    code: "#011",
    name: "Saras International School",
    city: "Chennai",
    classes: "1 to 12",
    sections: 200,
    admin: "Raja",
    phone: "9638527410",
    avatar: "/users/user53.jpg",
  },
  {
    id: 2,
    code: "#012",
    name: "Mullai Public School",
    city: "Coimbatore",
    classes: "LKG to 10",
    sections: 120,
    admin: "Karthik",
    phone: "9876543210",
    avatar: "/users/user54.jpg",
  },
];

export default function AllCampus() {
  const [data, setData] = useState<Campus[]>(sampleCampus);
  const [search, setSearch] = useState("");

  const [deleteTarget, setDeleteTarget] = useState<Campus | null>(null);

  const filteredData = useMemo(
    () =>
      data.filter((c) => c.name.toLowerCase().includes(search.toLowerCase())),
    [data, search],
  );

  return (
    <div className="card-base">
      <PageHeader
        title="Campuses List"
        subtitle="View and manage all registered campuses, including their classes, staff, and student details."
        actionHref="/dashboard/campuses/create"
        actionLabel="Create Campus"
        subtitleExtra="Each campus can have its own admin, classes, and sections configuration"
      />

      <div className="relative w-full sm:max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search campus..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          className="pl-9 h-10"
        />
      </div>

      <DataTable
        data={filteredData}
        columns={campusColumns((campus) => setDeleteTarget(campus))}
        rowKeyAction={(row) => row.id}
      />

      <ConfirmDeleteDialog
        open={!!deleteTarget}
        onOpenChange={() => setDeleteTarget(null)}
        title="Delete Campus"
        description={`Are you sure you want to delete "${deleteTarget?.name}"?`}
        onConfirm={() => {
          if (!deleteTarget) return;
          setData((prev) => prev.filter((c) => c.id !== deleteTarget.id));
          setDeleteTarget(null);
        }}
      />
    </div>
  );
}
