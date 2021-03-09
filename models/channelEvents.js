const mongoose = require("mongoose");

const channelEventsSchema = new mongoose.Schema({
	name: String,
	channelID: String,
	dateTime: { type: Date, default: Date.now },
	server: { type: Boolean, default: false },
});

module.exports = mongoose.model("channelEvents", channelEventsSchema);