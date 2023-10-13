/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, RequestHandler, Response } from 'express';
import { BlogService } from './blog.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IBlog } from './blog.interface';
import { paginationFields } from '../../../constants/pagination';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { pick } from '../../../shared/pick';
import { jwtHelper } from '../../../helper/jwtHelper';

// Create Review
const createBlog: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const token: any = req.headers.authorization;
    const verifiedUser = jwtHelper.verifyToken(
      token,
      config.jwt.secret as Secret
    );

    const { ...reviewData } = req.body;

    const result = await BlogService.createBlog(reviewData, verifiedUser);

    // Send Response
    sendResponse<IBlog>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Blog Created Successfully',
      data: result,
    });
  }
);

// Get all reviews
const getAllBlogs: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const paginationOptions = pick(req.query, paginationFields);

    const result = await BlogService.getAllBlogs(paginationOptions);

    // Send Response
    sendResponse<IBlog[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Blogs retrieved Successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);

// Get single Review by id
const getSingleBlog: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await BlogService.getSingleBlog(id);

  // Send Response
  sendResponse<IBlog>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single book retrived successfully',
    data: result,
  });
});

// Update Review
const updateBlog: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;

  const result = await BlogService.updateBlog(id, updateData);

  sendResponse<IBlog>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog updated successfully',
    data: result,
  });
});

// Delete Review
const deleteBlog: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await BlogService.deleteBlog(id);

  sendResponse<IBlog>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog deleted successfully',
    data: result,
  });
});

export const BlogController = {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
};
