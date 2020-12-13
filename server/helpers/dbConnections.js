const mongoose = require("mongoose");

async function dbConnection() {
  return new Promise((resolve, reject) => {
    mongoose.connect(
      process.env.MONGO_URL,
      { useNewUrlParser: true, useUnifiedTopology: true },
      (err) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve("connected");
        }
      }
    );
    return;
  });
}
module.exports = dbConnection;
