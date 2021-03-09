const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

module.exports = {
	mongoose: mongoose,
	dbConnect: mongoose.connect(process.env.DBURL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}),
};
