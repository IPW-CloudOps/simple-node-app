import express from "express";
import logger from "./src/utils/logger.mjs";
import TimeAgo from "javascript-time-ago";
import en from 'javascript-time-ago/locale/en';
import * as path from "path";
import { fileURLToPath } from 'url';
import db_conn, { connect } from "./src/db/index.mjs";
import Bookmark from "./src/models/bookmark.mjs";
import sequelize from "sequelize";
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

TimeAgo.addDefaultLocale(en);

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, 'public')))
app.set("views", "./src/views");
app.set("view engine", "pug");
app.locals = {
  title: "My Bookmark Website"
};

app.use((req, _, next) => {
  logger.info(
    `${new Date().toTimeString().split(" ")[0]}: ${req.method} ${req.url}`
  );
  next()
});

const timeAgo = new TimeAgo("en-US");
app.get("/", async (_, res) => {

  /** @type {import("./types").Bookmark[]} */
  const entries = (await Bookmark.findAll()).map(el => {
    return {
      id: el.id,
      link: el.link,
      time_ago: timeAgo.format(el.createdAt)
    }
  });
  res.render("index.pug", {
    entries: entries
  })
});

app.post("/create", async (req, res) => {
  const { link } = req.body;

  if (!link || typeof link !== 'string') {
    return res.status(400).json({ error: 'Bad Request: "link" must be a string and is required.' });
  }

  try {
    await Bookmark.create({ link });

    res.status(200).json({ message: 'Bookmark created successfully.' });
  } catch (error) {
    if (error instanceof sequelize.UniqueConstraintError) {
      res.status(409).json({ error: 'Conflict: Duplicate link.' });
    } else {
      console.error('Error creating bookmark:', error);
      res.status(500).json({ error: 'Internal Server Error: Something went wrong.' });
    }
  }
});

app.post("/delete", async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'Bad Request: "id" must be provided.' });
  }

  try {
    const result = await Bookmark.destroy({
      where: {
        id
      }
    });

    if (result === 0) {
      return res.status(404).json({ error: 'Not Found: Bookmark does not exist.' });
    }

    res.status(200).json({ message: 'Bookmark deleted successfully.' });

  } catch (error) {
    console.error('Error deleting bookmark:', error);
    res.status(500).json({ error: 'Internal Server Error: Something went wrong.' });
  }
});

(async _ => {
  await connect();
  await db_conn.sync();

  app.listen(process.env.PORT || 3838, "0.0.0.0", () => {
    console.log(`LISTENING ON PORT ${process.env.PORT || 3838}`)
  });
})();