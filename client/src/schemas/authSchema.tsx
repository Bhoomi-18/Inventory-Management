import { z } from 'zod';

export const signupSchema = z
  .object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
    email: z.string().email({ message: 'Enter a valid email address.' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters.' })
      .regex(/[a-z]/, { message: 'Password must include at least one lowercase letter.' })
      .regex(/[A-Z]/, { message: 'Password must include at least one uppercase letter.' })
      .regex(/[0-9]/, { message: 'Password must include at least one digit.' })
      .regex(/[^A-Za-z0-9]/, { message: 'Password must include at least one symbol.' }),
    confirmPassword: z.string().min(8, {
      message: 'Confirm password must be at least 8 characters.',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  });

export const loginSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});