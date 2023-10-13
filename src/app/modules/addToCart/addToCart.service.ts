/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { IAddToCart } from './addToCart.interface';
import { AddToCart } from './addToCart.model';
import httpStatus from 'http-status';

import { User } from '../user/user.model';
import ApiError from '../../../errors/ApiError';
import { JwtPayload } from 'jsonwebtoken';

const createAddToCart = async (
  tutorId: string,
  verifiedUser: any
): Promise<IAddToCart | null> => {
  const user = await User.find({ email: verifiedUser?.email });
  if (user.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const isCartExist = await AddToCart.findOne({
    email: verifiedUser?.email,
  });

  let result: IAddToCart | null;
  if (isCartExist) {
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

// Get All AddToCarts (can also filter)
const getAllAddToCarts = async (
  user: JwtPayload | null
): Promise<IAddToCart | null> => {
  const addToCartItems = await AddToCart.findOne({ email: user?.email });

  // const allTutors = await Tutor.find({
  //   _id: { $in: addToCartItems?.tutorIds },
  // });

  return addToCartItems;
};

const removeItemAddToCart = async (
  id: string,
  verifiedUser: any
): Promise<IAddToCart | null> => {
  const user = await User.find({ email: verifiedUser?.email });
  if (user.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  // Update the AddToCart document to remove the specified tutorId
  const result = await AddToCart.findOneAndUpdate(
    { email: verifiedUser?.email },
    { $pull: { tutorIds: id } },
    { new: true } // This ensures that the updated document is returned
  );

  if (!result) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Item not found in AddToCart');
  }

  return result;
};

export const AddToCartService = {
  createAddToCart,
  getAllAddToCarts,
  removeItemAddToCart,
};
