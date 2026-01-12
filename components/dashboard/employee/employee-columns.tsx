import Image from "next/image";
import { DataTableColumn } from "../DataTable";
import { Employee } from "./AllEmployee";
import { Eye, Pencil, Trash2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

const ROLE_STYLES: Record<string, string> = {
  Teacher: "text-blue-600 bg-blue-50",
  "Branch Admin": "text-emerald-600 bg-emerald-50",
  Owner: "text-violet-600 bg-violet-50",
};

export const employeeColumns = (
  onRequestDelete: (user: Employee) => void,
): DataTableColumn<Employee>[] => [
  {
    key: "code",
    header: "S.No",
    width: "80px",
    cell: (row) => (
      <span className="text-sm text-muted-foreground">{row.code}</span>
    ),
  },
  {
    key: "name",
    header: "Name",
    width: "200px",
    cell: (row) => (
      <div className="flex-center-gap-3">
        {row.avatar && (
          <Image
            src={row.avatar}
            alt={row.name}
            width={28}
            height={28}
            className="rounded-full"
          />
        )}
        <span className="font-medium">{row.name}</span>
      </div>
    ),
  },
  {
    key: "status",
    header: "Status",
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
    key: "phone",
    header: "Phone Number",
    cell: (row) => (
      <span className="text-sm text-muted-foreground">{row.phone}</span>
    ),
  },
  {
    key: "roles",
    header: "Roles",
    cell: (row) => (
      <div className="flex flex-wrap gap-1">
        {row.roles.map((role) => (
          <span
            key={role}
            className={`px-2 py-0.5 text-xs rounded font-medium
              ${ROLE_STYLES[role] ?? "text-gray-600 bg-gray-50"}
            `}
          >
            {role}
          </span>
        ))}
      </div>
    ),
  },
  {
    key: "id",
    header: "Action",
    align: "right",
    cell: (row) => (
      <div className="flex justify-end">
        <Action icon={<Eye />} label="View" />
        <Action icon={<Pencil />} label="Edit" />
        <Action
          icon={<Trash2 className="text-red-500" />}
          label="Delete"
          onClick={() => onRequestDelete(row)}
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
        <Button size="icon" variant="ghost" onClick={onClick}>
          {icon}
        </Button>
      </TooltipTrigger>
      <TooltipContent className="bg-white text-black">{label}</TooltipContent>
    </Tooltip>
  );
}
