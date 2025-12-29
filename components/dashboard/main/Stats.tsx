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

// export default function Stats() {
//   return (
//     <div className="relative rounded-md px-5 md:px-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-4">
//         {stats.map((item) => (
//           <div
//             key={item.label}
//             className="relative first:rounded-l-lg last:rounded-r-lg border bg-white p-6"
//           >
//             <div className="flex items-center gap-4">
//               <Image
//                 src={item.icon}
//                 alt={item.label}
//                 width={42}
//                 height={42}
//                 priority
//               />
//               <div>
//                 <span className="block text-sm text-gray-600">
//                   {item.label}
//                 </span>
//                 <h5 className="mt-1 text-xl font-semibold text-gray-900">
//                   {item.value}
//                 </h5>
//               </div>
//             </div>

//             {item.trend && (
//               <div className="mt-3 flex items-center gap-2">
//                 <div
//                   className={`flex size-6 rounded-lg items-center justify-center text-sm
//                 ${
//                   item.trendUp
//                     ? "bg-green-100 text-green-700"
//                     : "bg-red-100 text-red-700"
//                 }
//                 `}
//                 >
//                   {item.trendUp ? (
//                     <MoveUpRight className="size-4" />
//                   ) : (
//                     <MoveDownRight className="size-4" />
//                   )}
//                 </div>
//                 <div className="text-sm text-gray-600">
//                   <span className="font-medium text-gray-700">
//                     {item.trend}
//                   </span>{" "}
//                   {item.trendLabel}
//                 </div>
//               </div>
//             )}
//             {/*
//             {index < stats.length - 1 && (
//               <div className="absolute right-0 top-0 h-full w-px bg-gray-100 sm:block" />
//             )}*/}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
// export default function Stats() {
//   const rows = chunk(stats, 4);

//   return (
//     <div className="relative px-5 md:px-6 space-y-4">
//       {rows.map((row, rowIndex) => (
//         <div
//           key={rowIndex}
//           className="flex bg-white border border-gray-50 rounded-lg overflow-hidden"
//         >
//           {row.map((item, index) => {
//             const isFirst = index === 0;
//             const isLast = index === row.length - 1;

//             return (
//               <div
//                 key={item.label}
//                 className={cn(
//                   "flex-1 p-6 relative",
//                   isFirst && "rounded-l-lg",
//                   isLast && "rounded-r-lg",
//                 )}
//               >
//                 {/* CONTENT */}
//                 <div className="flex items-center gap-4">
//                   <Image
//                     src={item.icon}
//                     alt={item.label}
//                     width={42}
//                     height={42}
//                     priority
//                   />
//                   <div>
//                     <span className="block text-sm text-gray-600">
//                       {item.label}
//                     </span>
//                     <h5 className="mt-1 text-xl font-semibold text-gray-900">
//                       {item.value}
//                     </h5>
//                   </div>
//                 </div>

//                 {item.trend && (
//                   <div className="mt-3 flex items-center gap-2">
//                     <div
//                       className={cn(
//                         "flex size-6 items-center justify-center rounded-lg",
//                         item.trendUp
//                           ? "bg-green-100 text-green-700"
//                           : "bg-red-100 text-red-700",
//                       )}
//                     >
//                       {item.trendUp ? (
//                         <MoveUpRight className="size-4" />
//                       ) : (
//                         <MoveDownRight className="size-4" />
//                       )}
//                     </div>
//                     <div className="text-sm text-gray-600">
//                       <span className="font-medium text-gray-700">
//                         {item.trend}
//                       </span>{" "}
//                       {item.trendLabel}
//                     </div>
//                   </div>
//                 )}

//                 {/* VERTICAL DIVIDER */}
//                 {!isLast && (
//                   <div className="absolute right-0 top-0 h-full w-px bg-gray-100" />
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       ))}
//     </div>
//   );
// }

// function chunk<T>(array: T[], size: number): T[][] {
//   const result: T[][] = [];
//   for (let i = 0; i < array.length; i += size) {
//     result.push(array.slice(i, i + size));
//   }
//   return result;
// }

// const COLS_DESKTOP = 4;

// export default function Stats() {
//   return (
//     <div className="px-5 md:px-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border rounded-lg overflow-hidden bg-white gap-y-3">
//         {stats.map((item, index) => {
//           const isStart = index % COLS_DESKTOP === 0;
//           const isEnd = (index + 1) % COLS_DESKTOP === 0;

//           return (
//             <div
//               key={item.label}
//               className={cn(
//                 "p-6 bg-white relative",
//                 "border-b lg:border-b-0",
//                 "border-r lg:last:border-r-0",
//                 isStart && "lg:rounded-l-lg",
//                 isEnd && "lg:rounded-r-lg",
//                 // divider
//                 "after:absolute after:top-0 after:right-0 after:h-full after:w-px after:bg-gray-100 lg:after:block",
//                 isEnd && "after:hidden",
//               )}
//             >
//               {/* content */}
//               <div className="flex items-center gap-4">
//                 <Image
//                   src={item.icon}
//                   alt={item.label}
//                   width={42}
//                   height={42}
//                 />
//                 <div>
//                   <span className="text-sm text-gray-600">{item.label}</span>
//                   <h5 className="mt-1 text-xl font-semibold">{item.value}</h5>
//                 </div>
//               </div>

//               {item.trend && (
//                 <div className="mt-3 flex items-center gap-2 text-sm">
//                   <span
//                     className={cn(
//                       "flex size-6 items-center justify-center rounded-lg",
//                       item.trendUp
//                         ? "bg-green-100 text-green-700"
//                         : "bg-red-100 text-red-700",
//                     )}
//                   >
//                     {item.trendUp ? (
//                       <MoveUpRight className="size-4" />
//                     ) : (
//                       <MoveDownRight className="size-4" />
//                     )}
//                   </span>
//                   <span className="text-gray-600">
//                     <span className="font-medium">{item.trend}</span>{" "}
//                     {item.trendLabel}
//                   </span>
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

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
