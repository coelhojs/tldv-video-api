const mongoose = require("mongoose");

const { CONNECTION_STRING } = process.env;

const options = {
  useNewUrlParser: true,
  connectTimeoutMS: 10000,
};

mongoose
  .connect(CONNECTION_STRING, options)
  .then(function () {
    console.log("MongoDB is connected");
  })
  .catch(function (err) {
    console.error(err);
  });
