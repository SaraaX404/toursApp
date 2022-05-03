const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const uRouter = require("./routes/user");
const tRouter = require("./routes/tour");
require("dotenv").config();

const port = 4500;

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/user", uRouter);
app.use("/tour", tRouter);
app.get("/", (req, res) => {
  res.status(200).send(`Server is runing on port ${port} `);
});

const start = async () => {
  await mongoose.connect(process.env.CONNECTION_STRING);
  await app.listen(port);
  console.log(`App is running on port :${port}`);
};

start();
