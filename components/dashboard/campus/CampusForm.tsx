"use client";

import { FieldError, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  campusSchema,
  CampusFormValues,
} from "@/lib/validations/campus.schema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera } from "lucide-react";
import { PasswordField } from "../form/PasswordField";

export default function CampusForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CampusFormValues>({
    resolver: zodResolver(campusSchema),
  });

  const onSubmit = (data: CampusFormValues) => {
    console.log("CREATE CAMPUS PAYLOAD", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-6 py-1">
      {/* Basic Info */}
      <section className="grid grid-cols-1 gap-4">
        <Field
          label="Campus Name"
          required
          placeholder="Enter campus name"
          error={errors.campusName}
          {...register("campusName")}
        />
        <Field
          label="Campus Admin"
          required
          placeholder="Enter campus admin name"
          error={errors.campusAdmin}
          {...register("campusAdmin")}
        />
        <Field
          label="Board"
          placeholder="e.g., State Board, CBSE, ICSE"
          required
          error={errors.board}
          {...register("board")}
        />
      </section>

      {/* Contact */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field
          label="Phone Number"
          required
          placeholder="Enter 10-digit phone number"
          error={errors.phone}
          {...register("phone")}
        />
        <Field
          label="Alternate Phone Number"
          placeholder="Enter 10-digit phone number"
          {...register("altPhone")}
        />
        <Field
          label="Email"
          type="email"
          placeholder="example@schoolname.com"
          required
          error={errors.email}
          {...register("email")}
        />
        <Field
          label="Alternate Email"
          placeholder="example@schoolname.com"
          type="email"
          {...register("altEmail")}
        />
      </section>

      {/* Auth */}
      <section className="grid grid-cols-1 mb-4 md:grid-cols-2 gap-4">
        <PasswordField
          label="Password"
          placeholder="Enter password"
          registration={register("password")}
          error={errors.password}
        />
        <PasswordField
          label="Confirm Password"
          placeholder="Confirm password"
          registration={register("confirmPassword")}
          error={errors.confirmPassword}
        />
      </section>

      {/* Address */}
      <section className="space-y-4">
        <h5 className="font-semibold">Address</h5>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field
            label="Door Number"
            required
            placeholder="e.g., No. 12 / 4B"
            error={errors.doorNumber}
            {...register("doorNumber")}
          />
          <Field
            label="Address Line 1"
            placeholder="Street name"
            {...register("addressLine1")}
          />
          <Field
            label="Address Line 2"
            placeholder="Area / Locality"
            required
            error={errors.addressLine2}
            {...register("addressLine2")}
          />
          <Field
            label="Landmark"
            placeholder="Nearby landmark (optional)"
            {...register("landmark")}
          />
          <Field
            label="City"
            required
            placeholder="Select"
            error={errors.city}
            {...register("city")}
          />
          <Field
            label="State / Province"
            placeholder="Select"
            {...register("state")}
          />
          <Field
            label="PIN Code"
            required
            placeholder="Enter PIN code"
            error={errors.pinCode}
            {...register("pinCode")}
          />
          <Field
            label="Country"
            placeholder="Select"
            {...register("country")}
          />
        </div>
      </section>

      {/* Logo Upload */}
      <section className="space-y-4">
        <Label>Branch Logo</Label>
        <div className="rounded-lg flex flex-col items-center border px-6 py-12 text-center text-sm text-muted-foreground">
          <div className="size-8 flex items-center justify-center bg-gray-100 rounded-md">
            <Camera />
          </div>
          <p className="text-base mt-3">
            Drag & drop an image or{" "}
            <label className="text-pink-500 underline cursor-pointer">
              Browse
              <input type="file" className="hidden" {...register("logo")} />
            </label>
          </p>
        </div>
      </section>

      {/* Actions */}
      <div className="flex justify-end gap-3 py-4">
        <Button type="button" className="bg-red-600 text-white" variant="ghost">
          Cancel
        </Button>
        <Button type="submit">Create Campus</Button>
      </div>
    </form>
  );
}

/* ---------- reusable input ---------- */

function Field({
  label,
  required,
  error,
  ...props
}: {
  label: string;
  required?: boolean;
  error?: FieldError;
} & React.ComponentProps<typeof Input>) {
  return (
    <div className="space-y-3">
      <Label className="flex items-center gap-1 text-gray-700">
        {label}
        {required && <span className="text-destructive">*</span>}
      </Label>
      <div className="flex flex-col gap-1">
        <Input {...props} className="py-6" />
        {error && (
          <p className="text-xs ml-1 text-destructive">{error.message}</p>
        )}
      </div>
    </div>
  );
}
