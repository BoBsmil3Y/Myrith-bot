module.exports.run = async (l, Discord, data, bot, m, args) => {

  const embed = new Discord.RichEmbed()
    .setColor('#0fbcf9')
    .setAuthor("Voici les règles du serveur Discord")
    .setDescription("Tu dois toutes les lires et bien sûr les respecter !\nCes règles sont là pour que tout ce déroule comme il faut.")
    .attachFiles(['img/Rules.jpg'])
    .setImage('attachment://Rules.jpg')
    .setTimestamp()
    .setFooter('Myrith - Règlement', bot.user.avatarURL);


  m.channel.send(embed);
  m.delete();

};

/*
.addField("Ensuite,", "Clique sur la réaction pour valider que tu as tout lu et que tu les acceptes.")
*/