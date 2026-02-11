import Image from "next/image";
import { DataTableColumn } from "@/components/shared/DataTable";
import { Student } from "./AllStudents";
import { Eye, Pencil, Trash2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

export const studentColumns = (
  onDelete: (student: Student) => void,
): DataTableColumn<Student>[] => [
  { key: "admissionNo", header: "Admission No.", width: "15%" },
  {
    key: "name",
    header: "Name",
    align: "left",
    width: "35%",
    cell: (row) => (
      <div className="flex-center-gap-3">
        {row.avatar && (
          <Image
            src={row.avatar}
            alt={row.name}
            width={32}
            height={32}
            className="rounded-full"
          />
        )}
        <span className="font-medium">{row.name}</span>
      </div>
    ),
  },
  { key: "phone", align: "center", header: "Phone Number", width: "15%" },
  { key: "class", align: "center", header: "Class", width: "10%" },
  { key: "section", align: "center", header: "Section", width: "10%" },
  {
    key: "status",
    header: "Status",
    align: "center",
    cell: (row) => (
      <span
        className={`px-2 py-1 text-xs rounded-md font-medium
            ${
              row.status === "active"
                ? "bg-pink-50 text-pink-600"
                : "bg-red-50 text-red-600"
            }
          `}
      >
        {row.status === "active" ? "Active" : "Inactive"}
      </span>
    ),
  },
  {
    key: "id",
    header: "Action",
    align: "right",
    width: "120px",
    cell: (row) => (
      <div className="flex justify-end">
        <Action icon={<Eye />} label="View" />
        <Action icon={<Pencil />} label="Edit" />
        <Action
          icon={<Trash2 className="text-red-500" />}
          label="Delete"
          onClick={() => onDelete(row)}
        />
      </div>
    ),
  },
];

function Action({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon" onClick={onClick}>
          {icon}
        </Button>
      </TooltipTrigger>
      <TooltipContent className="bg-white text-black">{label}</TooltipContent>
    </Tooltip>
  );
}
