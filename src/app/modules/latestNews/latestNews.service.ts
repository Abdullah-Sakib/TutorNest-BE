/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { SortOrder } from 'mongoose';
import { ILatestNews } from './latestNews.interface';
import { LatestNews } from './latestNews.model';
import httpStatus from 'http-status';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { User } from '../user/user.model';
import { paginationHelper } from '../../../helper/paginationHelper';
import ApiError from '../../../errors/ApiError';

// Create LatestNews
const createLatestNews = async (
  payload: ILatestNews,
  verifiedUser: any
): Promise<ILatestNews | null> => {
  const user = await User.find({ _id: verifiedUser.id });

  if (user.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const result = await LatestNews.create(payload);
  return result;
};

// Get All LatestNewss
const getAllLatestNewss = async (
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ILatestNews[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const sortCondition: '' | { [key: string]: SortOrder } = sortBy &&
    sortOrder && { [sortBy]: sortOrder };

  const result = await LatestNews.find({})
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await LatestNews.countDocuments({});

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// Get Single LatestNews
const getSingleLatestNews = async (id: string): Promise<ILatestNews | null> => {
  const result = await LatestNews.findById(id);

  return result;
};

const updateLatestNews = async (
  id: string,
  payload: Partial<ILatestNews>
): Promise<ILatestNews | null> => {
  const isExist = await LatestNews.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'LatestNews not found');
  }

  const result = await LatestNews.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

// Delete LatestNews
const deleteLatestNews = async (id: string): Promise<ILatestNews | null> => {
  const result = await LatestNews.findByIdAndDelete(id);
  if (!result) {
    throw new ApiError(httpStatus.FORBIDDEN, 'LatestNews Not Found');
  }
  return result;
};

export const LatestNewsService = {
  createLatestNews,
  getAllLatestNewss,
  getSingleLatestNews,
  updateLatestNews,
  deleteLatestNews,
};
