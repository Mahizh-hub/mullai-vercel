"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Calendar } from "lucide-react";

type SelectOption = {
  label: string;
  value: string;
};

type FieldProps = {
  label: string;
  placeholder?: string;
  required?: boolean;
  as?: "input" | "select";
  className?: string;

  /* Select-only props */
  options?: SelectOption[];
  value?: string;
  onValueChange?: (value: string) => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

export function Field({
  label,
  required,
  placeholder,
  as = "input",
  className,
  type,

  options = [],
  value,
  onValueChange,

  ...props
}: FieldProps) {
  const isDateInput = type === "date";

  return (
    <div className="space-y-3">
      <Label className="text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>

      {as === "select" ? (
        <Select value={value} onValueChange={onValueChange}>
          <SelectTrigger
            className={cn(
              "w-full h-12 rounded-md border px-3 text-sm",
              className,
            )}
          >
            <SelectValue placeholder={placeholder ?? "Select"} />
          </SelectTrigger>

          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : isDateInput ? (
        <div className="relative">
          <Input
            type="date"
            placeholder={placeholder || "dd/mm/yyyy"}
            className={cn("pr-10", className)}
            {...props}
          />
          <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
        </div>
      ) : (
        <Input placeholder={placeholder} type={type} {...props} className={cn(className)} />
      )}
    </div>
  );
}
