module.exports.run = async (bot) => {

  const guild = bot.guilds.get('605021521467146279');

  setInterval(() => {
    var online = guild.members.filter(({
      presence
    }) => presence.status !== 'offline').size;
    if (online > 1) {
      guild.channels.get("618040386459533352").setName("🤵\u2009\u2009•\u2009\u2009" + online + "\u2009\u2009en\u2009lignes.");
    } else {
      guild.channels.get("618040386459533352").setName("🤵\u2009\u2009•\u2009\u2009" + online + "\u2009\u2009en\u2009ligne.");
    }
  }, 4000);

};