const mongoose = require("mongoose");
const { Schema } = mongoose;

const reviewSchema = new Schema(
  {
    comment: {
      type: String,
      require,
    },
    star: {
      type: Number,
      require,
    },
    user: {},
  },
  { timestamps: true }
);

const reviewModel = mongoose.model("reviews", reviewSchema);

module.exports = reviewModel;
