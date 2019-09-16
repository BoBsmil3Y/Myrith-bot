module.exports.run = async (l, Discord, data, bot, m, args) => {

  const embed = new Discord.RichEmbed()
    .setColor('#0fbcf9')
    .setTitle('Règles du serveur Discord')
    .attachFiles(['img/Rules.jpg'])
    .setImage('attachment://Rules.jpg')
    .setTimestamp()
    .setFooter('Myrith - règlement', bot.user.avatarURL);

  m.channel.send(embed);
}