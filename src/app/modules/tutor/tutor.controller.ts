/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, RequestHandler, Response } from 'express';
import { TutorService } from './tutor.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { ITutor } from './tutor.interface';
import { tutorFilterableFields } from './tutor.constants';
import { paginationFields } from '../../../constants/pagination';
import { pick } from '../../../shared/pick';

// Create Tutor
const createTutor: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user;
    const { ...TutorData } = req.body;

    const result = await TutorService.createTutor(TutorData, user);

    // Send Response
    sendResponse<ITutor>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Tutor Created Successfully',
      data: result,
    });
  }
);

// Get all Tutors
const getAllTutors: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, tutorFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await TutorService.getAllTutors(filters, paginationOptions);

    // Send Response
    sendResponse<ITutor[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Tutors retrieved Successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);

// Get single Tutor by id
const getSingleTutor: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await TutorService.getSingleTutor(id);

    // Send Response
    sendResponse<ITutor>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Get Single Tutor Successfully',
      data: result,
    });
  }
);

// Update Tutor
const updateTutor: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;

  const result = await TutorService.updateTutor(id, updateData);

  sendResponse<ITutor>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Tutor updated successfully',
    data: result,
  });
});

// Delete Tutor
const deleteTutor: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await TutorService.deleteTutor(id);

  sendResponse<ITutor>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Tutor deleted successfully',
    data: result,
  });
});

export const TutorController = {
  createTutor,
  getAllTutors,
  getSingleTutor,
  updateTutor,
  deleteTutor,
};
