import { z } from 'zod';

export const signupSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Enter a valid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});

export const loginSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});