import { z } from 'zod';
import { types } from './notification.constants';

const createNotificationZodValidation = z.object({
  body: z.object({
    userId: z.string({
      required_error: 'userId is required',
    }),
    title: z.string({
      required_error: 'title is required',
    }),
    body: z.string({
      required_error: 'body is required',
    }),
    type: z.enum([...types] as [string, ...string[]], {
      required_error: 'type is required',
    }),
  }),
});

const updateNotificationZodValidation = z.object({
  body: z.object({
    userId: z.string().optional(),
    title: z.string().optional(),
    body: z.string().optional(),
    type: z.enum([...types] as [string, ...string[]]).optional(),
  }),
});

export const NotificationValidation = {
  createNotificationZodValidation,
  updateNotificationZodValidation,
};
