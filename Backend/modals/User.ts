import {Schema, model} from 'mongoose';
import type { UserProps } from '../types.js';
const UserSchema = new Schema<UserProps>({
  email: {
    type: String,
    required: true, 
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,

  },
  name: {
    type: String,
    required: false,
  },
  avatar: {
    type: String,
    default: ""
  },
  created: {
    type: Date,
    required: false,
    default: Date.now
  }
});

const UserModel = model<UserProps>('User', UserSchema);
export default UserModel;
