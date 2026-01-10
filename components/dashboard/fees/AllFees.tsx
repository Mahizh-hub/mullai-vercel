"use client";

import { useMemo, useState } from "react";
import PageHeader from "../PageHeader";
import { Input } from "@/components/ui/input";
import { DataTable } from "../DataTable";
import ConfirmDeleteDialog from "../ConfirmDeleteDialog";
import { feesColumns, Fee, FeeRow } from "./fees-columns";
import { feesData } from "./fees.data";

export default function AllFees() {
  const [data, setData] = useState<FeeRow[]>(feesData);
  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<Fee | null>(null);

  const filteredData = useMemo(
    () =>
      data.filter((row) =>
        row.name.toLowerCase().includes(search.toLowerCase()),
      ),
    [data, search],
  );

  return (
    <div className="rounded-lg bg-white p-6 space-y-4 border border-gray-50">
      <PageHeader
        title="Fees List"
        subtitle="Track student fee details, monitor payments, and manage pending dues."
        actionHref="/dashboard/fees/create"
        actionLabel="Add Fees Entry"
      />

      <Input
        placeholder="Search student..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-xs h-8"
      />

      <DataTable
        data={filteredData}
        columns={feesColumns((row) => setDeleteTarget(row))}
        rowKeyAction={(row) => row.id}
      />

      <ConfirmDeleteDialog
        open={!!deleteTarget}
        onOpenChange={() => setDeleteTarget(null)}
        title="Delete Fee Record"
        description={`Are you sure you want to delete fees for "${deleteTarget?.name}"?`}
        onConfirm={() => {
          if (!deleteTarget) return;
          setData((prev) => prev.filter((f) => f.id !== deleteTarget.id));
          setDeleteTarget(null);
        }}
      />
    </div>
  );
}
