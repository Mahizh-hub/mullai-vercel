"use client";

import { useMemo, useState } from "react";
import PageHeader from "@/components/layout/PageHeader";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { DataTable } from "@/components/shared/DataTable";
import { leaveColumns } from "./leave-columns";
import ConfirmDeleteDialog from "@/components/shared/ConfirmDeleteDialog";

export type LeaveRecord = {
  id: number;
  name: string;
  phone: string;
  roles: string[];
  days: number;
  startDate: string;
  endDate: string;
  status: "Pending" | "Rejected" | "Approved";
  avatar?: string;
};

const sampleLeaveData: LeaveRecord[] = [
  {
    id: 1,
    name: "Vijay John",
    phone: "9734567890",
    roles: ["Teacher", "Branch Admin"],
    days: 2,
    startDate: "10-02-2025",
    endDate: "11-02-2025",
    status: "Pending",
    avatar: "/users/user53.jpg",
  },
  {
    id: 2,
    name: "Michael Bay",
    phone: "9734567891",
    roles: ["Teacher"],
    days: 1,
    startDate: "12-02-2025",
    endDate: "12-02-2025",
    status: "Approved",
    avatar: "/users/user54.jpg",
  },
  {
    id: 3,
    name: "Arun Kumar",
    phone: "9734567892",
    roles: ["Other Staff"],
    days: 3,
    startDate: "15-02-2025",
    endDate: "17-02-2025",
    status: "Rejected",
    avatar: "/users/user55.jpg",
  },
  {
    id: 4,
    name: "Suresh Patel",
    phone: "9734567893",
    roles: ["Teacher"],
    days: 1,
    startDate: "20-02-2025",
    endDate: "20-02-2025",
    status: "Pending",
    avatar: "/users/user56.jpg",
  },
  {
    id: 5,
    name: "Karthik Raja",
    phone: "9734567894",
    roles: ["Branch Admin"],
    days: 5,
    startDate: "01-03-2025",
    endDate: "05-03-2025",
    status: "Approved",
    avatar: "/users/user57.jpg",
  },
];

export default function AllLeaveManagement() {
  const [data, setData] = useState<LeaveRecord[]>(sampleLeaveData);
  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<LeaveRecord | null>(null);

  // Editing state
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<LeaveRecord>>({});

  const filteredData = useMemo(
    () =>
      data.filter((record) =>
        record.name.toLowerCase().includes(search.toLowerCase())
      ),
    [data, search]
  );

  // Helper to convert DD-MM-YYYY to YYYY-MM-DD for input
  const toInputDate = (dateStr: string) => {
    const [d, m, y] = dateStr.split("-");
    return `${y}-${m}-${d}`;
  };

  // Helper to convert YYYY-MM-DD to DD-MM-YYYY for display/storage
  const toDisplayDate = (dateStr: string) => {
    const [y, m, d] = dateStr.split("-");
    return `${d}-${m}-${y}`;
  };

  // Helper to calculate days between two dates (inclusive)
  const calculateDays = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; 
    return diffDays;
  };

  const handleEdit = (record: LeaveRecord) => {
    setEditingId(record.id);
    setEditForm({ ...record });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleSave = () => {
    if (editingId && editForm) {
      setData((prev) =>
        prev.map((item) =>
          item.id === editingId ? ({ ...item, ...editForm } as LeaveRecord) : item
        )
      );
      handleCancel();
    }
  };

  const handleDateChange = (field: "startDate" | "endDate", value: string) => {
    const newForm = { ...editForm, [field]: toDisplayDate(value) };
    
    // Recalculate days if both dates are present
    const start = field === "startDate" ? value : toInputDate(editForm.startDate!);
    const end = field === "endDate" ? value : toInputDate(editForm.endDate!);
    
    if (start && end) {
       const days = calculateDays(start, end);
       newForm.days = days > 0 ? days : 0;
    }
    
    setEditForm(newForm);
  };

  const handleStatusChange = (value: string) => {
      setEditForm(prev => ({ ...prev, status: value as any }));
  }

  return (
    <div className="card-base">
      <PageHeader
        title="Leave Management"
        subtitle="Manage employee leave requests and view status."
        // Create button is intentionally omitted as per requirements
      />

      <div className="relative w-full sm:max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search employee..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 h-10"
        />
      </div>

      <DataTable
        data={filteredData}
        columns={leaveColumns(
          (record) => setDeleteTarget(record),
          editingId,
          editForm,
          handleEdit,
          handleSave,
          handleCancel,
          handleDateChange,
          handleStatusChange
        )}
        rowKeyAction={(row) => row.id}
      />

      <ConfirmDeleteDialog
        open={!!deleteTarget}
        onOpenChange={() => setDeleteTarget(null)}
        title="Delete Leave Record"
        description={`Are you sure you want to delete the leave request for "${deleteTarget?.name}"?`}
        onConfirm={() => {
          if (!deleteTarget) return;
          setData((prev) => prev.filter((r) => r.id !== deleteTarget.id));
          setDeleteTarget(null);
        }}
      />
    </div>
  );
}
