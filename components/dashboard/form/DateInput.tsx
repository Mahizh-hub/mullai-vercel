"use client";

import { forwardRef } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

type DateInputProps = {
  label?: string;
  required?: boolean;
  className?: string;
  error?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">;

export const DateInput = forwardRef<HTMLInputElement, DateInputProps>(
  ({ label, required, className, error, ...props }, ref) => {
    return (
      <div className={cn("space-y-3", className)}>
        {label && (
          <Label className="text-gray-700">
            {label} {required && <span className="text-red-500">*</span>}
          </Label>
        )}
        <div className="relative">
          <Input
            ref={ref}
            type="date"
            placeholder="dd/mm/yyyy"
            className="pr-10"
            {...props}
          />
          <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
        </div>
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

DateInput.displayName = "DateInput";
