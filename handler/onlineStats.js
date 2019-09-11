module.exports.run = async (bot, oldMember, newMember) => {

  const guild = bot.guilds.get('605021521467146279');

  if (oldMember.presence.status !== newMember.presence.status) {

    if (oldMember.presence.status === 'offline' || newMember.presence.status === 'offline') {

      var online = newMember.guild.members.filter(m => m.presence.status === 'online').size;

      if (online > 1) {
        guild.channels.get("618040386459533352").setName("🤵\u2009\u2009•\u2009\u2009" + online + "\u2009\u2009en\u2009lignes.");
      } else {
        guild.channels.get("618040386459533352").setName("🤵\u2009\u2009•\u2009\u2009" + online + "\u2009\u2009en\u2009ligne.");
      }
    }
  }

};