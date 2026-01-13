"use client";

import { useMemo, useState } from "react";
import PageHeader from "../PageHeader";
import { Input } from "@/components/ui/input";
import { DataTable } from "../DataTable";
import ConfirmDeleteDialog from "../ConfirmDeleteDialog";
import { feesColumns, Fee, FeeRow } from "./fees-columns";
import { feesData } from "./fees.data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

export default function AllFees() {
  const [data, setData] = useState<FeeRow[]>(feesData);
  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<Fee | null>(null);
  const [academicYear, setAcademicYear] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");

  const filteredData = useMemo(
    () =>
      data.filter((row) => {
        const matchesSearch = row.name.toLowerCase().includes(search.toLowerCase());
        const matchesClass = !selectedClass || selectedClass === "all" || row.className === selectedClass;
        const matchesSection = !selectedSection || selectedSection === "all" || row.section === selectedSection;
        
        return matchesSearch && matchesClass && matchesSection;
      }),
    [data, search, selectedClass, selectedSection],
  );

  return (
    <div className="card-base">
      <PageHeader
        title="Fees List"
        subtitle="Track student fee details, monitor payments, and manage pending dues for the selected academic year."
        actionHref="/dashboard/fees/create"
        actionLabel="Add Fees Entry"
        subtitleExtra="Manage fees types and amounts in the fees settings"
      />

      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
        <div className="flex flex-col md:flex-row flex-wrap gap-2">
        <Select value={academicYear} onValueChange={setAcademicYear}>
          <SelectTrigger size="sm" className="w-full sm:w-[200px] bg-gray-50">
            <SelectValue placeholder="Select Academic year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2023-24">2023-24</SelectItem>
            <SelectItem value="2024-25">2024-25</SelectItem>
            <SelectItem value="2025-26">2025-26</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedClass} onValueChange={setSelectedClass}>
          <SelectTrigger size="sm" className="w-full sm:w-[200px] bg-gray-50">
            <SelectValue placeholder="Select Class" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Classes</SelectItem>
            <SelectItem value="1">Class 1</SelectItem>
            <SelectItem value="2">Class 2</SelectItem>
            <SelectItem value="3">Class 3</SelectItem>
            <SelectItem value="4">Class 4</SelectItem>
            <SelectItem value="5">Class 5</SelectItem>
            <SelectItem value="6">Class 6</SelectItem>
            <SelectItem value="7">Class 7</SelectItem>
            <SelectItem value="8">Class 8</SelectItem>
            <SelectItem value="9">Class 9</SelectItem>
            <SelectItem value="10">Class 10</SelectItem>
            <SelectItem value="11">Class 11</SelectItem>
            <SelectItem value="12">Class 12</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedSection} onValueChange={setSelectedSection}>
          <SelectTrigger size="sm" className="w-full sm:w-[200px] bg-gray-50">
            <SelectValue placeholder="Select Section" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sections</SelectItem>
            <SelectItem value="A">Section A</SelectItem>
            <SelectItem value="B">Section B</SelectItem>
            <SelectItem value="C">Section C</SelectItem>
            <SelectItem value="D">Section D</SelectItem>
          </SelectContent>
        </Select>
        </div>

        <div className="relative w-full md:w-auto md:max-w-sm md:ml-auto md:self-start">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search here"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-10"
          />
        </div>
      </div>

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
