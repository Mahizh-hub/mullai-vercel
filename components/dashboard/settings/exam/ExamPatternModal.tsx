"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Label } from "@/components/ui/label";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patterns: { id: string; name: string }[];
  onAdd: (name: string) => void;
  onDelete: (id: string) => void;
};

export default function ExamPatternModal({ open, onOpenChange, patterns, onAdd, onDelete }: Props) {
  const [newPatternName, setNewPatternName] = useState("");

  const handleAdd = () => {
    if (!newPatternName.trim()) return;
    onAdd(newPatternName);
    setNewPatternName("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Exam Patterns List</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">
              Exam Pattern Name <span className="text-destructive">*</span>
            </Label>
            <div className="flex-center-gap-2">
              <Input
                placeholder="Enter pattern name"
                value={newPatternName}
                onChange={(e) => setNewPatternName(e.target.value)}
                className="max-w-md h-10"
              />
              <Button onClick={handleAdd} className="bg-pink-500 hover:bg-pink-600 px-6 h-10">
                Add
              </Button>
            </div>
          </div>

          <div className="border rounded-md overflow-hidden">
             <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-700 uppercase text-xs font-semibold">
                        <tr>
                            <th className="px-4 py-3 whitespace-nowrap w-16 border-b border-gray-100">S.No</th>
                            <th className="px-4 py-3 whitespace-nowrap border-b border-gray-100">Exam Pattern Name</th>
                            <th className="px-4 py-3 whitespace-nowrap w-24 border-b border-gray-100 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patterns.length > 0 ? (
                            patterns.map((pattern, index) => (
                                <tr key={pattern.id} className="border-b last:border-0 hover:bg-gray-50/50 transition-colors">
                                    <td className="px-4 py-3 font-medium text-gray-900 border-r border-gray-100 last:border-0 border-l-0">
                                        {index + 1}
                                    </td>
                                    <td className="px-4 py-3 border-r border-gray-100 last:border-0">{pattern.name}</td>
                                    <td className="px-4 py-3 text-right">
                                        <div className="flex justify-end">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-destructive hover:text-destructive/90 hover:bg-destructive/10 rounded-full"
                                                onClick={() => onDelete(pattern.id)}
                                            >
                                                <Trash2 className="size-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={3} className="text-center py-8 text-muted-foreground">
                                    No exam patterns added yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
             </div>
          </div>
        </div>
        
        <div className="flex justify-end pt-2">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="h-10 px-6">
                Close
            </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
