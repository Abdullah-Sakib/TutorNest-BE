import { JwtPayload } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiError';
import { IUser, IUserFilter } from './user.interface';
import { User } from './user.model';
import httpStatus from 'http-status';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { userSearchableFields } from './user.constants';
import { paginationHelper } from '../../../helper/paginationHelper';
import { SortOrder } from 'mongoose';
import { IGenericResponse } from '../../../interfaces/common';

const createUser = async (user: IUser): Promise<IUser | null> => {
  const result = await User.create(user);

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
  }

  return result;
};

const getProfile = async (user: JwtPayload | null): Promise<IUser | null> => {
  const result = await User.findOne({ email: user && user.email });

  if (!result) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Failed to retrive user profile'
    );
  }

  return result;
};

const getAllUsers = async (
  filters: IUserFilter,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IUser[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: userSearchableFields?.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const sortCondition: '' | { [key: string]: SortOrder } = sortBy &&
    sortOrder && { [sortBy]: sortOrder };

  const whereCondition =
    andConditions?.length > 0 ? { $and: andConditions } : {};

  const result = await User.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await User.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const updateUser = async (
  id: string,
  user: IUser,
  decodedUser: JwtPayload | null
): Promise<IUser | null> => {
  const isExist = await User.findOne({ _id: id });

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not found');
  }

  if (decodedUser?.email !== isExist?.email && decodedUser?.role === 'user') {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'You are not authorized to perform this action'
    );
  }

  const result = await User.findOneAndUpdate({ _id: id }, user);

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to update user');
  }

  return result;
};

export const UserService = {
  createUser,
  getProfile,
  getAllUsers,
  updateUser,
};
