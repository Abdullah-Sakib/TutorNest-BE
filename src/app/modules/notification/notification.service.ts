/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { SortOrder } from 'mongoose';
import httpStatus from 'http-status';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { User } from '../user/user.model';
import { paginationHelper } from '../../../helper/paginationHelper';
import ApiError from '../../../errors/ApiError';
import { INotification } from './notification.interface';
import { Notification } from './notification.model';

// Create Notification
const createNotification = async (
  payload: INotification,
  verifiedUser: any
): Promise<INotification | null> => {
  const user = await User.find({ _id: verifiedUser.id });

  if (user.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const result = await Notification.create(payload);
  return result;
};

// Get All Notifications
const getAllNotifications = async (
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<INotification[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const sortCondition: '' | { [key: string]: SortOrder } = sortBy &&
    sortOrder && { [sortBy]: sortOrder };

  const result = await Notification.find({})
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await Notification.countDocuments({});

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// Get Single Notification
const getSingleNotification = async (
  id: string
): Promise<INotification | null> => {
  const result = await Notification.findById(id);

  return result;
};

const getSingleUserNotifications = async (
  id: string
): Promise<INotification | null> => {
  const result = await Notification.findById({ userId: id });

  return result;
};

const updateNotification = async (
  id: string,
  payload: Partial<INotification>
): Promise<INotification | null> => {
  const isExist = await Notification.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Notification not found');
  }

  const result = await Notification.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

// Delete Notification
const deleteNotification = async (
  id: string
): Promise<INotification | null> => {
  const result = await Notification.findByIdAndDelete(id);
  if (!result) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Notification Not Found');
  }
  return result;
};

export const NotificationService = {
  createNotification,
  getAllNotifications,
  getSingleNotification,
  updateNotification,
  deleteNotification,
  getSingleUserNotifications,
};
