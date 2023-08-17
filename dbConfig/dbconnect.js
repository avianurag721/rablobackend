
require("dotenv").config()
const dburl=process.env.DB_URL
const mongoose = require("mongoose");

exports.connect = () => {
  mongoose.connect(dburl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      family: 4,
    })
    .then(() => {
      console.log("connected with mongodb");
    })
    .catch(() => {
      console.log("connection with mongodb failed");
    });
};
