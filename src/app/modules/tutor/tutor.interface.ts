import { Model } from 'mongoose';

export type ITutor = {
  name: string;
  image: string;
  phone: string;
  email: string;
  education: string;
  experience: number;
  location: string;
  description: string;
  fee: number;
  subjects: string[];
  available_slots: {
    slot: string;
    status: string;
  }[];
  category: string;
};

// Tutor Model
export type TutorModel = Model<ITutor, Record<string, unknown>>;

export type ITutorFilters = {
  searchTerm?: string;
  name?: string;
  location?: string;
  category?: string;
  minFee?: string;
  maxFee?: string;
};
