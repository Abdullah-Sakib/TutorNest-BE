import express from 'express';
import { ReviewController } from './review.controller';
import validateRequest from '../../middlewares/validateRequest';
import { ReviewValidation } from './review.validation';
const router = express.Router();

// Routes
router.post(
  '/',
  validateRequest(ReviewValidation.createReviewZodValidation),
  ReviewController.createReview
);

router.get('/:id', ReviewController.getSingleReview);

router.get('/:tutorId/tutor-reviews', ReviewController.getSingleTutorReview);

router.delete('/:id', ReviewController.deleteReview);

router.patch(
  '/:id',
  validateRequest(ReviewValidation.updateReviewZodValidation),
  ReviewController.updateReview
);

router.get('/', ReviewController.getAllReviews);

export const ReviewRoutes = router;
