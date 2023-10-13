import { z } from 'zod';
import { status } from './booking.constants';

const createBookingZodValidation = z.object({
  body: z.object({
    tutorId: z.string({
      required_error: 'tutorId is required',
    }),
    userId: z.string({
      required_error: 'userId is required',
    }),
    booked_slot: z.string({
      required_error: 'booked_slot is required',
    }),
    user_message: z.string().optional(),
    user_location: z.string({
      required_error: 'user_location is required',
    }),
  }),
});

const updateBookingZodValidation = z.object({
  body: z.object({
    tutorId: z.string().optional(),
    userId: z.string().optional(),
    booked_slot: z.string().optional(),
    user_message: z.string().optional(),
    user_location: z.string().optional(),
    admin_message: z.string().optional(),
    status: z.enum([...status] as [string, ...string[]]).optional(),
  }),
});

export const BookingValidation = {
  createBookingZodValidation,
  updateBookingZodValidation,
};
