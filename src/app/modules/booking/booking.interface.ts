import { Model } from 'mongoose';

export type IBooking = {
  tutorId: string;
  userId: string;
  booked_slot: string;
  user_message: string;
  user_location: string;
  admin_message: string;
  status: string;
};

// Booking Model
export type BookingModel = Model<IBooking, Record<string, unknown>>;

export type IBookingFilters = {
  searchTerm?: string;
  message?: string;
};
