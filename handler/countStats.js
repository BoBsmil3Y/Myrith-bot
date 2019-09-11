module.exports.run = async (bot) => {

  const guild = bot.guilds.get('605021521467146279');

  guild.channels.get("618040080623337478").setName(`🔥\u2009\u2009•\u2009\u2009${guild.memberCount}\u2009\u2009membres.`);

};