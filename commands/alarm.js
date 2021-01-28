module.exports.run = async (bot, message, args) => {
	const alarmFormats = [
		["s", "second(s)", 1000],
		["m", "minute(s)", 60000],
		["h", "hour(s)", 360000],
		["d", "day(s)", 8640000],
		["w", "week(s)", 60480000],
		["M", "month(s)", 259200000],
	];

	const messageContent = await message.content.substring(7);
	const pivot = getPivot(messageContent);
	if (pivot == -1) {
		message.channel.send("Incorrect use of alarm command: ~alarm [amount][format s|m|h|d|w|M] [message]");
	}

	const time = messageContent.substring(0, pivot);
	const alarmMessage = messageContent.substring(pivot + 1);

	const formatIndex = getFormat(time, alarmFormats);
	if (formatIndex == -1) {
		message.channel.send("Incorrect use of alarm command: ~alarm [amount][format s|m|h|d|w|M] [message]");
	}
	const msg = await message.reply(
		`alarm set for ${time.substring(0, time.length - 1)} ${
			alarmFormats[formatIndex][1]
		} with message: ${alarmMessage}`,
	);
	const alarm = await setTimeout(function() {
		message.reply(alarmMessage);
	}, time.substring(0, time.length - 1) * alarmFormats[formatIndex][2]);
};

module.exports.help = {
	name: "alarm",
	aliases: ["a"],
};

function getPivot(message) {
	for (let i = 0; i < message.length - 1; i++) {
		if (message.substring(i, i + 1) === " ") {
			return i;
		}
	}
	return -1;
}

function getFormat(time, formats) {
	const timeFormat = time.substring(time.length - 1);
	for (let i = 0; i < formats.length; i++) {
		if (timeFormat === formats[i][0]) {
			return i;
		}
	}
	return -1;
}
