module.exports.run = async (l, Discord, bot, m, args) => {

  instanceChannel = m.guild.channels.get(m.channel.id);

  if (m.member.roles.find(r => r.name.toLowerCase().includes("admin")) || m.member.roles.find(r => r.name.toLowerCase().includes("fonda"))) {

    const command = m.content.slice(1).split(" ").shift().toLowerCase().replace("é", "e").replace("è", "e");

    const args = m.content.slice(10).split("&");

    let rulesEmbed = new Discord.RichEmbed()
      .setColor("#5f27cd")
      .setAuthor("Règlement du salon #" + instanceChannel.name, bot.user.avatarURL)
      .setTitle(args[0])
      .setDescription(args[1])
      .attachFiles(['img/rules.png'])
      .setThumbnail('attachment://rules.png')
      .setTimestamp()
      .setFooter('Myrith - Règlement du salon #' + instanceChannel.name, bot.user.avatarURL);


    if (args[2] && args[3]) {
      for (var i = 2; i < args.length; i++) {
        if (args[i] && args[i + 1]) {
          rulesEmbed.addField(args[i], args[i + 1]);
          i++
        } else {
          m.reply("Les fields fonctionnent par deux `!reglement & nom du field 1 & valeur du field 1 & nom du field 2 & valeur du field 2` etc...").then(
            async msg => msg.delete(3000));
        }
      }
    } else {
      m.reply("Les fields fonctionnent par deux `!reglement & nom du field 1 & valeur du field 1 & nom du field 2 & valeur du field 2` etc...").then(
        async msg => msg.delete(3000));
    }

    instanceChannel.send(rulesEmbed);
    m.delete();

  } else {
    m.author.send(l.noPermission);
    m.delete();
  }

};