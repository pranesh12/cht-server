const mongoose = require("mongoose");
const { Schema } = mongoose;

const tourguideSchema = new Schema(
  {
    district: {
      type: String,
      require,
    },
    place: {
      type: String,
      require,
    },

    info: {},
  },
  { timestamps: true }
);

const tourGuideModel = mongoose.model("tourguides", tourguideSchema);

module.exports = tourGuideModel;
