/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import { IUser, IUserMethods, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../../config';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { roles } from './user.constants';

const userSchema = new Schema<IUser, Record<string, never>, IUserMethods>(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: roles,
      default: ENUM_USER_ROLE.USER,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    profileImage: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.methods.isUserExists = async function (
  email: string
): Promise<Pick<IUser, '_id' | 'email' | 'role' | 'password'> | null> {
  return await User.findOne({ email }, { email: 1, password: 1, role: 1 });
};

userSchema.methods.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

userSchema.pre('save', async function (next) {
  // hashing the password
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

export const User = model<IUser, UserModel>('User', userSchema);
