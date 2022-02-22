const Video = require("../models/videos");

const create = async (payload) => {
  const newVideo = new Video(payload);
  const createdVideo = await newVideo.save();

  return createdVideo._id;
};

const list = async (page, limit, sort, onlyPublic = false, viewedMoreThan = 0) => {
  const skip = (page - 1) * limit;

  let query = null;

  if (onlyPublic) {
    query = Video.find({ isPrivate: false });
  } else {
    query = Video.find();
  }

  if (viewedMoreThan > 0) {
    query.where("timesViewed").gt(viewedMoreThan);
  }

  return query.sort(sort).skip(skip).limit(limit).lean().exec();
};

const update = async (id, payload) => {
  const video = await Video.findById(id).exec();
  if (!video) {
    throw new Error(`Video id ${id} not found. Unable to update.`);
  }

  Object.assign(video, payload);

  return video.save();
};

const remove = async (id) => {
  await Video.deleteOne({ _id: id });
};

module.exports = {
  create,
  list,
  update,
  remove,
};
