"use client";

import { useState } from "react";
import PageHeader from "../PageHeader";
import ExamFilters from "./ExamFilters";
import ExamTable from "./ExamTable";

export default function ExamsPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="card-base">
      <PageHeader
        title="Exam List"
        subtitle="Create an exam timetable for each class and section by selecting the exam type, date, time and subjects."
        subtitleExtra="Manage exam types and patterns for each class and section in settings
        module."
      />

      <ExamFilters search={search} onSearchChange={setSearch} />
      <ExamTable search={search} />
    </div>
  );
}
