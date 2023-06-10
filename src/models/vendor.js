import mongoose from 'mongoose';
import { getHash } from '../libs/bcrypt.js';
import { addCommonUtils } from '../utils/mongoose.js';

const schema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    mobile: {
      country: {
        name: { type: String, required: true },
        code: { type: Number, required: true },
      },
      number: { type: Number, required: true, unique: true },
    },
    name: {
      first: { type: String, required: true },
      last: { type: String },
    },
    password: { type: String, required: true },
  },
  { timestamps: true, minimize: false },
);

addCommonUtils(schema);

// Hash password before saving
schema.pre('save', async function preSave(next) {
  const vendor = this;
  if (!vendor.isModified('password')) {
    next();
  } else {
    const hash = await getHash(vendor.password);
    if (hash) {
      vendor.password = hash;
      next();
    } else {
      next(new Error());
    }
  }
});

export default mongoose.model('Vendor', schema);
