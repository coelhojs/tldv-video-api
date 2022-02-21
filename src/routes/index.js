const express = require("express");
const router = express.Router();

const videos = require("./videos");

router.use("/videos", videos);

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/health", (req, res) => {
  try {
    return res.status(200).json({
      message: "API ok!",
      timestamp: Date.now(),
      uptime: process.uptime() + " seconds",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      stack: error.stack,
      timestamp: Date.now(),
    });
  }
});

module.exports = router;
