import { Model } from 'mongoose';

export type IUpcomingService = {
  title: string;
  image: string;
  body: string;
};

export type UpcomingServiceModel = Model<
  IUpcomingService,
  Record<string, unknown>
>;
