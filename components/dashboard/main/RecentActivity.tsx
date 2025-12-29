import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

type Activity = {
  value: string;
  label: string;
};

const logs: Activity[] = [
  { value: "New Admissions", label: "2" },
  { value: "Leave Requests (Teachers)", label: "5" },
  { value: "Leave Requests (Other Staff)", label: "5" },
  { value: "Fee Paid", label: "Rs. 20000" },
  { value: "Fee Paid", label: "Rs. 20000" },
  { value: "Fee Paid", label: "Rs. 20000" },
  { value: "Fee Paid", label: "Rs. 20000" },
];

export default function RecentActivity() {
  return (
    <div className="rounded-md bg-white border border-gray-200 p-5 md:p-6">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h5 className="font-semibold text-lg">Recent Activity Logs</h5>
        <Link href="/" className="flex text-sm items-center text-gray-500">
          View All <ChevronRight />
        </Link>
      </div>

      <div className="rounded-md bg-gray-50 max-h-auto overflow-y-auto p-3 flex flex-col gap-2">
        {logs.map((log, index) => (
          <div key={index} className="flex items-center justify-between">
            <p className="text-sm">{log.value}</p>
            <Badge className="border border-pink-500 bg-pink-50 text-pink-600">
              {log.label}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
}
