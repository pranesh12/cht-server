const mongoose = require("mongoose");
const { Schema } = mongoose;

const articleSchema = new Schema(
  {
    header: {
      type: String,
      require,
    },
    category: {
      type: String,
      require,
    },
    writer: {
      type: String,
      require,
    },
    data: {},
  },
  { timestamps: true }
);

const articleModel = mongoose.model("articles", articleSchema);

module.exports = articleModel;
