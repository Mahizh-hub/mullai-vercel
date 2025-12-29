import z from "zod";

export const otpSchema = z.object({
  otp: z.string().regex(/^\d{4}$/, "Invalid OTP"),
});
