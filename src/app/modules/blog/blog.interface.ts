import { Model } from 'mongoose';

export type IBlog = {
  title: string;
  image: string;
  body: string;
};

export type BlogModel = Model<IBlog, Record<string, unknown>>;
