"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";



export type DataTableColumn<T> = {
  key: keyof T;
  header: string;
  cell?: (row: T) => ReactNode;
  align?: "left" | "right" | "center";
  width?: string;
};

type Props<T> = {
  data: T[];
  columns: DataTableColumn<T>[];
  rowKeyAction: (row: T) => string | number;
  className?: string;
};

export function DataTable<T>({
  data,
  columns,
  rowKeyAction,
  className,
}: Props<T>) {
  return (
    <div className={cn("rounded-md", className)}>
      <Table className="md:min-w-full min-w-[800px]">
        <TableHeader className="bg-gray-100">
          <TableRow>
            {columns.map((col) => (
              <TableHead
                key={String(col.key)}
                style={col.width ? { width: col.width } : undefined}
                className={cn(
                  "text-gray-600 px-4 py-3",
                  col.align === "right" && "text-right",
                  col.align === "center" && "text-center",
                )}
              >
                {col.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        {/* Scrollable body */}
        <TableBody className="max-h-[calc(100vh-260px)] overflow-y-auto">
          {data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center text-muted-foreground"
              >
                No results found
              </TableCell>
            </TableRow>
          ) : (
            data.map((row) => (
              <TableRow key={rowKeyAction(row)}>
                {columns.map((col) => (
                  <TableCell
                    key={String(col.key)}
                    style={col.width ? { width: col.width } : undefined}
                    className={cn(
                      "border border-gray-100",
                      col.align === "right" && "text-right",
                      col.align === "center" && "text-center",
                    )}
                  >
                    {col.cell ? col.cell(row) : (row[col.key] as ReactNode)}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
