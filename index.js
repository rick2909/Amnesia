const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", (msg) => {
  if (msg.content === "ping") {
    msg.reply("pong");
  }
});

client.login("ODAzNjYzODg3MzgzMTM0MjE4.YBBEUg.y23sS5sjktFL-f9XOMoA7thcMBY");
