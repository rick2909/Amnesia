module.exports.run = async (bot, message, args) => {
	if(message.member.voice.channel) {
		const connection = await message.member.voice.channel.join();
		const channel = message.channel;
		const music = message.content.substring(6);
		const dispatcher = connection.play("https://www.youtube.com/watch?v=t8FN2XOylTA");

		dispatcher.on("start", () =>{
			channel.send(`${music} started playing`);
		});

		dispatcher.on("finish", () => {
			channel.send(`${music} has finished playing`);
			dispatcher.destroy();
		});
	} else {
		message.channel.send("You're not in a voice channel. Join a voicechannel before using the play command.");
	}
};

module.exports.help = {
	name: "play",
	aliases: ["p"],
};