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

type CellValue = ReactNode;

export type DataTableColumn<T> = {
  key: keyof T;
  header: string;
  cell?: (row: T) => ReactNode;
  align?: "left" | "right" | "center";
};

type Props<T extends Record<string, CellValue>> = {
  data: T[];
  columns: DataTableColumn<T>[];
  rowKeyAction: (row: T) => string | number;
  className?: string;
};

export function DataTable<T extends Record<string, CellValue>>({
  data,
  columns,
  rowKeyAction,
  className,
}: Props<T>) {
  return (
    <div className={cn("rounded-md mt-4", className)}>
      <Table>
        <TableHeader className="bg-gray-100">
          <TableRow>
            {columns.map((col) => (
              <TableHead
                key={String(col.key)}
                className={
                  col.align === "right"
                    ? "text-right text-gray-600"
                    : col.align === "center"
                      ? "text-center text-gray-600"
                      : " text-gray-600"
                }
              >
                {col.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
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
                    className={
                      col.align === "right"
                        ? "text-right"
                        : col.align === "center"
                          ? "text-center"
                          : ""
                    }
                  >
                    {col.cell ? col.cell(row) : row[col.key]}
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
