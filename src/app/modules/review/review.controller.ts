/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, RequestHandler, Response } from 'express';
import { ReviewService } from './review.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IReview } from './review.interface';
import { reviewFilterableFields } from './review.constants';
import { paginationFields } from '../../../constants/pagination';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { pick } from '../../../shared/pick';
import { jwtHelper } from '../../../helper/jwtHelper';

// Create Review
const createReview: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const token: any = req.headers.authorization;
    const verifiedUser = jwtHelper.verifyToken(
      token,
      config.jwt.secret as Secret
    );

    const { ...reviewData } = req.body;

    const result = await ReviewService.createReview(reviewData, verifiedUser);

    // Send Response
    sendResponse<IReview>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Review Created Successfully',
      data: result,
    });
  }
);

// Get all reviews
const getAllReviews: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, reviewFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await ReviewService.getAllReviews(
      filters,
      paginationOptions
    );

    // Send Response
    sendResponse<IReview[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Reviews retrieved Successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);

// Get single Review by id
const getSingleReview: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await ReviewService.getSingleReview(id);

  // Send Response
  sendResponse<IReview>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get Single Review Successfully',
    data: result,
  });
});

// Get single Review by id
const getSingleTutorReview: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await ReviewService.getSingleTutorReview(id);

  // Send Response
  sendResponse<IReview>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get Single Review Successfully',
    data: result,
  });
});

// Update Review
const updateReview: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;

  const result = await ReviewService.updateReview(id, updateData);

  sendResponse<IReview>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review updated successfully',
    data: result,
  });
});

// Delete Review
const deleteReview: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await ReviewService.deleteReview(id);

  sendResponse<IReview>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review deleted successfully',
    data: result,
  });
});

export const ReviewController = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
  getSingleTutorReview,
};
