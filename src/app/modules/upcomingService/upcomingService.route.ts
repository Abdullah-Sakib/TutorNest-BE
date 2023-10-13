import express from 'express';
import { UpcomingServiceController } from './upcomingService.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UpcomingServiceValidation } from './upcomingService.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
const router = express.Router();

router.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(UpcomingServiceValidation.createUpcomingServiceZodValidation),
  UpcomingServiceController.createUpcomingService
);

router.get('/:id', UpcomingServiceController.getSingleUpcomingService);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  UpcomingServiceController.deleteUpcomingService
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(UpcomingServiceValidation.updateUpcomingServiceZodValidation),
  UpcomingServiceController.updateUpcomingService
);

router.get('/', UpcomingServiceController.getAllUpcomingServices);

export const UpcomingServiceRoutes = router;
