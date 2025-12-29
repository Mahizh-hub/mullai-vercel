import { z } from "zod";

export const campusSchema = z
  .object({
    campusName: z.string().min(1, "Campus name is required"),
    campusAdmin: z.string().min(1, "Campus admin is required"),
    board: z.string().min(1, "Board is required"),

    phone: z.string().length(10, "Phone number must be 10 digits"),
    altPhone: z.string().optional(),

    email: z.string().email("Invalid email"),
    altEmail: z.string().optional(),

    password: z.string().min(8, "Minimum 8 characters"),
    confirmPassword: z.string(),

    doorNumber: z.string().min(1, "Door number is required"),
    addressLine1: z.string().optional(),
    addressLine2: z.string().min(1, "Address line 2 is required"),
    landmark: z.string().optional(),
    city: z.string().min(1, "City is required"),
    state: z.string().optional(),
    pinCode: z.string().min(5, "PIN code required"),
    country: z.string().optional(),

    logo: z.any().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type CampusFormValues = z.infer<typeof campusSchema>;
