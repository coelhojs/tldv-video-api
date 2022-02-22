const cookieParser = require("cookie-parser");
const errorHandler = require("errorhandler");
const express = require("express");
const swaggerUi = require("swagger-ui-express");

const indexRouter = require("./routes/index");

const app = express();
const port = process.env.PORT || 80;

require("./configs/database");

if (process.env.NODE_ENV === "development") {
  app.use(errorHandler({ dumpExceptions: true, showStack: true }));
} else if (process.env.NODE_ENV === "production") {
  app.use(express.errorHandler());
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const swaggerDocument = require("./configs/swagger.json");

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    swaggerOptions: {
      validatorUrl: null,
    },
  })
);

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
