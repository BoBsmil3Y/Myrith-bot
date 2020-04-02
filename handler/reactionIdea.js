module.exports.run = async (l, Discord, bot, reaction, user) => {

  var fs = require("fs");
  var data = JSON.parse(fs.readFileSync("Storage/ideeData.json", "utf8"));
  const adminId = ["207884635839922177", "377878528475136001", "318004221809131521"];
  const confirmationEmbed = new Discord.RichEmbed().setTitle(l.wantToDelete).setFooter(l.wantToDeleteFooter).setColor("#0fbcf9");
  const checkEmoji = "620918371596369940";
  const crossEmoji = "621624110941995019";

  if (reaction.emoji.id === crossEmoji) {
    if (user.id === adminId[0] || user.id === adminId[1] || user.id === adminId[2]) {
      if (reaction.message.embeds[0].footer.text.includes("refusé")) {
        reaction.message.delete();
      } else {
        const receivedEmbed = reaction.message.embeds[0];

        const embed = new Discord.RichEmbed(receivedEmbed)
          .setColor("#ff5e57")
          .attachFiles(["img/cancel.png"])
          .setThumbnail("attachment://cancel.png")
          .setTimestamp()
          .setFooter("Myrith - ❌ L'idée a été refusé par " + user.username,
            bot.user.avatarURL);

        reaction.message.delete();
        reaction.message.channel.send(embed).then(async embed => {
          await embed.react(crossEmoji);
        });
      }
    } else {

      var data = JSON.parse(fs.readFileSync("Storage/ideeData.json", "utf8"));

      for (let el of data.ideas) {
        if (el.idMessage === reaction.message.id) {
          if (el.idAuthor === user.id) {

            bot.fetchUser(el.idAuthor).then(async u => {

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
                user.send(l.deleteIdea);
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
  } else if (reaction.emoji.id === checkEmoji) {
    if (
      user.id === adminId[0] ||
      user.id === adminId[1] ||
      user.id === adminId[2]
    ) {
      var data = JSON.parse(fs.readFileSync("Storage/ideeData.json", "utf8"));

      for (let el of data.ideas) {

        if (el.idMessage === reaction.message.id) {
          let g = bot.guilds.get("605021521467146279");
          let memberOfIdea = await g.fetchMember(el.idAuthor);

          const receivedEmbed = reaction.message.embeds[0];

          const embed = new Discord.RichEmbed(receivedEmbed)
            .setColor("#0be881")
            .setAuthor(
              memberOfIdea.user.username +
              " a eu son idée validée !  Idée #" +
              el.number,
              memberOfIdea.user.avatarURL
            )
            .attachFiles(["img/valid.png"])
            .setThumbnail("attachment://valid.png")
            .setTimestamp()
            .setFooter(
              "Myrith - L'idée a été validé par " + user.username,
              bot.user.avatarURL
            );

          reaction.message.delete();
          reaction.message.channel.send(embed);
        }
      }
    } else {
      if (reaction.message.embeds[0]) {
        if (reaction.message.embeds[0].title !== l.wantToDelete) {
          user.send(l.cantValidate);
          reaction.message.reactions.forEach(reaction => reaction.remove(user.id));
        }
      }
    }
  }
};