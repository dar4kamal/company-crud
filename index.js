require("dotenv").config();
const express = require("express");
const cors = require("cors");
const config = require("config");
const { connectDb } = require("./config/connectDb");
const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

const app = express();
const PORT = config.get("port") || 5000;

const company = require("./routes/company");

// Connecting to MongoDb
connectDb();

app.use(express.json());
app.use(cors());

app.use("/api/company", company);

const server = app.listen(PORT, () =>
	console.log(`App is listening on port ${PORT}!`)
);

module.exports = server;
