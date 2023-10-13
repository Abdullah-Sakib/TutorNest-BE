import { Schema, model } from 'mongoose';
import { IFAQ, FAQModel } from './FAQ.interface';

const FAQSchema = new Schema<IFAQ, FAQModel>(
  {
    title: {
      type: String,
      required: [true, 'title is missing!'],
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

export const FAQ = model<IFAQ, FAQModel>('FAQ', FAQSchema);
