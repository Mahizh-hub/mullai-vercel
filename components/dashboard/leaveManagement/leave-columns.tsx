import Image from "next/image";
import { DataTableColumn } from "@/components/shared/DataTable";
import { LeaveRecord } from "./AllLeaveManagement";
import { Eye, Pencil, Trash2, Check, X } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ROLE_STYLES: Record<string, string> = {
  Teacher: "text-blue-600 bg-blue-50",
  "Branch Admin": "text-emerald-600 bg-emerald-50",
  Owner: "text-violet-600 bg-violet-50",
};

const STATUS_STYLES: Record<string, string> = {
  Pending: "text-yellow-600 bg-yellow-50",
  Rejected: "text-red-600 bg-red-50",
  Approved: "text-green-600 bg-green-50",
};

// Helper to convert DD-MM-YYYY to YYYY-MM-DD for input
const toInputDate = (dateStr?: string) => {
  if (!dateStr) return "";
  const [d, m, y] = dateStr.split("-");
  return `${y}-${m}-${d}`;
};

export const leaveColumns = (
  onRequestDelete: (record: LeaveRecord) => void,
  editingId: number | null,
  editForm: Partial<LeaveRecord>,
  onEdit: (record: LeaveRecord) => void,
  onSave: () => void,
  onCancel: () => void,
  onDateChange: (field: "startDate" | "endDate", value: string) => void,
  onStatusChange: (value: string) => void
): DataTableColumn<LeaveRecord>[] => [
  {
    key: "name",
    header: "Name",
    align: "left",
    width: "25%",
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
    key: "phone",
    header: "Phone Number",
    align: "center",
    cell: (row) => (
      <span className="text-sm text-muted-foreground">{row.phone}</span>
    ),
  },
  {
    key: "roles",
    header: "Roles",
    align: "left",
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
    key: "days",
    header: "Days",
    align: "center",
    width: "80px",
    cell: (row) => {
      const isEditing = editingId === row.id;
      return (
        <span className="text-sm">
          {isEditing ? editForm.days : row.days}
        </span>
      );
    },
  },
  {
    key: "startDate",
    header: "Start",
    align: "center",
    cell: (row) => {
      const isEditing = editingId === row.id;
      return isEditing ? (
        <Input
          type="date"
          value={toInputDate(editForm.startDate)}
          onChange={(e) => onDateChange("startDate", e.target.value)}
          className="h-7 text-xs px-1"
        />
      ) : (
        <span className="text-sm text-muted-foreground">{row.startDate}</span>
      );
    },
  },
  {
    key: "endDate",
    header: "End",
    align: "center",
    cell: (row) => {
      const isEditing = editingId === row.id;
      return isEditing ? (
        <Input
          type="date"
          value={toInputDate(editForm.endDate)}
          onChange={(e) => onDateChange("endDate", e.target.value)}
          className="h-7 text-xs px-1"
        />
      ) : (
        <span className="text-sm text-muted-foreground">{row.endDate}</span>
      );
    },
  },
  {
    key: "status",
    header: "Status",
    align: "center",
    width: "140px",
    cell: (row) => {
      const isEditing = editingId === row.id;
      return isEditing ? (
        <Select
          value={editForm.status}
          onValueChange={onStatusChange}
        >
          <SelectTrigger size="xs" className="w-[100px] text-xs">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Approved">Approved</SelectItem>
            <SelectItem value="Rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      ) : (
        <span
          className={`px-2 py-1 text-xs rounded-md font-medium
              ${STATUS_STYLES[row.status] ?? "text-gray-600 bg-gray-50"}
            `}
        >
          {row.status}
        </span>
      );
    },
  },
  {
    key: "id",
    header: "Action",
    align: "right",
    cell: (row) => {
      const isEditing = editingId === row.id;
      return (
        <div className="flex justify-end">
          {isEditing ? (
            <>
              <Action
                icon={<Check className="text-green-600" />}
                label="Save"
                onClick={onSave}
              />
              <Action
                icon={<X className="text-red-500" />}
                label="Cancel"
                onClick={onCancel}
              />
            </>
          ) : (
            <>
              <Action icon={<Eye />} label="View" />
              <Action
                icon={<Pencil />}
                label="Edit"
                onClick={() => onEdit(row)}
              />
              <Action
                icon={<Trash2 className="text-red-500" />}
                label="Delete"
                onClick={() => onRequestDelete(row)}
              />
            </>
          )}
        </div>
      );
    },
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
        <Button size="icon" variant="ghost" className="h-8 w-8" onClick={onClick}>
          {icon}
        </Button>
      </TooltipTrigger>
      <TooltipContent className="bg-white text-black">{label}</TooltipContent>
    </Tooltip>
  );
}
