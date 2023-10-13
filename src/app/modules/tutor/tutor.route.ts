import express from 'express';
import { TutorController } from './tutor.controller';
import validateRequest from '../../middlewares/validateRequest';
import { TutorValidation } from './tutor.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
const router = express.Router();

// Routes
router.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(TutorValidation.createTutorZodValidation),
  TutorController.createTutor
);

router.get('/:id', TutorController.getSingleTutor);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  TutorController.deleteTutor
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(TutorValidation.updateTutorZodValidation),
  TutorController.updateTutor
);

router.get('/', TutorController.getAllTutors);

export const TutorRoutes = router;
