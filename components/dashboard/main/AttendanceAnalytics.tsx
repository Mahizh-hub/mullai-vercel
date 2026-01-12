"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

// ApexCharts (SSR-safe)
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const FILTER_OPTIONS = [
  "This Day",
  "This Week",
  "This Month",
  "This Year",
] as const;

export default function AttendanceAnalytics() {
  const [selectedOption, setSelectedOption] =
    useState<(typeof FILTER_OPTIONS)[number]>("This Year");
  const [isChartLoaded, setChartLoaded] = useState(false);

  useEffect(() => {
    setChartLoaded(true);
  }, []);

  /* ---------------- Chart Data ---------------- */
  const series = [
    {
      name: "Teachers",
      data: [500, 600, 250, 600, 200, 500, 600, 120, 250, 500, 200, 250],
    },
    {
      name: "Boys",
      data: [200, 300, 200, 400, 200, 250, 350, 120, 250, 300, 120, 200],
    },
    {
      name: "Girls",
      data: [150, 250, 200, 300, 300, 150, 200, 300, 200, 250, 400, 200],
    },
  ];

  const options: ApexOptions = {
    chart: {
      stacked: true,
      toolbar: { show: false },
      zoom: { enabled: true },
    },
    plotOptions: {
      bar: {
        borderRadius: 7,
        columnWidth: "15px",
        borderRadiusApplication: "end",
      },
    },
    dataLabels: { enabled: false },
    colors: ["#605DFF", "#9CAAFF", "#DDE4FF"],
    grid: {
      strokeDashArray: 7,
      borderColor: "#ECEEF2",
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      axisTicks: { show: false },
      axisBorder: { show: true, color: "#D5D9E2" },
      labels: {
        style: { colors: "#8695AA", fontSize: "12px" },
      },
    },
    yaxis: {
      min: 0,
      axisTicks: { show: false },
      axisBorder: { show: true, color: "#D5D9E2" },
      labels: {
        style: { colors: "#64748B", fontSize: "12px" },
      },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
      fontSize: "12px",
      markers: {
        size: 6,
        shape: "square",
      },
    },
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="card-widget">
      {/* Header */}
      <div className="mb-5 flex-center-between">
        <h5 className="font-semibold text-lg">Attendance Analytics</h5>

        <DropdownMenu>
          <DropdownMenuTrigger className="rounded-full" asChild>
            <Button
              variant="outline"
              size="sm"
              className="flex-center text-sm gap-2"
            >
              {selectedOption}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-44">
            {FILTER_OPTIONS.map((option) => (
              <DropdownMenuItem
                key={option}
                onClick={() => setSelectedOption(option)}
                className={option === selectedOption ? "font-semibold" : ""}
              >
                {option}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Chart */}
      {isChartLoaded && (
        <Chart
          options={options}
          series={series}
          type="bar"
          height={396.5}
          width="100%"
        />
      )}
    </div>
  );
}
