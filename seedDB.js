require("dotenv").config();

const faker = require("@withshepherd/faker");
const MongoClient = require("mongodb").MongoClient;

const videosCount = 1000;

async function seedDB() {
  const uri = process.env.CONNECTION_STRING;
  const dbName = process.env.DB_NAME;
  const collectionName = process.env.COLLECTION_NAME;

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
  });

  try {
    await client.connect();
    console.log("Connected correctly to server");

    const collection = client.db(dbName).collection(collectionName);

    await collection.drop();

    let videos = [];

    for (let i = 0; i < videosCount; i++) {
      const video = {
        name: faker.lorem.sentence(),
        url: faker.internet.url(),
        thumbnailUrl: faker.image.imageUrl(),
        isPrivate: faker.datatype.boolean(),
        timesViewed: faker.datatype.number(),
      };

      videos.push(video);
    }
    await collection.insertMany(videos);

    console.log("Database seeded! :)");
    await client.close();
  } catch (err) {
    console.log(err);
  }
}

seedDB();
