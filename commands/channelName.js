module.exports.run = async (l, Discord, bot, m, args) => {

  if (m.author.id === '318004221809131521') {

    const guild = bot.guilds.get('605021521467146279');
    let arrayChannels = guild.channels.array()

    for (var i = 0; i < arrayChannels.length; i++) {

      if (arrayChannels[i].type === "text") {

        try {
          let channelName = arrayChannels[i].name;

          let final = channelName
            .replace("-", "\u2009\u2009•\u2009\u2009")
            .replace("ù", "\u2009\u2009/\u2009\u2009")
            .replace("§", "\u2009\u2009");

          guild.channels.get(arrayChannels[i].id).setName(final);

        } catch (error) {
          m.reply("An error appear : \n```" + error + "```.")
        }

      }

    }

    m.delete();

    m.reply("Command done").then(msg => {
      msg.delete(3000);
    });
  }
};