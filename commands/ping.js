module.exports.run = async (bot, message, args) => {

	const msg = await message.reply("ping!");
	msg.edit(`Pong! ${msg.createdTimestamp - message.createdTimestamp}ms`);
};

module.exports.help = {
	name: "ping",
	aliases: [],
};