import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Invalid Password"),
});

export type LoginFormValues = z.infer<typeof LoginSchema>;
