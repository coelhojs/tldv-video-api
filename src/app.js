const cookieParser = require("cookie-parser");
const errorHandler = require("errorhandler");
const express = require("express");
const logger = require("morgan");
const path = require("path");
const rfs = require("rotating-file-stream");

const indexRouter = require("./routes/index");

const app = express();
const port = process.env.PORT || 80;

require("./configs/database");

const accessLogStream = rfs.createStream("access.log", {
  interval: "1d", // rotate daily
  path: path.join(__dirname, "logs"),
});

if (process.env.NODE_ENV === "development") {
  app.use(errorHandler({ dumpExceptions: true, showStack: true }));
  app.use(logger("short", { stream: accessLogStream }));
} else if (process.env.NODE_ENV === "production") {
  app.use(express.errorHandler());
  app.use(logger("short", { stream: accessLogStream }));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", indexRouter);

const server = app.listen(port, () => {
  console.log(`Videos API listening on port ${port}`);
});

process.on("SIGTERM", () => {
  console.debug("SIGTERM signal received for closing the videos API server");

  server.close(() => {
    console.debug("API server closed");
  });
});

module.exports = app;
