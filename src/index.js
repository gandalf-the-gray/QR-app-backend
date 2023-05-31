import express from 'express';

const PORT = process.env.PORT || 9000;

const app = express();

app.listen(PORT, (err) => {
  console.log(err || `listening to port ${PORT}`);
});
