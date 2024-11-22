import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: 'Email address is invalid' }).min(1),
  password: z
    .string()
    .min(4, { message: 'Password must be at least 4 characters' }),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;