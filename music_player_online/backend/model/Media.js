const mongoose = require("mongoose");

const videoSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    videos: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

const VideoModel = mongoose.model("Video", videoSchema);

module.exports = {
  VideoModel,
};
