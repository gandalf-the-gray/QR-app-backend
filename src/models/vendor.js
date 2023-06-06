import mongoose from 'mongoose';
import { preInitClean } from '../utils/mongoose.js';

const schema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    phoneNo: { type: String, required: true, unique: true },
    name: {
      first: { type: String, required: true },
      last: { type: String },
    },
    password: { type: String, required: true },
  },
  { timestamps: true, minimize: false },
);

schema.pre('init', preInitClean);

export default mongoose.model('Vendor', schema);
