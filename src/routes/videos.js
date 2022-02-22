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

    return res.status(200).json({
      data: videosList,
      meta: {
        page: page,
        limit: limit,
        sort: sort,
      },
    });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
      return res.status(500).json({ error: error.message, stack: error.stack });
    } else {
      return res.status(500).send("An error occurred while trying to process the request. Please try again later.");
    }
  }
});

router.post("/", validator.validateVideoCreation(), async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json(errors.array());
    }
    const videoId = await videoController.create(req.body);

    return res.status(200).json({ id: videoId, message: "Video created successfully!" });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
      return res.status(500).json({ error: error.message, stack: error.stack });
    } else {
      return res.status(500).send("An error occurred while trying to process the request. Please try again later.");
    }
  }
});

router.put("/:id", validator.validateVideoUpdate(), async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json(errors.array());
    }

    const id = req.params.id;
    const payload = req.body;

    await videoController.update(id, payload);

    res.status(200).json({ id: id, message: `Video ${id} updated!` });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
      return res.status(500).json({ error: error.message, stack: error.stack });
    } else {
      return res.status(500).send("An error occurred while trying to process the request. Please try again later.");
    }
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    await videoController.remove(id);

    res.status(200).json({ id: id, message: `Video ${id} deleted!` });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
      return res.status(500).json({ error: error.message, stack: error.stack });
    } else {
      return res.status(500).send("An error occurred while trying to process the request. Please try again later.");
    }
  }
});

module.exports = router;
