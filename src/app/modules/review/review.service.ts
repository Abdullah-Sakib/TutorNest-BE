/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { SortOrder } from 'mongoose';
import { IReview, IReviewFilters } from './review.interface';
import { Review } from './review.model';
import httpStatus from 'http-status';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { reviewSearchableFields } from './review.constants';
import { IGenericResponse } from '../../../interfaces/common';
import { User } from '../user/user.model';
import { paginationHelper } from '../../../helper/paginationHelper';
import ApiError from '../../../errors/ApiError';

// Create Review
const createReview = async (
  payload: IReview,
  verifiedUser: any
): Promise<IReview | null> => {
  const user = await User.find({ _id: verifiedUser.id });
  if (user.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const result = await Review.create(payload);
  return result;
};

// Get All Reviews (can also filter)
const getAllReviews = async (
  filters: IReviewFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IReview[]>> => {
  // Try not to use any
  const { searchTerm, ...filtersData } = filters;

  const andConditions = []; // Try not to use any

  if (searchTerm) {
    andConditions?.push({
      $or: reviewSearchableFields?.map(field => ({
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

  const result = await Review.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await Review.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// Get Single Review
const getSingleReview = async (id: string): Promise<IReview | null> => {
  const result = await Review.findById(id);

  return result;
};

// Get Single tutor Review
const getSingleTutorReview = async (id: string): Promise<IReview[] | null> => {
  const result = await Review.find({ tutorId: id });

  return result;
};

const updateReview = async (
  id: string,
  payload: Partial<IReview>
): Promise<IReview | null> => {
  const isExist = await Review.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Review not found');
  }

  const result = await Review.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

// Delete Review
const deleteReview = async (id: string): Promise<IReview | null> => {
  const result = await Review.findByIdAndDelete(id);
  if (!result) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Review Not Found');
  }
  return result;
};

export const ReviewService = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
  getSingleTutorReview,
};
