import { z } from 'zod';

const createFeedbackZodValidation = z.object({
  body: z.object({
    name: z.string(),
    email: z.string(),
    message: z.string(),
  }),
});

const updateFeedbackZodValidation = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    message: z.string().optional(),
    approved: z.boolean().optional(),
  }),
});

export const FeedbackValidation = {
  createFeedbackZodValidation,
  updateFeedbackZodValidation,
};
