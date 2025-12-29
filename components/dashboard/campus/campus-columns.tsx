import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Campus } from "./AllCampus";
import { DataTableColumn } from "../DataTable";

export const campusColumns = (
  onRequestDelete: (campus: Campus) => void,
): DataTableColumn<Campus>[] => [
  {
    key: "code",
    header: "S.No",
    cell: (row) => (
      <span className="text-sm text-muted-foreground">{row.code}</span>
    ),
  },
  {
    key: "name",
    header: "Campus Name",
    cell: (row) => (
      <div className="flex items-center gap-3">
        {row.avatar && (
          <Image
            src={row.avatar}
            alt={row.admin}
            width={32}
            height={32}
            className="rounded-full"
          />
        )}
        <div className="leading-tight">
          <p className="font-medium">{row.name}</p>
          <p className="text-sm text-muted-foreground">{row.city}</p>
        </div>
      </div>
    ),
  },
  { key: "classes", header: "Classes" },
  { key: "sections", header: "Sections" },
  {
    key: "admin",
    header: "Admin",
    cell: (row) => <span className="text-sm">{row.admin}</span>,
  },
  {
    key: "phone",
    header: "Phone Number",
    cell: (row) => (
      <span className="text-sm text-muted-foreground">{row.phone}</span>
    ),
  },
  {
    key: "id",
    header: "Actions",
    align: "right",
    cell: (row) => (
      <div className="flex justify-end">
        <Action icon={<Eye className="text-pink-500" />} label="View" />
        <Action icon={<Pencil className="text-slate-600" />} label="Edit" />
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
      <TooltipTrigger className="bg-white" asChild>
        <Button
          size="icon"
          className="hover:bg-transparent"
          variant="ghost"
          onClick={onClick}
        >
          {icon}
        </Button>
      </TooltipTrigger>
      <TooltipContent className="bg-white text-pink-500">
        {label}
      </TooltipContent>
    </Tooltip>
  );
}
