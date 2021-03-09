const mongoose = require("mongoose");
const dotenv = require("dotenv");
const BotConfig = require("../config.json");
const userEvents = require("../models/userEvents.js");
const channelEvents = require("../models/channelEvents.js");
const Agenda = require("../agenda/agenda.js");
const agenda = require("../agenda/agenda.js");

dotenv.config();

mongoose.connect(process.env.DBURL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

module.exports.run = async (bot, message, args) => {
	const messageContent = await message.content.substring(5);
	if (args.length < 3) {
		message.channel.send("Incorrect use of add command: ~add [day]-[month]-[year] [HH:mm] [name] [#channel]");
	}

	const dateTimeString = args[0];
	const time = args[1];
	const indexOfTime = messageContent.indexOf(args[1]);
	let name = messageContent.slice(indexOfTime + args[1].length + 1);

	const year = dateTimeString.split("-")[2];
	const month = dateTimeString.split("-")[1];
	const day = dateTimeString.split("-")[0];
	const hour = time.split(":")[0];
	const min = time.split(":")[1];

	const date = new Date(year, month - 1, day, hour, min);

	if(message.channel.type === "dm") {
		const newUserEvent = new userEvents({
			name: name,
			userID: message.author.id,
			date: date,
		}).save().catch(err => console.log(err));
	}else if(args[args.length - 1].startsWith("<#")) {
		const channelId = args[args.length - 1].substring(2).slice(0, -1);
		console.log(`channel Id: ${channelId}`);

		const channel = bot.channels.cache.get(channelId);

		channel.send("There is a calander event added to this text channel").catch(error => {
			if(error.message === "Missing Access") {
				message.channel.send(`The bot has no rights to send text in ${args[args.length - 1]}`);
				return;
			}
		});

		name = name.split(" <#")[0];

		const newChannelEvent = new channelEvents({
			name: name,
			channelID: channelId,
			date: date,
		}).save().catch(err => console.log(err));

		const diff = date - Date.now();

		const diffDays = Math.floor(diff / 86400000);
		const diffHrs = Math.floor((diff % 86400000) / 3600000);
		const diffMins = Math.round(((diff % 86400000) % 3600000) / 60000);
		if(diffMins <= 5) {
			// call job
			agenda.schedule(`${hour}:${min}`, "send channel message", {
				name: name,
				channelId: channelId,
				date: date,
			}).catch(error => {
				console.error(error);
				process.exit(-1);
			});
		}
	}
};

module.exports.help = {
	name: "add",
	aliases: [""],
};
