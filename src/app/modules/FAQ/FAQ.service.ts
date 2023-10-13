/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { SortOrder } from 'mongoose';
import httpStatus from 'http-status';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { User } from '../user/user.model';
import { paginationHelper } from '../../../helper/paginationHelper';
import ApiError from '../../../errors/ApiError';
import { IFAQ } from './FAQ.interface';
import { FAQ } from './FAQ.model';

const createFAQ = async (
  payload: IFAQ,
  verifiedUser: any
): Promise<IFAQ | null> => {
  const user = await User.find({ _id: verifiedUser.id });

  if (user.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const result = await FAQ.create(payload);
  return result;
};

const getAllFAQs = async (
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IFAQ[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const sortCondition: '' | { [key: string]: SortOrder } = sortBy &&
    sortOrder && { [sortBy]: sortOrder };

  const result = await FAQ.find({}).sort(sortCondition).skip(skip).limit(limit);

  const total = await FAQ.countDocuments({});

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleFAQ = async (id: string): Promise<IFAQ | null> => {
  const result = await FAQ.findById(id);

  return result;
};

const updateFAQ = async (
  id: string,
  payload: Partial<IFAQ>
): Promise<IFAQ | null> => {
  const isExist = await FAQ.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'FAQ not found');
  }

  const result = await FAQ.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

const deleteFAQ = async (id: string): Promise<IFAQ | null> => {
  const result = await FAQ.findByIdAndDelete(id);
  if (!result) {
    throw new ApiError(httpStatus.FORBIDDEN, 'FAQ Not Found');
  }
  return result;
};

export const FAQService = {
  createFAQ,
  getAllFAQs,
  getSingleFAQ,
  updateFAQ,
  deleteFAQ,
};
