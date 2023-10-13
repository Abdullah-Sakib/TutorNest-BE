/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { SortOrder } from 'mongoose';
import { IBlog } from './blog.interface';
import { Blog } from './blog.model';
import httpStatus from 'http-status';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { User } from '../user/user.model';
import { paginationHelper } from '../../../helper/paginationHelper';
import ApiError from '../../../errors/ApiError';

// Create Blog
const createBlog = async (
  payload: IBlog,
  verifiedUser: any
): Promise<IBlog | null> => {
  const user = await User.find({ _id: verifiedUser.id });

  if (user.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const result = await Blog.create(payload);
  return result;
};

// Get All Blogs
const getAllBlogs = async (
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IBlog[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const sortCondition: '' | { [key: string]: SortOrder } = sortBy &&
    sortOrder && { [sortBy]: sortOrder };

  const result = await Blog.find({})
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await Blog.countDocuments({});

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// Get Single Blog
const getSingleBlog = async (id: string): Promise<IBlog | null> => {
  const result = await Blog.findById({ _id: id });

  return result;
};

const updateBlog = async (
  id: string,
  payload: Partial<IBlog>
): Promise<IBlog | null> => {
  const isExist = await Blog.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Blog not found');
  }

  const result = await Blog.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

// Delete Blog
const deleteBlog = async (id: string): Promise<IBlog | null> => {
  const result = await Blog.findByIdAndDelete(id);
  if (!result) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Blog Not Found');
  }
  return result;
};

export const BlogService = {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
};
