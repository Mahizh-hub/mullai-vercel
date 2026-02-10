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
    <div className="card-widget">
      {/* Header */}
      <div className="mb-4 flex-center-between">
        <h5 className="font-semibold text-lg">Recent Activity Logs</h5>
        <Link href="/" className="flex-center text-sm text-gray-500">
          View All <ChevronRight />
        </Link>
      </div>

      <div className="rounded-md bg-gray-50 max-h-auto overflow-y-auto p-3 flex flex-col gap-2">
        {logs.map((log, index) => (
          <div key={index} className="flex-center-between">
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
