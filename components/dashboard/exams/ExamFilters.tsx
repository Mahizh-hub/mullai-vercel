import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

export default function ExamFilters({
  search,
  onSearchChange,
}: {
  search: string;
  onSearchChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-3">
      <div className="flex flex-col md:flex-row gap-2">
        <Select>
          <SelectTrigger size="sm" className="w-full sm:w-44 bg-gray-100">
            <SelectValue placeholder="Select Class" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">Class 10</SelectItem>
            <SelectItem value="9">Class 9</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger size="sm" className="w-full sm:w-44 h-10 bg-gray-100">
            <SelectValue placeholder="Select Section" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="A">A</SelectItem>
            <SelectItem value="B">B</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger size="sm" className="w-full sm:w-52 h-10 bg-gray-100">
            <SelectValue placeholder="Select Exam Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="mid1">First Mid Term</SelectItem>
            <SelectItem value="quarterly">Quarterly</SelectItem>
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
