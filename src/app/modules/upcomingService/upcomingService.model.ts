import { Schema, model } from 'mongoose';
import {
  IUpcomingService,
  UpcomingServiceModel,
} from './upcomingService.interface';

const UpcomingServiceSchema = new Schema<
  IUpcomingService,
  UpcomingServiceModel
>(
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

export const UpcomingService = model<IUpcomingService, UpcomingServiceModel>(
  'UpcomingService',
  UpcomingServiceSchema
);
