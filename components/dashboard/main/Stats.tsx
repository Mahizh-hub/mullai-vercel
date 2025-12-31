"use client";

import { cn } from "@/lib/utils";
import { MoveDownRight, MoveUpRight } from "lucide-react";
import Image from "next/image";

type StatItem = {
  label: string;
  value: string;
  icon: string;
  trend?: string;
  trendLabel?: string;
  trendUp?: boolean;
};

const stats: StatItem[] = [
  {
    label: "Campus Admin",
    value: "8 / 10",
    icon: "/icons/graduation.svg",
    trend: "+10%",
    trendLabel: "availability this month",
    trendUp: true,
  },
  {
    label: "Class Sections",
    value: "212",
    icon: "/icons/student.svg",
    trend: "+6%",
    trendLabel: "added this academic year",
    trendUp: true,
  },
  {
    label: "Teachers Present",
    value: "128 / 130",
    icon: "/icons/teacher.svg",
    trend: "-3%",
    trendLabel: "better than yesterday",
    trendUp: false,
  },
  {
    label: "Other Staff Present",
    value: "88 / 90",
    icon: "/icons/teacher.svg",
    trend: "+5%",
    trendLabel: "attendance improvement",
    trendUp: true,
  },
  {
    label: "Students Present",
    value: "1281 / 1300",
    icon: "/icons/boys.svg",
    trend: "+4%",
    trendLabel: "compared to last week",
    trendUp: true,
  },
  {
    label: "Fee Collection",
    value: "₹86,000 / ₹1,00,000",
    icon: "/icons/graduation.svg",
    trend: "+12%",
    trendLabel: "collection growth",
    trendUp: true,
  },
  {
    label: "New Admissions",
    value: "188",
    icon: "/icons/student.svg",
    trend: "+9%",
    trendLabel: "enquiry conversion rate",
    trendUp: true,
  },
  {
    label: "Teacher Student Ratio",
    value: "1:23",
    icon: "/icons/girls.svg",
  },
];

const COLS = 4;

export default function Stats() {
  return (
    <div className="px-5 md:px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-2">
        {stats.map((item, index) => {
          const isRowStart = index % COLS === 0;
          const isRowEnd = (index + 1) % COLS === 0;

          return (
            <div
              key={item.label}
              className={cn(
                "bg-white border border-gray-200 px-6 py-3 relative",
                "flex flex-col justify-between",

                // rounded only at row edges (desktop)
                isRowStart && "lg:rounded-l-lg",
                isRowEnd && "lg:rounded-r-lg",

                // divider line between cards
                !isRowEnd &&
                  "after:absolute after:top-0 after:right-0 after:h-full after:w-[0.1px] after:bg-gray-50",
              )}
            >
              {/* Top */}
              <div className="flex items-center gap-4">
                <Image
                  src={item.icon}
                  alt={item.label}
                  width={42}
                  height={42}
                />
                <div>
                  <span className="block text-sm text-gray-600">
                    {item.label}
                  </span>
                  <h5 className="mt-1 text-xl font-semibold text-gray-900">
                    {item.value}
                  </h5>
                </div>
              </div>

              {/* Trend */}
              {item.trend && (
                <div className="mt-4 flex items-center gap-2 text-sm">
                  <span
                    className={cn(
                      "flex size-6 items-center justify-center rounded-lg",
                      item.trendUp
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700",
                    )}
                  >
                    {item.trendUp ? (
                      <MoveUpRight className="size-4" />
                    ) : (
                      <MoveDownRight className="size-4" />
                    )}
                  </span>
                  <span className="text-gray-600">
                    <span className="font-medium">{item.trend}</span>{" "}
                    {item.trendLabel}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
