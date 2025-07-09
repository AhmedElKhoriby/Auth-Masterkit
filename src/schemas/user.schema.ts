import type { Request } from 'express';
import { z } from 'zod';

// User registration schema
export const createUserSchema = z.object({
  body: z
    .object({
      email: z
        .string({ required_error: 'Email is required' })
        .email('Invalid email format')
        .trim(),
      firstName: z
        .string({ required_error: 'First name is required' })
        .min(1, 'First name is required')
        .max(50, 'First name must be less than 50 characters')
        .trim(),
      lastName: z
        .string({ required_error: 'Last name is required' })
        .min(1, 'Last name is required')
        .max(50, 'Last name must be less than 50 characters')
        .trim(),
      password: z
        .string({ required_error: 'Password is required' })
        .min(6, 'Password must be at least 6 characters long')
        .max(100, 'Password must be less than 100 characters'),
      passwordConfirmation: z.string({
        required_error: 'Password confirmation is required',
      }),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      message: 'Passwords do not match',
      path: ['passwordConfirmation'],
    }),
});

// Type inference
export type CreateUserInput = z.infer<typeof createUserSchema>['body'];
export interface ICreateUserRequest extends Request {
  body: CreateUserInput;
}
