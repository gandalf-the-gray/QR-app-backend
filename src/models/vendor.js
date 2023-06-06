import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
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

schema.pre('save', function preSave(next) {
  const vendor = this;
  if (!vendor.isModified('password')) {
    next();
  } else {
    bcrypt.hash(vendor.password, 12, (err, hash) => {
      if (err) {
        next(err);
      } else {
        vendor.password = hash;
        next();
      }
    });
  }
});

export default mongoose.model('Vendor', schema);
