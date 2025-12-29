"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldErrors, UseFormRegister } from "react-hook-form";

type Props<T> = {
  register: UseFormRegister<T>;
  errors?: FieldErrors<T>;
};

export function AddressForm<T>({ register, errors }: Props<T>) {
  return (
    <section className="space-y-4">
      <h5 className="font-semibold">Address</h5>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field
          label="Door Number"
          required
          {...register("doorNumber" as any)}
          error={errors?.doorNumber}
        />
        <Field label="Address Line 1" {...register("addressLine1" as any)} />
        <Field
          label="Address Line 2"
          required
          {...register("addressLine2" as any)}
          error={errors?.addressLine2}
        />
        <Field label="Landmark" {...register("landmark" as any)} />
        <Field
          label="City"
          required
          {...register("city" as any)}
          error={errors?.city}
        />
        <Field label="State / Province" {...register("state" as any)} />
        <Field
          label="PIN Code"
          required
          {...register("pinCode" as any)}
          error={errors?.pinCode}
        />
        <Field label="Country" {...register("country" as any)} />
      </div>
    </section>
  );
}

function Field({
  label,
  required,
  error,
  ...props
}: {
  label: string;
  required?: boolean;
  error?: any;
} & React.ComponentProps<typeof Input>) {
  return (
    <div className="space-y-1">
      <Label>
        {label} {required && <span className="text-destructive">*</span>}
      </Label>
      <Input {...props} />
      {error && <p className="text-xs text-destructive">{error.message}</p>}
    </div>
  );
}
