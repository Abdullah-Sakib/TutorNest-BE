import { Schema, model } from 'mongoose';
import { IBooking, BookingModel } from './booking.interface';
import { status } from './booking.constants';

// Tutor Schema
const BookingSchema = new Schema<IBooking, BookingModel>(
  {
    tutorId: {
      type: String,
      ref: 'Tutor',
      required: [true, 'tutorId is missing!'],
    },
    userId: {
      type: String,
      ref: 'User',
      required: [true, 'userId is missing!'],
    },
    booked_slot: {
      type: String,
      required: [true, 'booked_slot is missing!'],
    },
    user_message: {
      type: String,
    },
    user_location: {
      type: String,
      required: [true, 'user_location is missing!'],
    },
    admin_message: {
      type: String,
    },
    status: {
      type: String,
      enum: status,
      default: 'pending',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Booking = model<IBooking, BookingModel>('Booking', BookingSchema);
