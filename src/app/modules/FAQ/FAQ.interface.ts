import { Model } from 'mongoose';

export type IFAQ = {
  title: string;
  body: string;
};

export type FAQModel = Model<IFAQ, Record<string, unknown>>;
