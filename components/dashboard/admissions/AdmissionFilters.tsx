import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

export default function AdmissionFilters({
  search,
  onSearchChange,
  academicYear,
  onAcademicYearChange,
  classFilter,
  onClassFilterChange,
}: {
  search: string;
  onSearchChange: (v: string) => void;
  academicYear: string;
  onAcademicYearChange: (v: string) => void;
  classFilter: string;
  onClassFilterChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-3">
      <div className="flex flex-col md:flex-row gap-2">
        <Select value={academicYear} onValueChange={onAcademicYearChange}>
          <SelectTrigger size="sm" className="w-full sm:w-44 bg-gray-100">
            <SelectValue placeholder="Academic Year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Years</SelectItem>
            <SelectItem value="2025-2026">2025 - 2026</SelectItem>
            <SelectItem value="2024-2025">2024 - 2025</SelectItem>
            <SelectItem value="2023-2024">2023 - 2024</SelectItem>
            <SelectItem value="2022-2023">2022 - 2023</SelectItem>
          </SelectContent>
        </Select>

        <Select value={classFilter} onValueChange={onClassFilterChange}>
          <SelectTrigger size="sm" className="w-full sm:w-44 h-10 bg-gray-100">
            <SelectValue placeholder="Show All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Show All</SelectItem>
            <SelectItem value="10">Class 10</SelectItem>
            <SelectItem value="9">Class 9</SelectItem>
            <SelectItem value="8">Class 8</SelectItem>
            <SelectItem value="7">Class 7</SelectItem>
            <SelectItem value="6">Class 6</SelectItem>
            <SelectItem value="5">Class 5</SelectItem>
            <SelectItem value="4">Class 4</SelectItem>
            <SelectItem value="3">Class 3</SelectItem>
            <SelectItem value="2">Class 2</SelectItem>
            <SelectItem value="1">Class 1</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="relative w-full md:w-auto md:max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search here"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 h-10"
        />
      </div>
    </div>
  );
}
