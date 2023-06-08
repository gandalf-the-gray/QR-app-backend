import express from 'express';
import mongoose from 'mongoose';
import vendorRouter from './routes/vendor/index.js';
import 'dotenv/config';

const PORT = process.env.PORT || 9000;
const app = express();

app.use(express.json());

app.use('/vendors', vendorRouter);

async function connectDB() {
  try {
    const { DB_USERNAME: username, DB_PASSWORD: password } = process.env;
    await mongoose.connect(
      `mongodb+srv://${username}:${password}@cluster0.z0byrzc.mongodb.net/`,
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
