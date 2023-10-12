/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type IUser = {
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  password: string;
  profileImage: string;
};

export type IUserMethods = {
  isUserExists(
    email: string
  ): Promise<Pick<IUser, 'email' | 'role' | 'password'> | null>;

  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
};

export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>;

export type IUserFilter = {
  searchTerm?: string;
  email?: string;
  role?: string;
};
