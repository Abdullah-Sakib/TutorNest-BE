import { RequestHandler } from 'express';
import { UserService } from './user.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IUser } from './user.interface';
import { pick } from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { userFilterableFields } from './user.constants';

const createUser: RequestHandler = catchAsync(async (req, res) => {
  const userData = req.body;
  const result = await UserService.createUser(userData);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user created successfully',
    data: result,
  });
});

const getProfile: RequestHandler = catchAsync(async (req, res) => {
  const user = req?.user;
  const result = await UserService.getProfile(user);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'profile retrived successfully',
    data: result,
  });
});

const getAllUsers: RequestHandler = catchAsync(async (req, res) => {
  const filters = pick(req.query, userFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await UserService.getAllUsers(filters, paginationOptions);

  sendResponse<IUser[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'all users retrived successfully',
    meta: result.meta,
    data: result.data,
  });
});

const updateUser: RequestHandler = catchAsync(async (req, res) => {
  const decodedUser = req.user;
  const userData = req.body;
  const userId = req.params.id;
  const result = await UserService.updateUser(userId, userData, decodedUser);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user updated successfully',
    data: result,
  });
});

export const UserController = {
  createUser,
  getProfile,
  getAllUsers,
  updateUser,
};
