import express from 'express';
import { LatestNewsController } from './latestNews.controller';
import validateRequest from '../../middlewares/validateRequest';
import { LatestNewsValidation } from './latestNews.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
const router = express.Router();

router.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(LatestNewsValidation.createLatestNewsZodValidation),
  LatestNewsController.createLatestNews
);

router.get('/:id', LatestNewsController.getSingleLatestNews);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  LatestNewsController.deleteLatestNews
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(LatestNewsValidation.updateLatestNewsZodValidation),
  LatestNewsController.updateLatestNews
);

router.get('/', LatestNewsController.getAllLatestNewss);

export const LatestNewsRoutes = router;
