import { Router } from "express";
import { successResponse } from "../../common/utils/success.response.js";
import {
  createAuthorsCollection,
  createBooksCollection,
  createBooksIndex,
  createLogsCollection,
  deleteBooksBeforeYear,
  filterNewBooksDesc,
  filterNewBooksWithProjection,
  findBookByTitle,
  findBookByYears,
  findBooksByGenre,
  findBooksExcludeGenres,
  getBooksGenresUnwind,
  getBooksSkipLimit,
  getBooksWithIntegerYear,
  getLogsJoinBook,
  insertLog,
  insertMultipleBooks,
  insertOneBook,
  updateBookYear,
} from "./collection.service.js";

const router = Router();

router.post("/collection/books", async (req, res, next) => {
  const data = await createBooksCollection();
  return successResponse({ res, data });
});
router.post("/collection/authors", async (req, res, next) => {
  const data = await createAuthorsCollection(req.body);
  return successResponse({ res, data });
});
router.post("/collection/logs/capped", async (req, res, next) => {
  const data = await createLogsCollection();
  return successResponse({ res, data });
});
router.post("/collection/books/index", async (req, res, next) => {
  const data = await createBooksIndex();
  return successResponse({ res, data });
});

router.post("/books", async (req, res, next) => {
  const data = await insertOneBook(req.body);
  return successResponse({ res, data });
});
router.post("/books/batch", async (req, res, next) => {
  const data = await insertMultipleBooks(req.body);
  return successResponse({ res, data });
});
router.post("/logs", async (req, res, next) => {
  const data = await insertLog(req.body);
  return successResponse({ res, data });
});
router.patch("/books/Future", async (req, res, next) => {
  const data = await updateBookYear(req.body);
  return successResponse({ res, data });
});
router.get("/books/title", async (req, res, next) => {
  const data = await findBookByTitle(req.query.title);
  return successResponse({ res, data });
});
router.get("/books/year", async (req, res, next) => {
  const data = await findBookByYears(req.query.from, req.query.to);
  return successResponse({ res, data });
});
router.get("/books/genre", async (req, res, next) => {
  const data = await findBooksByGenre(req.query.genre);
  return successResponse({ res, data });
});
router.get("/books/skip-limit", async (req, res, next) => {
  const data = await getBooksSkipLimit();
  return successResponse({ res, data });
});
router.get("/books/year-integer", async (req, res, next) => {
  const data = await getBooksWithIntegerYear();
  return successResponse({ res, data });
});
router.get("/books/exclude-genres", async (req, res, next) => {
  const data = await findBooksExcludeGenres();
  return successResponse({ res, data });
});
router.delete("/books/before-year", async (req, res, next) => {
  const data = await deleteBooksBeforeYear(req.query.year);
  return successResponse({ res, data });
});
router.get("/books/aggregate1", async (req, res, next) => {
  const data = await filterNewBooksDesc();
  return successResponse({ res, data });
});
router.get("/books/aggregate2", async (req, res, next) => {
  const data = await filterNewBooksWithProjection();
  return successResponse({ res, data });
});
router.get("/books/aggregate3", async (req, res, next) => {
  const data = await getBooksGenresUnwind();
  return successResponse({ res, data });
});
router.get("/books/aggregate4", async (req, res, next) => {
  const data = await getLogsJoinBook();
  return successResponse({ res, data });
});

export default router;
