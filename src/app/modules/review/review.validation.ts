import { z } from 'zod';

const createReviewZodValidation = z.object({
  body: z.object({
    tutorId: z.string({
      required_error: 'tutorId is required',
    }),
    name: z.string({
      required_error: 'name is required',
    }),
    email: z.string({
      required_error: 'email is required',
    }),
    rating: z.number({
      required_error: 'rating is required',
    }),
    review: z.string({
      required_error: 'review is required',
    }),
  }),
});

const updateReviewZodValidation = z.object({
  body: z.object({
    tutorId: z.string().optional(),
    name: z.string().optional(),
    email: z.string().optional(),
    rating: z.number().optional(),
    review: z.string().optional(),
  }),
});

export const ReviewValidation = {
  createReviewZodValidation,
  updateReviewZodValidation,
};
