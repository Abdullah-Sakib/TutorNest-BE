/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, RequestHandler, Response } from 'express';
import { FAQService } from './FAQ.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IFAQ } from './FAQ.interface';
import { paginationFields } from '../../../constants/pagination';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { pick } from '../../../shared/pick';
import { jwtHelper } from '../../../helper/jwtHelper';

const createFAQ: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const token: any = req.headers.authorization;
    const verifiedUser = jwtHelper.verifyToken(
      token,
      config.jwt.secret as Secret
    );

    const { ...reviewData } = req.body;

    const result = await FAQService.createFAQ(reviewData, verifiedUser);

    // Send Response
    sendResponse<IFAQ>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'FAQ Created Successfully',
      data: result,
    });
  }
);

const getAllFAQs: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const paginationOptions = pick(req.query, paginationFields);

    const result = await FAQService.getAllFAQs(paginationOptions);

    // Send Response
    sendResponse<IFAQ[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'FAQ retrieved Successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);

const getSingleFAQ: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await FAQService.getSingleFAQ(id);

  // Send Response
  sendResponse<IFAQ>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single FAQ retrived successfully',
    data: result,
  });
});

const updateFAQ: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;

  const result = await FAQService.updateFAQ(id, updateData);

  sendResponse<IFAQ>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'FAQ updated successfully',
    data: result,
  });
});

const deleteFAQ: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await FAQService.deleteFAQ(id);

  sendResponse<IFAQ>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'FAQ deleted successfully',
    data: result,
  });
});

export const FAQController = {
  createFAQ,
  getAllFAQs,
  getSingleFAQ,
  updateFAQ,
  deleteFAQ,
};
