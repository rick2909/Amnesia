const Discord = require("discord.js");
const dotenv = require("dotenv");
const BotConfig = require("./config.json");
const fs = require("fs");

dotenv.config();

const Prefix = BotConfig.prefix;
const bot = new Discord.Client();

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
	if(err) console.log(err);

	const jsfile = files.filter(f => f.split(".").pop() === "js");
	if(jsfile.length <= 0) {
		console.log("No commands found!");
	}

	jsfile.forEach((f) => {
		const props = require(`./commands/${f}`);
		console.log(`${f} loaded!`);
		bot.commands.set(props.help.name, props);

		props.help.aliases.forEach(alias => {
			bot.aliases.set(alias, props.help.name);
		});
	});
});

bot.on("ready", () => {
	console.log(`${bot.user.tag} is Online on ${bot.guilds.cache.size} servers!`);
	bot.user.setActivity(`I'm on ${bot.guilds.cache.size} servers!`);
});

bot.on("message", async msg => {
	// disable DM
	if(msg.channel.type === "dm") return;
	// disable responding to it self
	if(msg.author.id === bot.user.id) return;

	if (!msg.content.startsWith(Prefix)) return;

	const args = msg.content.slice(Prefix.length).trim().split(/ +/g);
	const cmd = args.shift().toLowerCase();
	let command;

	if(bot.commands.has(cmd)) {
		command = bot.commands.get(cmd);
	} else if(bot.aliases.has(cmd)) {
		command = bot.commands.get(bot.aliases.get(cmd));
	}

	try {
		command.run(bot, msg, args);
	} catch(e) {
		return;
	}
});

bot.login(process.env.TOKEN);