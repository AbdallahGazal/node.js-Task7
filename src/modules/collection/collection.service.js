import { db } from "../../DB/connection.db.js";

export const createBooksCollection = async () => {
  await db.createCollection("book", {
    validator: {
      $and: [
        {
          title: {
            $type: "string",
          },
        },
      ],
    },
  });
  return "ok";
};

export const createAuthorsCollection = async (inputs) => {
  return await db.collection("authors").insertOne(inputs);
};

export const createLogsCollection = async () => {
  await db.createCollection("logs", {
    capped: true,
    size: 1024,
  });
  return { ok: 1 };
};

export const createBooksIndex = async () => {
  await db.collection("book").createIndex({ title: 1 });
  return { ok: 1 };
};

export const insertOneBook = async (inputs) => {
  const data = await db.collection("book").insertOne(inputs);
  return data;
};
export const insertMultipleBooks = async (inputs) => {
  if (inputs.length < 3)
    throw new Error("Must insert at least 3 books.", {
      cause: { status: 409 },
    });
  const data = await db.collection("book").insertMany(inputs);
  return data;
};
export const insertLog = async (inputs) => {
  return await db.collection("logs").insertOne(inputs);
};

export const updateBookYear = async () => {
  return await db
    .collection("book")
    .updateOne({ title: "Future" }, { $set: { year: 2022 } });
};
export const findBookByTitle = async (title) => {
  return await db.collection("book").findOne({ title });
};
export const findBookByYears = async (from, to) => {
  return await db
    .collection("book")
    .find({
      $and: [
        {
          year: {
            $gt: parseInt(from),
          },
        },
        {
          year: {
            $lt: parseInt(to),
          },
        },
      ],
    })
    .toArray();
};
export const findBooksByGenre = async (genre) => {
  return await db
    .collection("book")
    .find({
      genres: {
        $elemMatch: {
          $eq: genre,
        },
      },
    })
    .toArray();
};

export const getBooksSkipLimit = async () => {
  return await db
    .collection("book")
    .find({})
    .skip(2)
    .limit(3)
    .sort({ year: -1 })
    .toArray();
};

export const getBooksWithIntegerYear = async () => {
  return await db
    .collection("book")
    .find({ year: { $type: 16 } })
    .toArray();
};

export const findBooksExcludeGenres = async () => {
  return await db
    .collection("book")
    .find({
      $nor: [
        {
          genres: {
            $elemMatch: { $eq: "Horror" },
          },
        },
        {
          genres: {
            $elemMatch: { $eq: "Science Fiction" },
          },
        },
      ],
    })
    .toArray();
};

export const deleteBooksBeforeYear = async (year) => {
  return await db.collection("book").deleteMany({
    year: {
      $lt: parseInt(year),
    },
  });
};

export const filterNewBooksDesc = async () => {
  return await db
    .collection("book")
    .aggregate([{ $match: { year: { $gt: 2000 } } }, { $sort: { year: -1 } }])
    .toArray();
};

export const filterNewBooksWithProjection = async () => {
  return await db
    .collection("book")
    .aggregate([
      {
        $match: {
          year: {
            $gt: 2000,
          },
        },
      },
      {
        $project: {
          title: 1,
          author: 1,
          year: 1,
          _id: 0,
        },
      },
    ])
    .toArray();
};

export const getBooksGenresUnwind = async () => {
  return await db
    .collection("book")
    .aggregate([
      {
        $project: {
          title: 1,
          genres: 1,
          _id: 0,
        },
      },
      {
        $unwind: {
          path: "$genres",
        },
      },
    ])
    .toArray();
};

export const getLogsJoinBook = async () => {
  return await db
    .collection("logs")
    .aggregate([
      {
        $lookup: {
          localField: "book_id",
          from: "book",
          foreignField: "_id",
          as: "book_details",
          pipeline: [
            {
              $project: {
                title: 1,
                author: 1,
                year: 1,
                _id: 0,
              },
            },
          ],
        },
      },
      {
        $project: {
          _id: 0,
          book_id: 0,
        },
      },
    ])
    .toArray();
};
