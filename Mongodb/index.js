const mongoose = require("mongoose");
require("dotenv").config();
console.log("url", process.env.DATABASE_URL);

const connectToDB = () => {
  mongoose
    .connect(`${process.env.DATABASE_URL}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));
};

module.exports = connectToDB;
