"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

type PasswordFieldProps = {
  label: string;
  placeholder?: string;
  error?: FieldError;
  registration?: UseFormRegisterReturn;
};

export function PasswordField({
  label,
  placeholder,
  registration,
  error,
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="space-y-4">
      <Label>
        {label} <span className="text-destructive">*</span>
      </Label>

      <div className="relative">
        <Input
          type={visible ? "text" : "password"}
          placeholder={placeholder}
          className={cn("pr-10", error && "border-destructive")}
          {...registration}
        />

        <button
          type="button"
          aria-label={visible ? "Hide password" : "Show password"}
          onClick={() => setVisible((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        >
          {visible ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>

      {error && <p className="text-xs text-destructive">{error.message}</p>}
    </div>
  );
}
