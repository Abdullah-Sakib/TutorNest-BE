import { JwtPayload } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiError';
import { IUser } from './user.interface';
import { User } from './user.model';
import httpStatus from 'http-status';

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

const getAllUsers = async (): Promise<IUser[] | null> => {
  const result = await User.find();

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to retrive users data');
  }

  return result;
};

const updateUser = async (id: string, user: IUser): Promise<IUser | null> => {
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
