import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';

const PORT = process.env.PORT || 9000;

const app = express();

async function connectDB() {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.z0byrzc.mongodb.net/`,
    );
  } catch (e) {
    //
  } finally {
    if (mongoose.connection.readyState !== 1) {
      setTimeout(connectDB, 1500);
    } else {
      // eslint-disable-next-line no-console
      console.log('DB connection established');
    }
  }
}

connectDB();

app.listen(PORT, (err) => {
  // eslint-disable-next-line no-console
  console.log(err || `listening to port ${PORT}`);
});
