const express = require("express");
const { config } = require("dotenv");
const router = require("./routes");
const mongoose = require("mongoose");
const cors = require("cors");
config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error:
      err.message ||
      `There was problem while executing the request ${err.message}`,
  });
});

const listener = app.listen(
  process.env.API_PORT,
  process.env.API_HOST,
  async function () {
    console.log(
      `Server is running at ${listener.address().address} : ${
        listener.address().port
      }`
    );
    try {
      await mongoose.connect(process.env.MONGO_URL);
      console.log(`Database successfully connected`);
    } catch (error) {
      console.log(`Database couldn't connect ${error}`);
    }
  }
);
