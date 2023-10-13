import express from 'express';
import { FeedbackController } from './feedback.controller';
import validateRequest from '../../middlewares/validateRequest';
import { FeedbackValidation } from './feedback.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
const router = express.Router();

// Routes
router.post(
  '/create-feedback',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(FeedbackValidation.createFeedbackZodValidation),
  FeedbackController.createFeedback
);

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
  FeedbackController.getSingleFeedback
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
  FeedbackController.deleteFeedback
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
  validateRequest(FeedbackValidation.updateFeedbackZodValidation),
  FeedbackController.updateFeedback
);

router.get(
  '/my-feedbacks',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
  FeedbackController.getSingleFeedback
);

router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  FeedbackController.getAllFeedbacks
);

export const FeedbackRoutes = router;
