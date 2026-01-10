import Image from "next/image";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DataTableColumn } from "../DataTable";
import Link from "next/link";

export type Fee = {
  id: number;

  /* List fields */
  name: string;
  phone: string;
  rollNo: string;
  status: "Active" | "Inactive";
  className: string;
  section: string;
  total: number;
  paid: number;
  due: number;
  avatar?: string;

  /* Optional detail fields */
  academicYear?: string;
  dob?: string;
  address?: string;

  history?: {
    id: number;
    exam: string;
    date: string;
    transactionId: string;
    mode: string;
    amount: number;
    status: "Paid" | "Pending" | "Partial";
  }[];
};

export const feesColumns = (
  onDelete: (row: Fee) => void,
): DataTableColumn<Fee>[] => [
  {
    key: "name",
    header: "Name",
    width: "25%",
    cell: (row) => (
      <div className="flex items-center gap-3">
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
  { key: "phone", header: "Phone No" },
  { key: "rollNo", header: "Roll No" },
  {
    key: "status",
    header: "Status",
    cell: (row) => (
      <span className="rounded-md bg-pink-50 px-2 py-1 text-xs text-pink-600">
        {row.status}
      </span>
    ),
  },
  { key: "className", header: "Class" },
  { key: "section", header: "Section" },
  {
    key: "total",
    header: "Total",
    cell: (row) => `₹ ${row.total.toLocaleString()}`,
  },
  {
    key: "paid",
    header: "Paid",
    cell: (row) => (
      <span className="text-green-600">₹ {row.paid.toLocaleString()}</span>
    ),
  },
  {
    key: "due",
    header: "Due",
    cell: (row) => (
      <span className="text-red-600">₹ {row.due.toLocaleString()}</span>
    ),
  },
  {
    key: "id",
    header: "Actions",
    align: "right",
    cell: (row) => (
      <div className="flex justify-end">
        <Link href={`/dashboard/fees/${row.id}`}>
          <Action icon={<Eye className="text-pink-500" />} label="View" />
        </Link>
        <Action icon={<Pencil className="text-slate-600" />} label="Edit" />
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
