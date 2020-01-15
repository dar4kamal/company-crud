require("dotenv").config();
const mongoose = require("mongoose");
const config = require("config");

const dbUri = config.get("mongoDbUrl");

const connectDb = async () => {
	try {
		await mongoose.connect(dbUri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false
		});
		console.log("connected successfully to database");
	} catch (error) {
		console.log(error.message);
		process.exit(1);
	}
};

module.exports = {
	connectDb: connectDb
};
