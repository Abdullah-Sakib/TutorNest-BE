/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { IAddToCart } from './addToCart.interface';
import { AddToCart } from './addToCart.model';
import httpStatus from 'http-status';

import { User } from '../user/user.model';
import ApiError from '../../../errors/ApiError';
import { JwtPayload } from 'jsonwebtoken';
import { Tutor } from '../tutor/tutor.model';
import { ITutor } from '../tutor/tutor.interface';
import mongoose from 'mongoose';

const createAddToCart = async (
  tutorId: string,
  verifiedUser: any
): Promise<IAddToCart | null> => {
  const user = await User.find({ email: verifiedUser?.email });
  if (user.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const isCartExist = await AddToCart.findOne({
    userEmail: verifiedUser?.email,
  });

  let result: IAddToCart | null;
  if (isCartExist) {
    // check if the user exist on the cart
    const isTutorExistOnCart = isCartExist?.tutorIds.find(id => id === tutorId);
    if (isTutorExistOnCart) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'this tutor already exist on cart'
      );
    }

    isCartExist.tutorIds.push(tutorId);
    result = await isCartExist.save();
  } else {
    const data = {
      tutorIds: [tutorId],
      userEmail: verifiedUser?.email,
    };
    result = await AddToCart.create(data);
  }

  return result;
};

const getAllAddToCarts = async (user: JwtPayload | null): Promise<ITutor[]> => {
  const addToCartItems = await AddToCart.findOne({ userEmail: user?.email });

  if (!addToCartItems) {
    return []; // Handle the case where addToCartItems is not found
  }

  // Ensure that tutorIds is an array and contains valid string IDs
  const tutorIds = Array.isArray(addToCartItems.tutorIds)
    ? addToCartItems.tutorIds.filter(id => mongoose.Types.ObjectId.isValid(id))
    : [];

  const allTutors = await Tutor.find({
    _id: { $in: tutorIds.map((id: string) => new mongoose.Types.ObjectId(id)) },
  });

  return allTutors;
};

const removeItemAddToCart = async (
  verifiedUser: any,
  tutorId: string
): Promise<IAddToCart | null> => {
  const userEmail = verifiedUser?.email;

  if (!userEmail) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User email not provided');
  }

  // Ensure the user exists
  const user = await User.findOne({ email: userEmail });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  try {
    // Update the AddToCart document to remove the specified tutorId
    const result = await AddToCart.findOneAndUpdate(
      { userEmail: userEmail },
      { $pull: { tutorIds: tutorId } },
      { new: true } // This ensures that the updated document is returned
    );

    if (!result) {
      throw new ApiError(httpStatus.FORBIDDEN, 'Item not found in AddToCart');
    }

    return result;
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error updating AddToCart'
    );
  }
};

export const AddToCartService = {
  createAddToCart,
  getAllAddToCarts,
  removeItemAddToCart,
};
