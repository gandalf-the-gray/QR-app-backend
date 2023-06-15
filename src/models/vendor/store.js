import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: null },
  categories: { type: [categorySchema] },
});

export default mongoose.model('Store', schema);
