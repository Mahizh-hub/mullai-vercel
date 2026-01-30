import { DataTableColumn } from "../DataTable";

export type FeeHistory = {
  id: number;
  exam: string;
  date: string;
  transactionId: string;
  mode: string;
  amount: number;
  status: "Paid" | "Pending" | "Partial";
};

export const feeHistoryColumns: DataTableColumn<FeeHistory>[] = [
  { key: "exam",  header: "Exam" },
  { key: "date", header: "Date" },
  { key: "transactionId", header: "Transaction ID" },
  { key: "mode", header: "Payment Mode" },
  {
    key: "amount",
    header: "Amount",
    cell: (row) => `₹ ${row.amount.toLocaleString()}`,
  },
  {
    key: "status",
    header: "Status",
    align: "center",
    cell: (row) => (
      <span
        className={`rounded-md px-2 py-1 text-xs ${
          row.status === "Paid"
            ? "bg-green-50 text-green-600"
            : row.status === "Pending"
              ? "bg-red-50 text-red-600"
              : "bg-yellow-50 text-yellow-600"
        }`}
      >
        {row.status}
      </span>
    ),
  },
];
