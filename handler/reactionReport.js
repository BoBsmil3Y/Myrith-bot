module.exports.run = async (l, Discord, bot, reaction, user) => {

  var fs = require("fs");
  var data = JSON.parse(fs.readFileSync("Storage/reportData.json", "utf8"));
  const adminId = ["207884635839922177", "377878528475136001", "318004221809131521"];
  const confirmationEmbed = new Discord.RichEmbed().setTitle(l.wantToDeleteReport).setFooter(l.wantToDeleteFooter).setColor("#0fbcf9");
  const checkEmoji = "620918371596369940";
  const crossEmoji = "621624110941995019";

  if (reaction.emoji.id === crossEmoji) {
    if (reaction.message.embeds[0]) {

      if (reaction.message.embeds[0].title !== l.wantToDeleteReport) {

        if (user.id === adminId[0] || user.id === adminId[1] || user.id === adminId[2]) {

          reaction.message.delete();

        } else {

          var data = JSON.parse(fs.readFileSync("Storage/reportData.json", "utf8"));

          for (let el of data.reports) {
            if (el.idMessage === reaction.message.id) {
              if (el.idAuthor === user.id) {
                bot.fetchUser(el.idAuthor).then(async u => {
                  //Création de l'embed pour confirmer ou non la suppression
                  let embedF = await reaction.message.channel.send(
                    confirmationEmbed
                  );
                  await embedF.react(checkEmoji);
                  await embedF.react(crossEmoji);

                  const reactions = await embedF.awaitReactions(
                    (reaction, user) => user.id === u.id && (reaction.emoji.id === checkEmoji || reaction.emoji.id === crossEmoji), {
                      max: 3,
                      time: 4000
                    }
                  );

                  if (reactions.get(checkEmoji)) {
                    user.send(l.deleteReport);
                    embedF.delete();
                    reaction.message.delete();
                  } else if (reactions.get(crossEmoji)) {
                    user.send(l.suppCancel);
                    embedF.delete();
                    reaction.message.reactions.forEach(reaction =>
                      reaction.remove(user.id)
                    );
                  } else {
                    embedF.delete();
                  }
                });
              } else {
                user.send(l.cantDelete);
                reaction.message.reactions.forEach(reaction =>
                  reaction.remove(user.id)
                );
              }
            }
          }
        }
      } else {
        reaction.remove(user.id)
      }
    }




  } else if (reaction.emoji.id === checkEmoji) {

    if (
      user.id === adminId[0] ||
      user.id === adminId[1] ||
      user.id === adminId[2]
    ) {
      var data = JSON.parse(fs.readFileSync("Storage/reportData.json", "utf8"));

      for (let el of data.reports) {
        if (el.idMessage === reaction.message.id) {
          let g = bot.guilds.get("605021521467146279");
          let memberOfReport = await g.fetchMember(el.idAuthor);

          const embed = new Discord.RichEmbed()
            .setColor("#0be881")
            .setAuthor("Merci " + memberOfReport.user.username + " pour ton report !", bot.user.avatarURL)
            .setTitle("Report : ")
            .setDescription(el.title)
            .addField("Le joueur a subit une sanction en rapport avec ton report.", "Ce message confirme que ton report nous a servit !")
            .setTimestamp();

          reaction.message.delete();
          memberOfReport.send(embed);
        }
      }
    } else {
      if (reaction.message.embeds[0]) {
        if (reaction.message.embeds[0].title !== l.wantToDeleteReport) {
          user.send(l.cantValidateReport);
          reaction.message.reactions.forEach(reaction => reaction.remove(user.id));
        }
      }
    }
  }
};