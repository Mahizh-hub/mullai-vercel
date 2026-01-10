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
    <div className="border rounded-md bg-white">
      {/* HORIZONTAL SCROLL (small screens) */}
      <div className="overflow-x-auto">
        {/* VERTICAL SCROLL (same as PHP .table-scroll) */}
        <div className="max-h-[calc(100vh-260px)] overflow-y-auto">
          <table className="min-w-[1200px] w-full border-collapse align-middle">
            {/* STICKY HEADER */}
            <thead className="sticky top-0 z-10 bg-white">
              <tr className="text-xs font-semibold text-gray-600">
                <th className="px-3 py-2">Date</th>
                <th className="px-3 py-2">Day</th>
                <th className="px-3 py-2">Start time</th>
                <th className="px-3 py-2">End time</th>
                <th className="px-3 py-2">Session</th>
                <th className="px-3 py-2">Subject</th>
                <th className="px-3 py-2">Marking type</th>
                <th className="px-3 py-2">Total</th>
                <th className="px-3 py-2">Pass%</th>
                <th className="px-3 py-2 text-right">Action</th>
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
