const { DiscordAPIError } = require("discord.js");

const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
	const goodnightEmbed = new Discord.MessageEmbed()
		.setColor("#0099ff")
		.setTitle("Goodnight girl, see you tomorrow");
	const gif = new Discord.MessageAttachment("Assets/command/goodnight.gif");
	message.channel.send({embed: goodnightEmbed, files: [gif]});

};

module.exports.help = {
	name: "goodnight",
	aliases: ["gn"],
};