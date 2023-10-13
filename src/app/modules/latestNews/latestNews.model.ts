import { Schema, model } from 'mongoose';
import { ILatestNews, LatestNewsModel } from './latestNews.interface';

const LatestNewsSchema = new Schema<ILatestNews, LatestNewsModel>(
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

export const LatestNews = model<ILatestNews, LatestNewsModel>(
  'LatestNews',
  LatestNewsSchema
);
