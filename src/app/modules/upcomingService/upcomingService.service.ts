/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { SortOrder } from 'mongoose';
import httpStatus from 'http-status';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { User } from '../user/user.model';
import { paginationHelper } from '../../../helper/paginationHelper';
import ApiError from '../../../errors/ApiError';
import { IUpcomingService } from './upcomingService.interface';
import { UpcomingService } from './upcomingService.model';

// Create UpcomingService
const createUpcomingService = async (
  payload: IUpcomingService,
  verifiedUser: any
): Promise<IUpcomingService | null> => {
  const user = await User.find({ _id: verifiedUser.id });

  if (user.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const result = await UpcomingService.create(payload);
  return result;
};

// Get All UpcomingServices
const getAllUpcomingServices = async (
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IUpcomingService[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const sortCondition: '' | { [key: string]: SortOrder } = sortBy &&
    sortOrder && { [sortBy]: sortOrder };

  const result = await UpcomingService.find({})
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await UpcomingService.countDocuments({});

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// Get Single UpcomingService
const getSingleUpcomingService = async (
  id: string
): Promise<IUpcomingService | null> => {
  const result = await UpcomingService.findById(id);

  return result;
};

const updateUpcomingService = async (
  id: string,
  payload: Partial<IUpcomingService>
): Promise<IUpcomingService | null> => {
  const isExist = await UpcomingService.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'UpcomingService not found');
  }

  const result = await UpcomingService.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

// Delete UpcomingService
const deleteUpcomingService = async (
  id: string
): Promise<IUpcomingService | null> => {
  const result = await UpcomingService.findByIdAndDelete(id);
  if (!result) {
    throw new ApiError(httpStatus.FORBIDDEN, 'UpcomingService Not Found');
  }
  return result;
};

export const UpcomingServiceService = {
  createUpcomingService,
  getAllUpcomingServices,
  getSingleUpcomingService,
  updateUpcomingService,
  deleteUpcomingService,
};
