/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, RequestHandler, Response } from 'express';
import { BookingService } from './booking.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IBooking } from './booking.interface';
import { bookingFilterableFields } from './booking.constants';
import { paginationFields } from '../../../constants/pagination';
import { pick } from '../../../shared/pick';

// Create Booking
const createBooking: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user;
    const { ...BookingData } = req.body;

    const result = await BookingService.createBooking(BookingData, user);

    // Send Response
    sendResponse<IBooking>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Booking Created Successfully',
      data: result,
    });
  }
);
// cancel Booking
const cancelBooking: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user;
    const bookingId = req.params.bookingId;

    const result = await BookingService.cancelBooking(bookingId, user);

    // Send Response
    sendResponse<IBooking>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Booking cancelled Successfully',
      data: result,
    });
  }
);

// Get all Bookings
const getAllBookings: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, bookingFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await BookingService.getAllBookings(
      filters,
      paginationOptions
    );

    // Send Response
    sendResponse<IBooking[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Bookings retrieved Successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);

// Get single Booking by id
const getSingleBooking: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await BookingService.getSingleBooking(id);

    // Send Response
    sendResponse<IBooking>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Get Single Booking Successfully',
      data: result,
    });
  }
);

// Get single user Booking
const getSingleUsersBooking: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.userId;
    const result = await BookingService.getSingleUsersBooking(id);

    // Send Response
    sendResponse<IBooking[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Get Single Users Booking Successfully',
      data: result,
    });
  }
);

// Update Booking
const updateBooking: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;

  const result = await BookingService.updateBooking(id, updateData);

  sendResponse<IBooking>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking updated successfully',
    data: result,
  });
});

// Delete Booking
const deleteBooking: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await BookingService.deleteBooking(id);

  sendResponse<IBooking>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking deleted successfully',
    data: result,
  });
});

export const BookingController = {
  createBooking,
  cancelBooking,
  getAllBookings,
  getSingleBooking,
  getSingleUsersBooking,
  updateBooking,
  deleteBooking,
};
