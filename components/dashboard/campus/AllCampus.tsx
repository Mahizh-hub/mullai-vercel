"use client";

import { Input } from "@/components/ui/input";
import { useMemo, useState } from "react";
import PageHeader from "../PageHeader";
import { campusColumns } from "./campus-columns";
import { DataTable } from "../DataTable";
import TablePagination from "../TablePagination";
import ConfirmDeleteDialog from "../ConfirmDeleteDialog";

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

const ITEMS_PER_PAGE = 10;

export default function AllCampus() {
  const [data, setData] = useState<Campus[]>(sampleCampus);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [deleteTarget, setDeleteTarget] = useState<Campus | null>(null);

  const filteredData = useMemo(
    () =>
      data.filter((c) => c.name.toLowerCase().includes(search.toLowerCase())),
    [data, search],
  );

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  const paginatedData = useMemo(
    () =>
      filteredData.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE),
    [filteredData, page],
  );

  return (
    <div className="rounded-lg bg-white p-6 space-y-4 border border-gray-50">
      <PageHeader
        title="Campuses List"
        subtitle="View and manage all registered campuses, including their classes, staff, and student details."
        actionHref="/dashboard/campuses/create"
        actionLabel="Create Campus"
      />

      <div>
        <Input
          placeholder="Search campus..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="max-w-70"
        />
        <DataTable
          data={paginatedData}
          columns={campusColumns((campus) => setDeleteTarget(campus))}
          rowKeyAction={(row) => row.id}
        />

        <div className="flex w-full mt-4 items-end">
          <TablePagination
            page={page}
            totalPages={totalPages}
            onChange={setPage}
          />
        </div>
      </div>

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
