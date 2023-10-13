import express from 'express';
import { NotificationController } from './notification.controller';
import validateRequest from '../../middlewares/validateRequest';
import { NotificationValidation } from './notification.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
const router = express.Router();

router.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(NotificationValidation.createNotificationZodValidation),
  NotificationController.createNotification
);

router.get('/:id', NotificationController.getSingleNotification);

router.get(
  '/:userId',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
  NotificationController.getSingleUserNotifications
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  NotificationController.deleteNotification
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(NotificationValidation.updateNotificationZodValidation),
  NotificationController.updateNotification
);

router.get('/', NotificationController.getAllNotifications);

export const NotificationRoutes = router;
