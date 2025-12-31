import { z } from "zod";

export const employeeSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  dob: z.string(),
  gender: z.string(),
  bloodGroup: z.string(),
  idProof: z.string(),
  idNumber: z.string(),
  photo: z.instanceof(File).optional(),

  address: z.object({
    door: z.string(),
    line1: z.string().optional(),
    line2: z.string(),
    landmark: z.string().optional(),
    city: z.string(),
    state: z.string().optional(),
    pin: z.string(),
    country: z.string().optional(),
  }),

  emergencyContacts: z.array(
    z.object({
      name: z.string(),
      relation: z.string(),
      phone: z.string(),
    }),
  ),

  designation: z.string(),
  employeeId: z.string(),
  joiningDate: z.string(),
  leavingDate: z.string().optional(),
  roles: z.array(z.string()),
  education: z.array(
    z.object({
      degree: z.string(),
      course: z.string(),
      institution: z.string(),
      year: z.string(),
    }),
  ),
});

export type EmployeeFormValues = z.infer<typeof employeeSchema>;
