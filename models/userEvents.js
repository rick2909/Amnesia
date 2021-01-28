const mongoose = require("mongoose");

const userEventsSchema = new mongoose.Schema({
	name: String,
	userID: String,
	dateTime: { type: Date, default: Date.now },
});

module.exports = mongoose.model("userEvents", userEventsSchema);