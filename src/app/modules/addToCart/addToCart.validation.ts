import { z } from 'zod';

const createAndDeleteAddToCartZodValidation = z.object({
  body: z.object({
    tutorId: z.string({
      required_error: 'TutorId required',
    }),
  }),
});

export const AddToCartValidation = {
  createAndDeleteAddToCartZodValidation,
};
