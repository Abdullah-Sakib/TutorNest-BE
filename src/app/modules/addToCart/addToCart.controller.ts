/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, RequestHandler, Response } from 'express';
import { AddToCartService } from './addToCart.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IAddToCart } from './addToCart.interface';
import { ITutor } from '../tutor/tutor.interface';

// Create AddToCart
const createAddToCart: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user;
    const { tutorId } = req.body;

    const result = await AddToCartService.createAddToCart(tutorId, user);

    // Send Response
    sendResponse<IAddToCart>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Added to Cart Successfully',
      data: result,
    });
  }
);

// Get all addToCarts
const getAllAddToCarts: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user;

    const result = await AddToCartService.getAllAddToCarts(user);

    // Send Response
    sendResponse<ITutor[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Carts data retrieved Successfully',
      data: result,
    });
  }
);

// Delete AddToCart
const removeItemAddToCart: RequestHandler = catchAsync(async (req, res) => {
  const user = req.user;
  const { tutorId } = req.body;

  const result = await AddToCartService.removeItemAddToCart(user, tutorId);

  sendResponse<IAddToCart>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'tutor removed from cart successfully',
    data: result,
  });
});

export const AddToCartController = {
  createAddToCart,
  getAllAddToCarts,
  removeItemAddToCart,
};
