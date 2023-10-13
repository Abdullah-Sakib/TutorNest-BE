import { Schema, model } from 'mongoose';
import { IAddToCart, AddToCartModel } from './addToCart.interface';

// AddToCart Schema
const AddToCartSchema = new Schema<IAddToCart, AddToCartModel>(
  {
    tutorIds: [
      {
        type: String,
        required: [false, 'tutorId is missing!'],
      },
    ],
    userEmail: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const AddToCart = model<IAddToCart, AddToCartModel>(
  'AddToCart',
  AddToCartSchema
);
