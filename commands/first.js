module.exports.run = async (l, Discord, bot, m, args) => {
  idFirst = "621786297022808064";
  instanceChannel = m.guild.channels.get(idFirst);

  if (instanceChannel.id === idFirst) {
    if (m.member.roles.find(r => r.name.toLowerCase().includes("admin")) || m.member.roles.find(r => r.name.toLowerCase().includes("fonda"))) {

      instanceChannel
        .fetchMessages({
          limit: 4
        })
        .then(async messages => {
          ArrayMesage = messages.array();

          first = ArrayMesage[3].author;
          second = ArrayMesage[2].author;
          third = ArrayMesage[1].author;

          img = ArrayMesage[3].author.avatarURL;

          const embed = new Discord.RichEmbed()
            .setColor("#0fbcf9")
            .setAuthor(`🏆   ${m.author.username} annonce les gagnants du jour !   🏆`, m.author.avatarURL)
            .addField("🥇 - 1er", `${first}`)
            .addField("🥈 - 2ème", `${second}`, true)
            .addField("🥉 - 3ème", `${third}`, true)
            .setThumbnail(`${img}`)
            .setFooter("Myrith - Rendez-vous tous les jours à 00H !", bot.user.avatarURL)
            .setTimestamp();

          m.channel
            .bulkDelete(messages)
            .catch(error =>
              m.reply(`Couldn't delete messages because of: ${error}`)
            );


          instanceChannel.send(embed);

          m.delete();
        })
        .catch(console.error);

    } else {
      m.author.send(l.noPermission);
      m.delete();
    }

  } else {
    m.reply("La commande doit être exécutée dans le salon adéquat").then(
      async mess => {
        mess.delete(3000);
        m.delete();
      }
    );
  }

};