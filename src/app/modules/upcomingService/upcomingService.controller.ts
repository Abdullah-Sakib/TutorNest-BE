/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, RequestHandler, Response } from 'express';
import { UpcomingServiceService } from './upcomingService.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IUpcomingService } from './upcomingService.interface';
import { paginationFields } from '../../../constants/pagination';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { pick } from '../../../shared/pick';
import { jwtHelper } from '../../../helper/jwtHelper';

const createUpcomingService: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const token: any = req.headers.authorization;
    const verifiedUser = jwtHelper.verifyToken(
      token,
      config.jwt.secret as Secret
    );

    const { ...reviewData } = req.body;

    const result = await UpcomingServiceService.createUpcomingService(
      reviewData,
      verifiedUser
    );

    // Send Response
    sendResponse<IUpcomingService>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'UpcomingService Created Successfully',
      data: result,
    });
  }
);

const getAllUpcomingServices: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const paginationOptions = pick(req.query, paginationFields);

    const result = await UpcomingServiceService.getAllUpcomingServices(
      paginationOptions
    );

    // Send Response
    sendResponse<IUpcomingService[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Upcoming Service retrieved Successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);

const getSingleUpcomingService: RequestHandler = catchAsync(
  async (req, res) => {
    const id = req.params.id;
    const result = await UpcomingServiceService.getSingleUpcomingService(id);

    // Send Response
    sendResponse<IUpcomingService>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single Upcoming Service retrived successfully',
      data: result,
    });
  }
);

const updateUpcomingService: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;

  const result = await UpcomingServiceService.updateUpcomingService(
    id,
    updateData
  );

  sendResponse<IUpcomingService>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Upcoming Service updated successfully',
    data: result,
  });
});

const deleteUpcomingService: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await UpcomingServiceService.deleteUpcomingService(id);

  sendResponse<IUpcomingService>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Upcoming Service deleted successfully',
    data: result,
  });
});

export const UpcomingServiceController = {
  createUpcomingService,
  getAllUpcomingServices,
  getSingleUpcomingService,
  updateUpcomingService,
  deleteUpcomingService,
};
