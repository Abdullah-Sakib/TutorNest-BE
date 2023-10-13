import { Model } from 'mongoose';

export type INotification = {
  userId: string;
  title: string;
  body: string;
  type: string;
};

export type NotificationModel = Model<INotification, Record<string, unknown>>;
