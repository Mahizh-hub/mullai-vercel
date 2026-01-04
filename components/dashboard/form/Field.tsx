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

  options = [],
  value,
  onValueChange,

  ...props
}: FieldProps) {
  return (
    <div className="space-y-3">
      <Label className="text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>

      {as === "select" ? (
        <Select value={value} onValueChange={onValueChange}>
          <SelectTrigger
            className={cn(
              "w-full h-10 rounded-md border px-3 text-sm",
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
      ) : (
        <Input placeholder={placeholder} {...props} className={cn(className)} />
      )}
    </div>
  );
}
