import { Model } from 'mongoose';

export type IAddToCart = {
  tutorIds: string[];
  userEmail: string;
};

// AddToCart Model
export type AddToCartModel = Model<IAddToCart, Record<string, unknown>>;

export type IAddToCartFilters = {
  searchTerm?: string;
  tutorId?: string;
};
