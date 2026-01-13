"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ExamRow } from "@/lib/exam";
import { Trash2, Calendar } from "lucide-react";

export default function ExamRowItem({
  row,
  onChangeAction,
  onAddAction,
  onRemoveAction,
  canDelete,
}: {
  row: ExamRow;
  onChangeAction: (id: string, patch: Partial<ExamRow>) => void;
  onAddAction: () => void;
  onRemoveAction: (id: string) => void;
  canDelete: boolean;
}) {
  const handleDateChange = (value: string) => {
    const day = value
      ? new Date(value).toLocaleDateString("en-US", { weekday: "long" })
      : "";
    onChangeAction(row.id, { date: value, day });
  };

  return (
    <tr className="border-b last:border-b-0 text-xs">
      <td className="px-3 py-2">
        <div className="relative">
          <Input
            type="date"
            placeholder="Select date"
            value={row.date}
            onChange={(e) => handleDateChange(e.target.value)}
            className="h-8 text-sm"
          />
        </div>
      </td>

      <td className="px-3 py-2 font-semibold">{row.day}</td>

      <td className="px-3 py-2">
        <Input
          type="time"
          placeholder="Start time"
          value={row.startTime}
          onChange={(e) =>
            onChangeAction(row.id, { startTime: e.target.value })
          }
          className="h-8 text-sm"
        />
      </td>

      <td className="px-3 py-2">
        <Input
          type="time"
          placeholder="End time"
          value={row.endTime}
          onChange={(e) => onChangeAction(row.id, { endTime: e.target.value })}
          className="h-8 text-sm"
        />
      </td>

      <td className="px-3 py-2">
        <Select
          value={row.session}
          onValueChange={(v) =>
            onChangeAction(row.id, { session: v as ExamRow["session"] })
          }
        >
          <SelectTrigger size="sm" className="h-8 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Morning">Morning</SelectItem>
            <SelectItem value="Afternoon">Afternoon</SelectItem>
            <SelectItem value="Evening">Evening</SelectItem>
          </SelectContent>
        </Select>
      </td>

      <td className="px-3 py-2">
        <Select
          value={row.subject}
          onValueChange={(v) => onChangeAction(row.id, { subject: v })}
        >
          <SelectTrigger size="sm" className="h-8 text-sm">
            <SelectValue placeholder="Subject" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Mathematics">Mathematics</SelectItem>
            <SelectItem value="Physics">Physics</SelectItem>
            <SelectItem value="Chemistry">Chemistry</SelectItem>
            <SelectItem value="Commerce">Commerce</SelectItem>
          </SelectContent>
        </Select>
      </td>

      <td className="px-3 py-2">
        <Select
          value={row.markingType}
          onValueChange={(v) =>
            onChangeAction(row.id, { markingType: v as ExamRow["markingType"] })
          }
        >
          <SelectTrigger size="sm" className="h-8 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Marks">Marks</SelectItem>
            <SelectItem value="Grade">Grade</SelectItem>
          </SelectContent>
        </Select>
      </td>

      <td className="px-3 py-2">
        <Input
          type="number"
          placeholder="100"
          value={row.total}
          onChange={(e) => onChangeAction(row.id, { total: e.target.value })}
          className="h-8 text-sm"
        />
      </td>

      <td className="px-3 py-2">
        <Input
          type="number"
          placeholder="50"
          value={row.passPercentage}
          onChange={(e) =>
            onChangeAction(row.id, { passPercentage: e.target.value })
          }
          className="h-8 text-sm"
        />
      </td>

      <td className="px-3 py-2 text-right">
        <div className="flex justify-end gap-2">
          {canDelete && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onRemoveAction(row.id)}
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          )}
          <Button
            size="sm"
            className="bg-pink-500 text-white text-sm"
            onClick={onAddAction}
          >
            + Add
          </Button>
        </div>
      </td>
    </tr>
  );
}
