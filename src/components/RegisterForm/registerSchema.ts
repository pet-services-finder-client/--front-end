import { z } from "zod";

export const registerSchema = z
  .object({
    full_name: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Min 6 characters"),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;
