const { DiscordAPIError } = require("discord.js");

const Discord = require("discord.js");
const path = require("path");

module.exports.run = async (bot, message, args) => {

	if(message.member.voice.channel) {
		const connection = await message.member.voice.channel.join();
		const channel = message.channel;
		const music = message.content.substring(6);
		const dispatcher = connection.play(path.join("Assets/command", "goodnight.mp3"), {volume: 0.5});

		dispatcher.on("finish", () => {
			dispatcher.destroy();
			connection.disconnect();
		});
	} else {
		const goodnightEmbed = new Discord.MessageEmbed()
			.setColor("#0099ff")
			.setTitle("Goodnight girl, see you tomorrow")
			.attachFiles(new Discord.MessageAttachment("Assets/command/goodnight.gif"));
		message.channel.send({embed: goodnightEmbed});
	}
};

module.exports.help = {
	name: "goodnight",
	aliases: ["gn"],
};