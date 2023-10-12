import { z } from 'zod';
import { roles } from './user.constants';

// Define the Zod schema for creating a user
const createUserZodSchema = z.object({
  body: z.object({
    first_name: z.string({
      required_error: 'First name is required',
    }),
    last_name: z.string({
      required_error: 'Last name is required',
    }),
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email(),
    password: z.string({
      required_error: 'Password is required',
    }),
    role: z.enum([...roles] as [string, ...string[]]).optional(),
  }),
});

const updateUserZodSchema = z.object({
  body: z.object({
    role: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.string().email().optional(),
    profileImage: z.string().optional(),
  }),
});

export const UserValidation = {
  createUserZodSchema,
  updateUserZodSchema,
};
