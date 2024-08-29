import { Roles } from "@/enums";
import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().min(1, "Email is required").email(),
  password: z.string().min(1, "Password is required"),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;

export const RegisterSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().min(1, "Email is required").email(),
  password: z.string().min(1, "Password is required"),
  role: z.enum([Roles.SELLER]).default(Roles.SELLER).optional(),
});

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
