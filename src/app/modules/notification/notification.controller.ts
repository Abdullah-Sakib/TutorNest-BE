/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, RequestHandler, Response } from 'express';
import { NotificationService } from './notification.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { INotification } from './notification.interface';
import { paginationFields } from '../../../constants/pagination';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { pick } from '../../../shared/pick';
import { jwtHelper } from '../../../helper/jwtHelper';

const createNotification: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const token: any = req.headers.authorization;
    const verifiedUser = jwtHelper.verifyToken(
      token,
      config.jwt.secret as Secret
    );

    const { ...reviewData } = req.body;

    const result = await NotificationService.createNotification(
      reviewData,
      verifiedUser
    );

    // Send Response
    sendResponse<INotification>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Notification Created Successfully',
      data: result,
    });
  }
);

const getAllNotifications: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const paginationOptions = pick(req.query, paginationFields);

    const result = await NotificationService.getAllNotifications(
      paginationOptions
    );

    // Send Response
    sendResponse<INotification[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Upcoming Service retrieved Successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);

const getSingleNotification: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await NotificationService.getSingleNotification(id);

  // Send Response
  sendResponse<INotification>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Upcoming Service retrived successfully',
    data: result,
  });
});

const getSingleUserNotifications: RequestHandler = catchAsync(
  async (req, res) => {
    const id = req.params.id;
    const result = await NotificationService.getSingleUserNotifications(id);

    // Send Response
    sendResponse<INotification>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single Upcoming Service retrived successfully',
      data: result,
    });
  }
);

const updateNotification: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;

  const result = await NotificationService.updateNotification(id, updateData);

  sendResponse<INotification>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Upcoming Service updated successfully',
    data: result,
  });
});

const deleteNotification: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await NotificationService.deleteNotification(id);

  sendResponse<INotification>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Upcoming Service deleted successfully',
    data: result,
  });
});

export const NotificationController = {
  createNotification,
  getAllNotifications,
  getSingleNotification,
  updateNotification,
  deleteNotification,
  getSingleUserNotifications,
};
