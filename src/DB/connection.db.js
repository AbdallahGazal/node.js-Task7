import { MongoClient } from "mongodb";
import { DB_NAME, DB_URI } from "../config.js";

export const client = new MongoClient(DB_URI, {
  // serverSelectionTimeoutMS: 5000,
});

export const bootstrapDB = async (app, PORT) => {
  try {
    await client.connect();
    console.log(`DB connected successfully 🌷`);
    app.listen(PORT, () =>
      console.log(`Example app listening on port ${PORT}!`),
    );
  } catch (error) {
    console.log(error);
    console.log("Failed to connect on DB ❌");
  }
};

export const db = client.db(DB_NAME)