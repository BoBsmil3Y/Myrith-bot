module.exports.run = async (l, Discord, bot, member) => {

  const guild = bot.guilds.get('605021521467146279');

  var onlineEmote = guild.emojis.get("618044789585346560");
  var animateVerified = guild.emojis.get("618045322882580521");

  var online = guild.members.filter(({
    presence
  }) => presence.status !== 'offline').size;


  guild.channels.get("618040080623337478").setName(`🔥\u2009\u2009${guild.memberCount}\u2009\u2009membres`);

  //bot.guild.channels.find("id", "618000910928576512").setName(`${bot.guild.members.filter((m) => !m.user.bot).size()} membres`);

  //guild.channels.get("618000910928576512").setName(`${bot.members.filter((m) => !m.user.bot).size} membres`);

  guild.channels.get("618040386459533352").setName("🤵\u2009\u2009" +
    online + "\u2009\u2009en\u2009ligne ");


};

//(l, Discord, bot, member, online)
/*
if (member.guild.id === "605021521467146279") {

  var online = member.guild.members.filter(({
    presence
  }) => presence.status !== 'offline').size();


  //member.guild.channels.find("id", "618000910928576512").setName(`${member.guild.memberCount} membres`);
  member.guild.channels.find("id", "618000910928576512").setName(`Users: ${member.guild.members.filter((m) => !m.user.bot).size}`);

  member.guild.channels.find("id", "618001102155153409").setName(online + " en ligne");

}
*/