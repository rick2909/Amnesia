// at the top of your file
const Discord = require("discord.js");
const Week = require("../functions/week");

module.exports.run = async (bot, message, args) => {
	const now = new Date;
	const weekNumber = Week.week_no(now);
	const weekDay = Week.week_day[now.getDay()];

	const exampleEmbed = new Discord.MessageEmbed()
		.setColor("#FF69B4")
		.setTitle(`This is week ${weekNumber}`)
		.setDescription(`Now it is ${weekDay}`)
		.setThumbnail("https://media.giphy.com/media/W2oh5l7ZcedqXDP1NZ/giphy.gif")
		.addFields(
			{ name: "Monday", value: "Some value here", inline: true },
			{ name: "Tuesday", value: "Something else", inline: true },
			{ name: "Wednesday", value: "Some value here", inline: true },
			{ name: "Thursday", value: "Some value here", inline: true },
			{ name: "Friday", value: "Some value here", inline: true },
			{ name: "Saturday", value: "Some value here", inline: true },
			{ name: "Sunday", value: "Some value here", inline: true },
		)
		.setTimestamp()
		.setFooter(`Week: ${weekNumber}`, bot.user.avatarURL());

	message.channel.send(exampleEmbed);
};

module.exports.help = {
	name: "table",
	aliases: ["t"],
};
