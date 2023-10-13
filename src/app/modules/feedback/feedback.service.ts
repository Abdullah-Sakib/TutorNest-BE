/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { SortOrder } from 'mongoose';
import { IFeedback, IFeedbackFilters } from './feedback.interface';
import { Feedback } from './feedback.model';
import httpStatus from 'http-status';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { feedbackSearchableFields } from './feedback.constants';
import { IGenericResponse } from '../../../interfaces/common';
import { User } from '../user/user.model';
import { paginationHelper } from '../../../helper/paginationHelper';
import ApiError from '../../../errors/ApiError';

// Create Feedback
const createFeedback = async (
  payload: IFeedback,
  verifiedUser: any
): Promise<IFeedback | null> => {
  const user = await User.find({ email: verifiedUser.email });
  if (user.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const result = await Feedback.create(payload);
  return result;
};

// Get All Feedbacks (can also filter)
const getAllFeedbacks = async (
  filters: IFeedbackFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IFeedback[]>> => {
  // Try not to use any
  const { searchTerm, ...filtersData } = filters;

  const andConditions = []; // Try not to use any

  if (searchTerm) {
    andConditions?.push({
      $or: feedbackSearchableFields?.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => {
        return { [field]: value };
      }),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const sortCondition: '' | { [key: string]: SortOrder } = sortBy &&
    sortOrder && { [sortBy]: sortOrder };

  const whereCondition =
    andConditions?.length > 0 ? { $and: andConditions } : {};

  const result = await Feedback.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await Feedback.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// Get Single Feedback
const getSingleFeedback = async (id: string): Promise<IFeedback | null> => {
  const result = await Feedback.findById(id);

  return result;
};

// Get Single user's Feedback
const getMyFeedback = async (email: string): Promise<IFeedback[] | null> => {
  const result = await Feedback.find({ email: email });

  return result;
};

const updateFeedback = async (
  id: string,
  payload: Partial<IFeedback>
): Promise<IFeedback | null> => {
  const isExist = await Feedback.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Feedback not found');
  }

  const result = await Feedback.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

// Delete Feedback
const deleteFeedback = async (id: string): Promise<IFeedback | null> => {
  const result = await Feedback.findByIdAndDelete(id);
  if (!result) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Feedback Not Found');
  }
  return result;
};

export const FeedbackService = {
  createFeedback,
  getAllFeedbacks,
  getSingleFeedback,
  getMyFeedback,
  updateFeedback,
  deleteFeedback,
};
