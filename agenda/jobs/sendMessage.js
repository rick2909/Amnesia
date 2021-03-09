const dotenv = require("dotenv");

const db = require("../../models/db.js");
const Mongoose = db.mongoose;

dotenv.config();

module.exports = function(agenda) {
	// Define a "job", an arbitrary function that agenda can execute
	agenda.define("send channel message", { lockLifetime: 90000 }, async job => {
		const name = job.attrs.data.name;
		const channelId = job.attrs.data.channelId;
		const date = job.attrs.data.date;
		const bot = require("../../index.js").bot;
		const channel = bot.channels.cache.get(channelId);

		channel.send(`This is the reminder for; ${name} on ${date}`).catch(error => {
			if(error.message === "Missing Access") {
				// TODO
				return;
			}
		});
		console.log(`This is the reminder for ${name} on ${date} in channel: ${channelId}`);
	});

	agenda.define("send user message", async (job) => {
		// Etc
		const { name, channelId, date, bot } = job.attrs;
		console.log(`This is the reminder for; ${name} on ${date}`);
	});
};