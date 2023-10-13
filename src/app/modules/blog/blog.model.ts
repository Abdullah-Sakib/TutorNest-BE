import { Schema, model } from 'mongoose';
import { IBlog, BlogModel } from './blog.interface';

// Review Schema
const ReviewSchema = new Schema<IBlog, BlogModel>(
  {
    title: {
      type: String,
      required: [true, 'title is missing!'],
    },
    image: {
      type: String,
      required: [true, 'image is missing!'],
    },
    body: {
      type: String,
      required: [true, 'body is missing!'],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Blog = model<IBlog, BlogModel>('Blog', ReviewSchema);
