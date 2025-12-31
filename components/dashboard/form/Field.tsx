import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type FieldProps = {
  label: string;
  placeholder?: string;
  required?: boolean;
  as?: "input" | "select";
  children?: ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement> &
  React.SelectHTMLAttributes<HTMLSelectElement>;

export function Field({
  label,
  required,
  placeholder,
  as = "input",
  children,
  className,
  ...props
}: FieldProps) {
  return (
    <div className="space-y-3">
      <Label className="text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>

      {as === "select" ? (
        <select
          className={cn(
            "w-full rounded-md h-10 border px-3 py-2 text-sm",
            className,
          )}
          {...props}
        >
          {children}
        </select>
      ) : (
        <Input
          placeholder={placeholder}
          {...props}
          className={cn("h-10", className)}
        />
      )}
    </div>
  );
}
