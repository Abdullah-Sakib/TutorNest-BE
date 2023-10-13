import { z } from 'zod';

const createBlogZodValidation = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title is required',
    }),
    image: z.string({
      required_error: 'image is required',
    }),
    body: z.string({
      required_error: 'body is required',
    }),
  }),
});

const updateBlogZodValidation = z.object({
  body: z.object({
    title: z.string().optional(),
    image: z.string().optional(),
    body: z.string().optional(),
  }),
});

export const BlogValidation = {
  createBlogZodValidation,
  updateBlogZodValidation,
};
