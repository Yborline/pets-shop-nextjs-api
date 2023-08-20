const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const {
  clothesRouter,
  authRouter,
  imagesRouter,
  // adminRouter,
  commentRouter,
  // uploadRouter,
} = require("./routes/api");

// const DB_HOST = require("./config")

require("dotenv").config();
// require("dotenv").config({
//   path: "./controllers/clothes/add.js",
// });

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/auth", authRouter);
// app.use("/api/admin", adminRouter);
app.use("/api/clothes", clothesRouter);
app.use("/api/comments", commentRouter);
app.use("/api/images", imagesRouter);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
