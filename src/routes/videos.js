const express = require("express");
const router = express.Router();
const { validationResult } = require("express-validator");

const validator = require("../utils/validator");
const videoController = require("../controllers/videos");

router.get("/", async (req, res) => {
  try {
    const viewedMoreThan = parseInt(req.query.viewedMoreThan) || 0;
    const onlyPublic = req.query.public === "true";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sort = req.query.sort || "name";

    const videosList = await videoController.list(page, limit, sort, onlyPublic, viewedMoreThan);

    return res.status(200).json(videosList);
  } catch (error) {
    return res.status(500).json({ error: error.message, stack: error.stack });
  }
});

router.post("/", function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).jsonp(errors.array());
  }

  videoController.create(req, res);
});

router.put("/:id", validator.validateVideoPayload(), async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).jsonp(errors.array());
    }

    const id = req.params.id;
    const payload = req.body;

    await videoController.update(id, payload);

    res.status(200).json({ message: "Video updated!" });
  } catch (error) {
    res.status(500).json({ error: error.message, stack: error.stack });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    await videoController.delete(id);

    res.status(200).json({ message: `Video ${id} deleted!` });
  } catch (error) {
    res.status(500).json({ error: error.message, stack: error.stack });
  }
});

module.exports = router;
