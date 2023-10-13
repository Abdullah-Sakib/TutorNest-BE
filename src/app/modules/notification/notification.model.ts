import { Schema, model } from 'mongoose';
import { INotification, NotificationModel } from './notification.interface';
import { types } from './notification.constants';

const NotificationSchema = new Schema<INotification, NotificationModel>(
  {
    userId: {
      type: String,
      required: [true, 'userId is missing!'],
    },
    title: {
      type: String,
      required: [true, 'title is missing!'],
    },
    body: {
      type: String,
      required: [true, 'body is missing!'],
    },
    type: {
      type: String,
      enum: types,
      required: [true, 'type is missing!'],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Notification = model<INotification, NotificationModel>(
  'Notification',
  NotificationSchema
);
