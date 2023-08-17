const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      enum: ["Admin", "Customer"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", User);
