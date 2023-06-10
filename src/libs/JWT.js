import JWT from 'jsonwebtoken';

const { JWT_SECRET_KEY } = process.env;

export async function getToken(data) {
  return new Promise((resolve, reject) => {
    JWT.sign(data, JWT_SECRET_KEY, (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
}

export async function verifyToken(token) {
  return new Promise((resolve, reject) => {
    JWT.verify(token, JWT_SECRET_KEY, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}
