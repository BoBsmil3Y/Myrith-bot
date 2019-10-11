module.exports.run = async (l, Discord, bot, reaction, user) => {

  var fs = require("fs");
  var data = JSON.parse(fs.readFileSync("Storage/bugData.json", "utf8"));
  const adminId = ["207884635839922177", "377878528475136001", "318004221809131521"];
  const confirmationEmbed = new Discord.RichEmbed().setTitle(l.wantToDeleteBug).setFooter(l.wantToDeleteFooter).setColor("#0fbcf9");
  const checkEmoji = "620918371596369940";
  const crossEmoji = "621624110941995019";
  const wipEmoji = "632172486812893184";

  if (reaction.emoji.id === crossEmoji) { //CROSS EMOJI
    if (user.id === adminId[0] || user.id === adminId[1] || user.id === adminId[2]) {

      reaction.message.delete();

    } else {

      var data = JSON.parse(fs.readFileSync("Storage/bugData.json", "utf8"));

      for (let el of data.bugs) {
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
                user.send(l.deleteBug);
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
            user.send(l.cantDeleteBug);
            reaction.message.reactions.forEach(reaction =>
              reaction.remove(user.id)
            );
          }
        }
      }
    }
  } else if (reaction.emoji.id === checkEmoji) { //CHECK EMOJI
    if (user.id === adminId[0] || user.id === adminId[1] || user.id === adminId[2]) {

      var data = JSON.parse(fs.readFileSync("Storage/bugData.json", "utf8"));

      for (let el of data.bugs) {

        if (el.idMessage === reaction.message.id) {
          let g = bot.guilds.get("605021521467146279");
          let memberOfIdea = await g.fetchMember(el.idAuthor);

          memberOfIdea.send(l.bugFix)
          reaction.message.delete();
        }
      }
    } else {
      if (reaction.message.embeds[0]) {
        if (reaction.message.embeds[0].title !== l.wantToDeleteBug) {
          user.send(l.cantValidateBug);
          reaction.message.reactions.forEach(reaction => reaction.remove(user.id));
        }
      }
    }

  } else if (reaction.emoji.id === wipEmoji) { //WORK IN PROGRESS EMOJI
    if (user.id === adminId[0] || user.id === adminId[1] || user.id === adminId[2]) {

      var data = JSON.parse(fs.readFileSync("Storage/bugData.json", "utf8"));

      for (let el of data.bugs) {

        if (el.idMessage === reaction.message.id) {
          let g = bot.guilds.get("605021521467146279");
          let memberOfIdea = await g.fetchMember(el.idAuthor);

          const receivedEmbed = reaction.message.embeds[0];

          const embed = new Discord.RichEmbed(receivedEmbed)
            .setColor("#f0932b")
            .setAuthor("L'état du bug passe en Work In Progess", memberOfIdea.user.avatarURL)
            .attachFiles(["img/bug/tools.png"])
            .setThumbnail("attachment://tools.png")
            .setTimestamp()
            .setFooter("Myrith - Le bug a été report au support en question ou attend une mise à jour !", bot.user.avatarURL);

          reaction.message.delete();
          reaction.message.channel.send(embed);
          memberOfIdea.send(l.bugWip)
        }
      }
    } else {
      user.send(l.cantWipBug);
      reaction.message.reactions.forEach(reaction => reaction.remove(user.id));
    }
  }
};