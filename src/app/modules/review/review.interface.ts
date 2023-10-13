import { Model } from 'mongoose';

export type IReview = {
  tutorId: string;
  name: string;
  email: string;
  rating: number;
  userProfileImage: string;
  review: string;
};

// Review Model
export type ReviewModel = Model<IReview, Record<string, unknown>>;

export type IReviewFilters = {
  searchTerm?: string;
  rating?: string;
};
