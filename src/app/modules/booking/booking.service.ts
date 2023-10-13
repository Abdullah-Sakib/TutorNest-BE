/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import mongoose, { SortOrder } from 'mongoose';
import { IBooking, IBookingFilters } from './booking.interface';
import { Booking } from './booking.model';
import httpStatus from 'http-status';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { bookingSearchableFields } from './booking.constants';
import { IGenericResponse } from '../../../interfaces/common';
import { User } from '../user/user.model';
import { paginationHelper } from '../../../helper/paginationHelper';
import ApiError from '../../../errors/ApiError';
import { Tutor } from '../tutor/tutor.model';

// Create Booking
const createBooking = async (
  payload: IBooking,
  verifiedUser: any
): Promise<IBooking> => {
  const user = await User.find({ email: verifiedUser.email });
  if (user.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  let result;
  const session = await mongoose.startSession();
  try {
    await session.startTransaction();

    // Find the tutor data by its unique ID
    const tutor = await Tutor.findById(payload?.tutorId);

    if (!tutor) {
      throw new ApiError(httpStatus.NOT_FOUND, 'tutor not found');
    }

    // Find the slot to update
    const slotToUpdate = tutor.available_slots.find(
      slot => slot.slot === payload.booked_slot
    );

    if (slotToUpdate?.status === 'booked') {
      throw new ApiError(httpStatus.BAD_REQUEST, 'slot already booked');
    }

    if (slotToUpdate) {
      slotToUpdate.status = 'booked';
    } else {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Slot not found');
    }

    const booking = new Booking(payload); // Create a new Booking document
    result = await booking.save({ session });

    if (!result) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to book');
    }

    // Save the updated tutor data
    await tutor.save({ session });

    // Commit transaction and end session
    await session.commitTransaction();
    session.endSession();
  } catch (error: any) {
    // abort transaction and end session
    await session.abortTransaction();
    await session.endSession();
    throw new ApiError(httpStatus.BAD_REQUEST, error.message);
  }
  return result;
};

// Cancel Booking
const cancelBooking = async (bookingId: string, user: any) => {
  const session = await mongoose.startSession();
  let cancelationData: IBooking | null;

  try {
    await session.startTransaction();
    // Find the booking by its unique ID
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Booking not found');
    }

    if (booking.userId !== user.id) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        'You are not authorized to cancel this booking'
      );
    }
    cancelationData = booking;

    // Update the booking status to "cancelled"
    booking.status = 'cancelled';

    // Find the tutor data by its unique ID
    const tutor = await Tutor.findById(booking.tutorId);

    if (!tutor) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Tutor not found');
    }

    // Find the slot to update
    const slotToUpdate = tutor.available_slots.find(
      slot => slot.slot === booking?.booked_slot
    );

    if (slotToUpdate) {
      // Update the slot status to "pending"
      slotToUpdate.status = 'pending';
    } else {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Slot not found');
    }

    // Save the updated booking and tutor data
    await booking.save({ session });
    await tutor.save({ session });

    // Commit transaction and end session
    await session.commitTransaction();
    session.endSession();
  } catch (error: any) {
    // Abort transaction and end session
    await session.abortTransaction();
    session.endSession();
    throw new ApiError(httpStatus.BAD_REQUEST, error?.message);
  }

  return cancelationData;
};

// Get All Bookings (can also filter)
const getAllBookings = async (
  filters: IBookingFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IBooking[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions?.push({
      $or: bookingSearchableFields?.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => {
        return { [field]: value };
      }),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const sortCondition: '' | { [key: string]: SortOrder } = sortBy &&
    sortOrder && { [sortBy]: sortOrder };

  const whereCondition =
    andConditions?.length > 0 ? { $and: andConditions } : {};

  const result = await Booking.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await Booking.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// Get Single Booking
const getSingleBooking = async (id: string): Promise<IBooking | null> => {
  const result = await Booking.findById(id);

  return result;
};

// Get Single user Booking
const getSingleUsersBooking = async (
  id: string
): Promise<IBooking[] | null> => {
  const result = await Booking.find({ userId: id });

  return result;
};

const updateBooking = async (
  id: string,
  payload: Partial<IBooking>
): Promise<IBooking | null> => {
  const isExist = await Booking.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Booking not found');
  }

  const result = await Booking.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

// Delete Booking
const deleteBooking = async (id: string): Promise<IBooking | null> => {
  const result = await Booking.findByIdAndDelete(id);
  if (!result) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Booking Not Found');
  }
  return result;
};

export const BookingService = {
  createBooking,
  cancelBooking,
  getAllBookings,
  getSingleBooking,
  getSingleUsersBooking,
  updateBooking,
  deleteBooking,
};
