"use client";

import { useState } from "react";
import PageHeader from "../PageHeader";
import ExamFilters from "./ExamFilters";
import ExamTable from "./ExamTable";

export default function ExamsPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="rounded-lg bg-white p-6 space-y-4 border border-gray-50">
      <PageHeader
        title="Exam List"
        subtitle="Create an exam timetable for each class and section by selecting the exam type, date, time and subjects."
        className="mb-0"
      />

      <p className="text-xs italic text-pink-500">
        Manage exam types and patterns for each class and section in settings
        module.
      </p>

      <ExamFilters search={search} onSearchChange={setSearch} />
      <ExamTable search={search} />
    </div>
  );
}
