const Video = require("../models/videos");

const create = function (req, res) {
  var newVideo = new Video(req.body);
  newVideo.save(function (err) {
    if (err) {
      res.status(400).send("Unable to save video to database");
    } else {
      res.redirect("/");
    }
  });
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

  const videos = await query.sort(sort).skip(skip).limit(limit).lean().exec();

  return {
    data: videos,
    meta: {
      page: page,
      limit: limit,
      sort: sort,
    },
  };
};

const update = async (id, payload) => {
  const video = await Video.findById(id).exec();
  if (!video) {
    throw new Error("Video not found");
  }

  Object.assign(video, payload);
  video.save();
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
