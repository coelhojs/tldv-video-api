const { body } = require("express-validator");

const validateVideoPayload = () => {
  return [
    body("name", "Video 'name' doesn't exist").exists({ checkFalsy: true }),
    body("url", "Video 'url' is invalid or missing").exists({ checkFalsy: true }).bail().isURL(),
    body("thumbnailUrl", "Video 'thumbnailUrl' is invalid or missing").exists({ checkFalsy: true }).bail().isURL(),
    body("isPrivate", "The field 'isPrivate' is of type boolean").optional({ checkFalsy: true }).isBoolean(),
    body("timesViewed", "The field 'timesViewed' must be of type integer").optional({ checkFalsy: true }).isInt(),
  ];
};

module.exports = {
  validateVideoPayload,
};
