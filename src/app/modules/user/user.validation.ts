import { z } from 'zod';

// Define the Zod schema for creating a user
const createUserZodSchema = z.object({
  body: z.object({
    role: z.string().optional(),
    firstName: z.string({
      required_error: 'First name is required',
    }),
    lastName: z.string({
      required_error: 'Last name is required',
    }),
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email(),
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
