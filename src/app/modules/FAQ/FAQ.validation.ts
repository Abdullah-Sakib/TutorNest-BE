import { z } from 'zod';

const createFAQZodValidation = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title is required',
    }),
    body: z.string({
      required_error: 'body is required',
    }),
  }),
});

const updateFAQZodValidation = z.object({
  body: z.object({
    title: z.string().optional(),
    body: z.string().optional(),
  }),
});

export const FAQValidation = {
  createFAQZodValidation,
  updateFAQZodValidation,
};
