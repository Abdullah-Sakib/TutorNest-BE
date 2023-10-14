/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { SortOrder } from 'mongoose';
import { ITutor, ITutorFilters } from './tutor.interface';
import { Tutor } from './tutor.model';
import httpStatus from 'http-status';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { tutorSearchableFields } from './tutor.constants';
import { IGenericResponse } from '../../../interfaces/common';
import { User } from '../user/user.model';
import { paginationHelper } from '../../../helper/paginationHelper';
import ApiError from '../../../errors/ApiError';

// Create Tutor
const createTutor = async (
  payload: ITutor,
  verifiedUser: any
): Promise<ITutor | null> => {
  const user = await User.find({ email: verifiedUser.email });
  if (user.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const result = await Tutor.create(payload);
  return result;
};

// Get All Tutors (can also filter)
const getAllTutors = async (
  filters: ITutorFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ITutor[]>> => {
  // Try not to use any
  const { searchTerm, minFee, maxFee, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions?.push({
      $or: tutorSearchableFields?.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (minFee || maxFee) {
    const feeCondition: { fee?: { $gte?: number; $lte?: number } } = {};

    if (minFee) {
      feeCondition.fee = { $gte: Number(minFee) };
    }

    if (maxFee) {
      if (!feeCondition.fee) {
        feeCondition.fee = {};
      }
      feeCondition.fee.$lte = Number(maxFee);
    }

    andConditions.push(feeCondition);
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

  const result = await Tutor.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await Tutor.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// Get Single Tutor
const getSingleTutor = async (id: string): Promise<ITutor | null> => {
  const result = await Tutor.findById(id);

  return result;
};

const updateTutor = async (
  id: string,
  payload: Partial<ITutor>
): Promise<ITutor | null> => {
  const isExist = await Tutor.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Tutor not found');
  }

  const result = await Tutor.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

// Delete Tutor
const deleteTutor = async (id: string): Promise<ITutor | null> => {
  const result = await Tutor.findByIdAndDelete(id);
  if (!result) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Tutor Not Found');
  }
  return result;
};

export const TutorService = {
  createTutor,
  getAllTutors,
  getSingleTutor,
  updateTutor,
  deleteTutor,
};
