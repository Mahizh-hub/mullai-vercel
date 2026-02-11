"use client";

import { forwardRef } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { COUNTRY_CODES } from "@/constants/locations";
import { cn } from "@/lib/utils";

type PhoneInputProps = {
  label?: string;
  required?: boolean;
  countryCode?: string;
  phoneNumber?: string;
  onCountryCodeChange?: (value: string) => void;
  onPhoneNumberChange?: (value: string) => void;
  className?: string;
  error?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">;

export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  (
    {
      label,
      required,
      countryCode = "+91",
      phoneNumber,
      onCountryCodeChange,
      onPhoneNumberChange,
      className,
      error,
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn("space-y-3", className)}>
        {label && (
          <Label className="text-gray-700">
            {label} {required && <span className="text-red-500">*</span>}
          </Label>
        )}
        <div className="relative flex items-center">
          <Select value={countryCode} onValueChange={onCountryCodeChange}>
            <SelectTrigger className="w-[120px] h-12 rounded-r-none border-r-0 bg-gray-50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {COUNTRY_CODES.map((code) => (
                <SelectItem key={code.value} value={code.value}>
                  {code.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            ref={ref}
            type="tel"
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={(e) => onPhoneNumberChange?.(e.target.value)}
            className="flex-1 rounded-l-none"
            {...props}
          />
        </div>
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

PhoneInput.displayName = "PhoneInput";
