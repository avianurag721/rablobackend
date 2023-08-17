const mongoose = require("mongoose");

const product = new mongoose.Schema(
  {
    productName: {
      required: true,
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    featured: {
      type: Boolean,
      required: true,
    },
    rating: {
      type: Number,
    },
    company: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", product);
