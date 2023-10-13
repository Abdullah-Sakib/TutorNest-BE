import express from 'express';
import { BlogController } from './blog.controller';
import validateRequest from '../../middlewares/validateRequest';
import { BlogValidation } from './blog.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
const router = express.Router();

router.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(BlogValidation.createBlogZodValidation),
  BlogController.createBlog
);

router.get('/:id', BlogController.getSingleBlog);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  BlogController.deleteBlog
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(BlogValidation.updateBlogZodValidation),
  BlogController.updateBlog
);

router.get('/', BlogController.getAllBlogs);

export const BlogRoutes = router;
