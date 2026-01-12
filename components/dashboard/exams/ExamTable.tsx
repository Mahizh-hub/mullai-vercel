"use client";

import { ExamRow } from "@/lib/exam";
import { useState } from "react";
import ExamRowItem from "./ExamRow";

const createEmptyRow = (): ExamRow => ({
  id: crypto.randomUUID(),
  date: "",
  day: "Monday",
  startTime: "",
  endTime: "",
  session: "Morning",
  subject: "",
  markingType: "Marks",
  total: "",
  passPercentage: "",
});

export default function ExamTable({ search }: { search: string }) {
  const [rows, setRows] = useState<ExamRow[]>([createEmptyRow()]);

  const updateRow = (id: string, patch: Partial<ExamRow>) => {
    setRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, ...patch } : row)),
    );
  };

  const addRow = () => setRows((prev) => [...prev, createEmptyRow()]);

  const removeRow = (id: string) =>
    setRows((prev) =>
      prev.length > 1 ? prev.filter((row) => row.id !== id) : prev,
    );

  const filteredRows = rows.filter((row) =>
    JSON.stringify(row).toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="rounded-md border border-gray-100">
      {/* HORIZONTAL SCROLL (small screens) */}
      <div className="overflow-x-auto">
        {/* VERTICAL SCROLL (same as PHP .table-scroll) */}
        <div className="max-h-[calc(100vh-260px)] overflow-y-auto">
          <table className="min-w-[1200px] w-full border-collapse align-middle">
            {/* STICKY HEADER */}
            <thead className="sticky top-0 z-10 bg-gray-100">
              <tr className="text-sm text-gray-600">
                <th className="h-10 font-medium px-2 text-left align-middle">Date</th>
                <th className="h-10 font-medium px-2 text-left align-middle">Day</th>
                <th className="h-10 font-medium px-2 text-left align-middle">Start time</th>
                <th className="h-10 font-medium px-2 text-left align-middle">End time</th>
                <th className="h-10 font-medium px-2 text-left align-middle">Session</th>
                <th className="h-10 font-medium px-2 text-left align-middle">Subject</th>
                <th className="h-10 font-medium px-2 text-left align-middle">Marking type</th>
                <th className="h-10 font-medium px-2 text-left align-middle">Total</th>
                <th className="h-10 font-medium px-2 text-left align-middle">Pass%</th>
                <th className="h-10 font-medium px-2 text-right align-middle">Action</th>
              </tr>
            </thead>

            {/* NORMAL TBODY – DO NOT TOUCH DISPLAY */}
            <tbody>
              {filteredRows.map((row) => (
                <ExamRowItem
                  key={row.id}
                  row={row}
                  onChangeAction={updateRow}
                  onAddAction={addRow}
                  onRemoveAction={removeRow}
                  canDelete={filteredRows.length > 1}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
