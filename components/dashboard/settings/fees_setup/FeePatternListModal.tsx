"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

type Props = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  feeTypes: string[];
  onDelete: (type: string) => void;
};

export default function FeePatternListModal({
  isOpen,
  onOpenChange,
  feeTypes,
  onDelete,
}: Props) {
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-5xl">
        <DialogHeader>
          <DialogTitle>Fee Types List</DialogTitle>
        </DialogHeader>

        <div className="border rounded-md overflow-hidden mt-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-700 uppercase">
                <tr>
                  <th className="px-4 py-3 whitespace-nowrap w-16 border border-gray-100">S.No</th>
                  <th className="px-4 py-3 whitespace-nowrap border border-gray-100">Fee Type Name</th>
                  <th className="px-4 py-3 whitespace-nowrap w-24 border border-gray-100 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {feeTypes.length > 0 ? (
                  feeTypes.map((type, index) => (
                    <tr key={type} className="border-t">
                      <td className="px-4 py-3 font-medium text-gray-900 border border-gray-100">
                        {index + 1}
                      </td>
                      <td className="px-4 py-3 border border-gray-100">{type}</td>
                      <td className="px-4 py-3 border border-gray-100 text-right">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                            onClick={() => onDelete(type)}
                        >
                            <Trash2 className="size-4" />
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-4 py-8 text-center text-gray-500 border border-gray-100"
                    >
                      No fee types added yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
