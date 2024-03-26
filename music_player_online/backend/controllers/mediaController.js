const { VideoModel } = require("../model/Media");

const getAll = async (req, res) => {
  try {
    const media = await VideoModel.find();
    res.json(media);
  } catch (err) {
    console.error("Error getting all videos:", err);
    res.status(400).json({ error: "Failed to get videos" });
  }
};

const create = async (req, res) => {
  const { title } = req.body;
  let videoPaths = [];
  
  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }
  
  if (req.files && req.files.length > 0) {
    for (let video of req.files) {
      videoPaths.push("/videos/" + video.filename);
    }
  }

  try {
    const createMedia = await VideoModel.create({
      title,
      videos: videoPaths,
    });
    res.status(201).json({ message: "Successfully created", media: createMedia });
  } catch (err) {
    console.error("Error creating video:", err);
    res.status(400).json({ error: "Failed to create video" });
  }
};

module.exports = {
  getAll,
  create,
};
