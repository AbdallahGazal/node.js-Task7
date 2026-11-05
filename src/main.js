import express from "express";
import {  } from "./modules/index.js";
import { globalErrorHandling } from "./middleware/index.js";
import { PORT } from "./config.js";
import { bootstrapDB } from "./DB/connection.db.js";
import { collectionController } from "./modules/collection/index.js";

const app = express();
bootstrapDB(app, PORT)

app.use(express.json());

app.all("/", (req, res) => res.status(200).send("Welcome to BE 🌷"));

app.use('/', collectionController)

app.all("{/*dummy}", (req, res) => res.status(404).send("Error 404, Invalid Routing.") )

app.use(globalErrorHandling);


