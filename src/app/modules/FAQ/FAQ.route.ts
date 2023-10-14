import express from 'express';
import { FAQController } from './FAQ.controller';
import validateRequest from '../../middlewares/validateRequest';
import { FAQValidation } from './FAQ.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
const router = express.Router();

router.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(FAQValidation.createFAQZodValidation),
  FAQController.createFAQ
);

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
  FAQController.getSingleFAQ
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  FAQController.deleteFAQ
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(FAQValidation.updateFAQZodValidation),
  FAQController.updateFAQ
);

router.get('/', FAQController.getAllFAQs);

export const FAQRoutes = router;
