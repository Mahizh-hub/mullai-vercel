"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { FeePattern } from "../types";

type Props = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  pattern: FeePattern | null;
  onDeleteComponent?: (index: number) => void;
};

export default function FeePatternListModal({
  isOpen,
  onOpenChange,
  pattern,
  onDeleteComponent,
}: Props) {
  if (!pattern) return null;

  const total = pattern.components.reduce(
    (sum, comp) => sum + (Number(comp.amount) || 0),
    0
  );

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{pattern.name || "Fee Pattern"} List</DialogTitle>
        </DialogHeader>

        <div className="border rounded-md overflow-hidden mt-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-700 uppercase">
                <tr>
                  <th className="px-4 py-3 whitespace-nowrap w-16">S.No</th>
                  <th className="px-4 py-3 whitespace-nowrap">Fee Component</th>
                  <th className="px-4 py-3 whitespace-nowrap">Amount</th>
                  <th className="px-4 py-3 whitespace-nowrap w-24 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {pattern.components.length > 0 ? (
                  pattern.components.map((comp, index) => (
                    <tr key={comp.id || index} className="border-t">
                      <td className="px-4 py-3 font-medium text-gray-900">
                        {index + 1}
                      </td>
                      <td className="px-4 py-3">{comp.name || "-"}</td>
                      <td className="px-4 py-3 font-medium">
                        {comp.amount || 0}
                      </td>
                      <td className="px-4 py-3 text-right">
                        {onDeleteComponent && (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                                onClick={() => onDeleteComponent(index)}
                            >
                                <Trash2 className="size-4" />
                            </Button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-4 py-8 text-center text-gray-500"
                    >
                      No components added yet.
                    </td>
                  </tr>
                )}
                {/* Total Row */}
                <tr className="border-t bg-gray-50 font-bold">
                  <td colSpan={2} className="px-4 py-3 text-right">
                    Total
                  </td>
                  <td className="px-4 py-3">{total}</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
