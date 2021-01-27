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
