if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
}

const app = require("../src/app");
const assert = require("assert");
const request = require("supertest");

describe("Testing video endpoints", () => {
  it("Should return a list of videos", async () => {
    const res = await request(app).get("/api/videos").send();

    assert.equal(res.statusCode === 200, true);
    assert.equal(Array.isArray(res.body.data), true);
  });

  it("Should return a list of only public videos", async () => {
    const res = await request(app).get("/api/videos?public=true&limit=10000").send();

    assert.equal(res.statusCode === 200, true);
    assert.equal(
      res.body.data.every((video) => video.isPrivate === false),
      true
    );
  });

  it("Should return a list of videos viewed more than 42 times", async () => {
    const res = await request(app).get("/api/videos?viewedMoreThan=42&sort=timesViewed&limit=10000").send();

    assert.equal(res.statusCode === 200, true);
    assert.equal(
      res.body.data.every((video) => video.timesViewed > 42),
      true
    );
  });

  it("Should create a new video", async () => {
    const res = await request(app)
      .post("/api/videos")
      .send({
        name: "Test" + Date.now().toLocaleString(),
        url: "https://test.com",
        thumbnailUrl: "http://placeimg.com/640/480",
        isPrivate: false,
        timesViewed: parseInt(Math.random() * 100),
      });
    assert.equal(res.statusCode === 200, true);
  });

  it("Should update an existing video", async () => {
    const existingVideos = await request(app).get("/api/videos").send();

    const res = await request(app)
      .put(`/api/videos/${existingVideos.body.data[0]._id}`)
      .send({
        name: "Test" + Date.now().toLocaleString(),
        url: "https://test-updated.com",
        isPrivate: true,
        timesViewed: parseInt(Math.random() * 100),
      });

    assert.equal(res.statusCode === 200, true);
  });

  it("Should delete an existing video", async () => {
    const existingVideos = await request(app).get("/api/videos").send();

    const res = await request(app).delete(`/api/videos/${existingVideos.body.data[0]._id}`).send();

    assert.equal(res.statusCode === 200, true);
  });
});

describe("Testing API general endpoints", () => {
  it("Should return an JSON object with the fields message, timestamp and uptime.", async () => {
    const res = await request(app).get("/api/health").send();

    assert.equal(res.statusCode === 200, true);
    assert.equal(Object.prototype.hasOwnProperty.call(res.body, "message"), true);
    assert.equal(Object.prototype.hasOwnProperty.call(res.body, "timestamp"), true);
    assert.equal(Object.prototype.hasOwnProperty.call(res.body, "uptime"), true);
  });
});
