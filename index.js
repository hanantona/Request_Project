require("dotenv").config();
const express = require("express");
const sequelize = require("./db");
const cors = require("cors");
const { authenticate } = require("./db");
const models = require("./models/models");
const router = require("./routes/index");

const PORT = process.env.PORT || 6000;

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", router);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log("SERVER working"));
  } catch (e) {
    console.log(e);
  }
};

start();
