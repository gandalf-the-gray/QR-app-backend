import bcrypt from 'bcrypt';

export async function getHash(data) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(data, 12, (err, hash) => {
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });
}

export async function verifyHash(data, hash) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(data, hash, (err, isValid) => {
      if (err) {
        reject(err);
      } else {
        resolve(isValid);
      }
    });
  });
}
