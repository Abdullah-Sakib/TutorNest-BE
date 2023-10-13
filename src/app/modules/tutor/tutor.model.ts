import { Schema, model } from 'mongoose';
import { ITutor, TutorModel } from './tutor.interface';
import { categories } from './tutor.constants';

// Tutor Schema
const TutorSchema = new Schema<ITutor, TutorModel>(
  {
    name: {
      type: String,
      required: [true, 'name is missing!'],
    },
    image: {
      type: String,
      required: [true, 'image is missing!'],
    },
    phone: {
      type: String,
      required: [true, 'phone is missing!'],
    },
    email: {
      type: String,
      required: [true, 'email is missing!'],
    },
    education: {
      type: String,
      required: [true, 'education is missing!'],
    },
    experience: {
      type: Number,
      required: [true, 'experience is missing!'],
    },
    location: {
      type: String,
      required: [true, 'location is missing!'],
    },
    description: {
      type: String,
      required: [true, 'description is missing!'],
    },
    fee: {
      type: Number,
      required: [true, 'fee is missing!'],
    },
    subjects: [
      {
        type: String,
        required: [true, 'subjects is missing!'],
      },
    ],
    available_slots: [
      {
        slot: {
          type: String,
          required: [true, 'slot is missing!'],
        },
        status: {
          type: String,
          default: 'pending',
        },
      },
    ],
    category: {
      type: String,
      enum: categories,
      required: [true, 'category is missing!'],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Tutor = model<ITutor, TutorModel>('Tutor', TutorSchema);
