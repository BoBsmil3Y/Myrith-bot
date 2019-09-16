module.exports.run = async (bot, member) => {

  const guild = bot.guilds.get('605021521467146279');
  const myrithiens = "605032955336851481";

  guild.channels.get("618040080623337478").setName(`🔥\u2009\u2009•\u2009\u2009${guild.memberCount}\u2009\u2009membres.`);

  member.removeRole(myrithiens).catch(console.error);
  //Envoi d'un embed comme quoi il quitte le serveur ?

};