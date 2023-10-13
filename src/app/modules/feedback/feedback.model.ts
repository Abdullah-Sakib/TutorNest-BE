import { Schema, model } from 'mongoose';
import { IFeedback, FeedbackModel } from './feedback.interface';

// Feedback Schema
const FeedbackSchema = new Schema<IFeedback, FeedbackModel>(
  {
    name: {
      type: String,
      required: [true, 'name is missing!'],
    },
    email: {
      type: String,
      required: [true, 'email is missing!'],
    },
    message: {
      type: String,
      required: [true, 'message is missing!'],
    },
    userProfileImage: {
      type: String,
    },
    approved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Feedback = model<IFeedback, FeedbackModel>(
  'Feedback',
  FeedbackSchema
);
