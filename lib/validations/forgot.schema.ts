import z from "zod";

export const forgotPasswordSchema = z.object({
  email: z.email("Enter a valid registered email"),
});

export type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;
