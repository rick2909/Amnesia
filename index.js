<<<<<<< HEAD
const { Console } = require("console");
const Discord = require("discord.js");
const { setTimeout } = require("timers");
const client = new Discord.Client();
const Token = "ODAzNjYzODg3MzgzMTM0MjE4.YBBEUg.y23sS5sjktFL-f9XOMoA7thcMBY";

const Prefix = "~";
const ErrorMessage = "Unknown command. Typ ~help for more information.";

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("guildMemberAdd", (member) => {
  const channel = member.guild.channels.cache.find(
    (ch) => ch.name === "general"
  );
  if (!channel) return;
  channel.send(`Welcome to hell, ${member}`);
});

client.on("message", (msg) => {
  if (msg.content.substring(0, 1) === Prefix) {
    let message = msg.content.substring(1, msg.content.length);
    if (message === "ping") {
      msg.react("🏓").then(msg.reply("pong")).catch(console.error);
      return;
    }
    if (message.startsWith("alarm")) {
      alarm(msg);
      return;
    }
    if (message === "avatar") {
      msg.reply(msg.author.displayAvatarURL()).catch(console.error);
      return;
    }

    msg.reply(ErrorMessage);
  }
});

function alarm(msg) {
  msg.content = msg.content.substring(6, msg.content.length);
  console.log("message content is: " + msg.content);
  let pivot = getAlarmPivot(msg.content);
  console.log("Pivot is: " + pivot);
  if (pivot != -1) {
    setTimeout(function () {
      msg.channel.send(msg.content(pivot + 1)),
        parseInt(msg.content.substring(0, pivot));
    });
    return;
  }

  msg.channel.send(
    "Incorrect use of the alarm command: ~alarm seconds message"
  );
}

function getAlarmPivot(message) {
  for (let i = 0; i < message.length - 1; i++) {
    if (message.substring(i, i + 1) === " ") {
      return i;
    }
  }
  return -1;
}

client.login(Token);
=======
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
	bot.user.setActivity(`I'm on ${bot.guilds.cache.size} servers! In Alpha state`);
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
>>>>>>> a7624521b3f49435ab7abb9be592b10df8f5f9f5
