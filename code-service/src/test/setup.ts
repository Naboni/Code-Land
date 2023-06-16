// import { MongoMemoryServer } from "mongodb-memory-server";

import request from "supertest";
import { app } from "../app";

beforeAll(async () => {
  jest.setTimeout(30000);
//   process.env.JWT_KEY = "asdfasdf";
//   process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

//   const mongo = await MongoMemoryServer.create();
//   const mongoUri = mongo.getUri();
//   await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  jest.setTimeout(20000);
  jest.clearAllMocks();
//   const collections = await mongoose.connection.db.collections();

//   for (let collection of collections) {
//     await collection.deleteMany({});
//   }
});

afterAll(async () => {
//   if (mongo) {
//     await mongo.stop();
//   }
//   await mongoose.connection.close();
});
