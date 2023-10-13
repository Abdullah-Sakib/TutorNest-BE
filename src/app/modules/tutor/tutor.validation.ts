import { z } from 'zod';
import { categories } from './tutor.constants';

const createTutorZodValidation = z.object({
  body: z.object({
    name: z.string({
      required_error: 'name is required',
    }),
    image: z.string({
      required_error: 'image is required',
    }),
    phone: z.string({
      required_error: 'phone is required',
    }),
    email: z.string({
      required_error: 'email is required',
    }),
    education: z.string({
      required_error: 'education is required',
    }),
    experience: z.number({
      required_error: 'experience is required',
    }),
    location: z.string({
      required_error: 'location is required',
    }),
    description: z.string({
      required_error: 'description is required',
    }),
    fee: z.number({
      required_error: 'fee is required',
    }),
    subjects: z.array(
      z.string({
        required_error: 'subjects are required',
      })
    ),
    available_slots: z.array(
      z.string({
        required_error: 'available_slots are required',
      })
    ),
    category: z.enum([...categories] as [string, ...string[]], {
      required_error: 'category is required',
    }),
  }),
});

const updateTutorZodValidation = z.object({
  body: z.object({
    name: z.string().optional(),
    image: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().optional(),
    education: z.string().optional(),
    experience: z.number().optional(),
    location: z.string().optional(),
    description: z.string().optional(),
    fee: z.number().optional(),
    subjects: z.array(z.string()).optional(),
    available_slots: z.array(z.string()).optional(),
    category: z.enum([...categories] as [string, ...string[]]).optional(),
  }),
});

export const TutorValidation = {
  createTutorZodValidation,
  updateTutorZodValidation,
};
