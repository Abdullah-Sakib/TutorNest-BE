/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, RequestHandler, Response } from 'express';
import { LatestNewsService } from './latestNews.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { ILatestNews } from './latestNews.interface';
import { paginationFields } from '../../../constants/pagination';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { pick } from '../../../shared/pick';
import { jwtHelper } from '../../../helper/jwtHelper';

// Create Review
const createLatestNews: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const token: any = req.headers.authorization;
    const verifiedUser = jwtHelper.verifyToken(
      token,
      config.jwt.secret as Secret
    );

    const { ...reviewData } = req.body;

    const result = await LatestNewsService.createLatestNews(
      reviewData,
      verifiedUser
    );

    // Send Response
    sendResponse<ILatestNews>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'LatestNews Created Successfully',
      data: result,
    });
  }
);

// Get all reviews
const getAllLatestNewss: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const paginationOptions = pick(req.query, paginationFields);

    const result = await LatestNewsService.getAllLatestNewss(paginationOptions);

    // Send Response
    sendResponse<ILatestNews[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Latest News retrieved Successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);

// Get single Review by id
const getSingleLatestNews: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await LatestNewsService.getSingleLatestNews(id);

  // Send Response
  sendResponse<ILatestNews>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single latest news retrived successfully',
    data: result,
  });
});

// Update Review
const updateLatestNews: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;

  const result = await LatestNewsService.updateLatestNews(id, updateData);

  sendResponse<ILatestNews>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Latest News updated successfully',
    data: result,
  });
});

// Delete Review
const deleteLatestNews: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await LatestNewsService.deleteLatestNews(id);

  sendResponse<ILatestNews>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Latest News deleted successfully',
    data: result,
  });
});

export const LatestNewsController = {
  createLatestNews,
  getAllLatestNewss,
  getSingleLatestNews,
  updateLatestNews,
  deleteLatestNews,
};
