const Discord = require("discord.js");
const client = new Discord.Client();

const Prefix = "~";

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", (msg) => {
  if (msg.content.substring(0, 1) === Prefix) {
    let message = msg.content.substring(1, msg.content.length);
    if (message === "ping") {
      msg.reply("pong");
      return;
    }

    msg.reply("Unknown command. Typ ~help for more information.");
  }
});

client.login("ODAzNjYzODg3MzgzMTM0MjE4.YBBEUg.y23sS5sjktFL-f9XOMoA7thcMBY");
