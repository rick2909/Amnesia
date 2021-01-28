const mongoose = require("mongoose");
const dotenv = require("dotenv");
const BotConfig = require("../config.json");
const userEvents = require("../models/userEvents.js");

dotenv.config();

mongoose.connect(process.env.DBURL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

module.exports.run = async (bot, message, args) => {
	const messageContent = await message.content.substring(5);
	const pivot = getPivot(messageContent);
	if (pivot == -1) {
		message.channel.send("Incorrect use of add command: ~add [day]-[month]-[year] [HH:mm] [name]");
	}

	const dateTimeString = messageContent.substring(0, pivot);
	const time = messageContent.substring(pivot + 1).substring(0, 5);
	const name = messageContent.substring(pivot + 1).substring(time.length);

	const year = dateTimeString.split("-")[2];
	const month = dateTimeString.split("-")[1];
	const day = dateTimeString.split("-")[0];
	const hour = time.split(":")[0];
	const min = time.split(":")[1];

	const date = new Date(year, month, day, hour, min);

	message.channel.send(date.toString());
	message.channel.send(name);

	const newUserEvents = new userEvents({
		name: name,
		userID: message.author.id,
		date: date,
	}).save().catch(err => console.log(err));
};

module.exports.help = {
	name: "add",
	aliases: [""],
};

function getPivot(message) {
	for (let i = 0; i < message.length - 1; i++) {
		if (message.substring(i, i + 1) === " ") {
			return i;
		}
	}
	return -1;
}