const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const morgan = require("morgan");
const compression = require("compression");
require("dotenv").config();

const PORT = process.env.PORT || 5000;
const articleRouter = require("./routes/article");
const userRouter = require("./routes/user");
const tourGuideRouter = require("./routes/tourguide");
const reviewRouter = require("./routes/review");

app.use(compression());
app.use(express.json({ limit: "50mb" }));
app.use(cors());
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(morgan("dev"));

app.use("/", articleRouter);
app.use("/", userRouter);
app.use("/", tourGuideRouter);
app.use("/", reviewRouter);

const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.DATA_BASE_PASS}@cluster0.m1efe.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`);
  });
});
