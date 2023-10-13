import { Model } from 'mongoose';

export type ILatestNews = {
  title: string;
  image: string;
  body: string;
};

export type LatestNewsModel = Model<ILatestNews, Record<string, unknown>>;
