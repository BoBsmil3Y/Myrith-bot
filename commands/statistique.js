module.exports.run = async (l, Discord, bot, member) => {

  const guild = bot.guilds.get('605021521467146279');

  var online = guild.members.filter(({
    presence
  }) => presence.status !== 'offline').size;


  guild.channels.get("618040080623337478").setName(`🔥\u2009\u2009•\u2009\u2009${guild.memberCount}\u2009\u2009membres.`);

  if (online > 1) {
    guild.channels.get("618040386459533352").setName("🤵\u2009\u2009•\u2009\u2009" + online + "\u2009\u2009en\u2009lignes.");
  } else {
    guild.channels.get("618040386459533352").setName("🤵\u2009\u2009•\u2009\u2009" + online + "\u2009\u2009en\u2009ligne.");
  }

  console.log("Test \nEvent/member : " + member);

};