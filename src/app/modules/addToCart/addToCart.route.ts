import express from 'express';
import { AddToCartController } from './addToCart.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AddToCartValidation } from './addToCart.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
const router = express.Router();

// Routes
router.post(
  '/',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(AddToCartValidation.createAndDeleteAddToCartZodValidation),
  AddToCartController.createAddToCart
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(AddToCartValidation.createAndDeleteAddToCartZodValidation),
  AddToCartController.removeItemAddToCart
);

router.get('/', AddToCartController.getAllAddToCarts);

export const AddToCartRoutes = router;
