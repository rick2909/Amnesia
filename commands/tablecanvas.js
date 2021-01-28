// at the top of your file
const Discord = require("discord.js");
const Canvas = require("canvas");
const Week = require("../functions/week");
const painter = require("table-on-canvas");

module.exports.run = async (bot, message, args) => {
	const now = new Date;
	const weekNumber = Week.week_no(now);
	const weekDay = Week.week_day[now.getDay()];

	// 1. create a table
	painter.createTable();

	// 2. add header for your table
	painter.addHeader({ "Monday": "Monday", "Tuesday": "Tuesday", "Wednesday": "Wednesday", "Thursday": "Thursday", "Friday": "Friday", "Saturday": "Saturday", "Sunday": "Sunday" }, { color: "green" });

	// 3. add rows for the table
	painter.addRow({
		"Monday": "Some value here",
		"Tuesday": "Something else NOW ON BIG LONG BOY",
		"Wednesday": "Some value here",
		"Thursday": "Some value here",
		"Friday": "Some value here",
		"Saturday": "Some value here",
		"Sunday": "Some value here",
	}, { color: "yellow" });

	// 4. draw the table on the canvas

	const canvas = painter.drawTable();

	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "week-overview.png");

	message.channel.send(`This is the planning for week ${weekNumber} from, ${message.author}`, attachment);
};

module.exports.help = {
	name: "tablecanvas",
	aliases: ["tc"],
};

function x(a, n) {
	const result = [];
	for (let i = 0; i < n; i++) {
		for (const e of a) {
			result.push(e);
		}
	}
	return result;
}
