module.exports.run = async (l, Discord, bot, m, args) => {

  if (m.author.id === '318004221809131521') {
    const guild = bot.guilds.get('605021521467146279');

    let arrayChannels = guild.channels.array()

    var regex = /-§-/gi;

    for (var i = 0; i < arrayChannels.length; i++) {

      if (arrayChannels[i].type === "text") {

        let channelName = arrayChannels[i].name;

        let final = channelName.replace('-', '\u2009\u2009•\u2009\u2009').replace('-ù-', '\u2009\u2009/\u2009\u2009').replace(regex, '\u2009\u2009').replace('-•-', '\u2009\u2009•\u2009\u2009');

        guild.channels.get(arrayChannels[i].id).setName(final);
      }

    }
  }
};