module.exports.run = async (l, Discord, bot, reaction, user) => {
  var fs = require("fs");
  var data = JSON.parse(fs.readFileSync("Storage/ideaData.json", "utf8"));
  const adminId = [
    "207884635839922177",
    "377878528475136001",
    "318004221809131521"
  ];
  const confirmationEmbed = new Discord.RichEmbed()
    .setTitle(l.wantToDelete)
    .setFooter(l.wantToDeleteFooter)
    .setColor("#0fbcf9");

  if (reaction.emoji.id === "620918371596369940") {
    //CheckEmoji
  } else if (reaction.emoji.id === "621624110941995019") {
    //CrossEmoji
  } else if (reaction.emoji.name === "❌") {
    if (user.id === adminId) {
      if (reaction.message.embeds[0].author.name.includes("refusé")) {
        reaction.message.delete();
      } else {
        const receivedEmbed = reaction.message.embeds[0];
        //envoyer l'embed à celui qui le refuse + attends une réponse qui sera la raison.
        const embed = new Discord.RichEmbed(receivedEmbed)
          .setColor("#ff5e57")
          .setAuthor("L'idée a été refusé par " + user.username, user.avatarURL)
          .attachFiles(["img/cancel.png"])
          .setThumbnail("attachment://cancel.png")
          .setTimestamp()
          .setFooter("Myrith - Idée refusée ❌", bot.user.avatarURL);
        //ajouter la raison dans une field ("Raison", imput)

        reaction.message.delete();
        reaction.message.channel.send(embed).then(async embed => {
          await embed.react("❌");
        });
      }
    } else {
      var data = JSON.parse(fs.readFileSync("Storage/ideaData.json", "utf8"));

      for (let el of data.ideas) {
        // Si joueur est bien celui qui à envoyé l'idée
        if (el.idMessage === reaction.message.id) {
          // On récupère la class User de l'auteur de l'idée
          bot.fetchUser(el.idAuthor).then(async u => {
            const checkEmoji = "620918371596369940";
            const crossEmoji = "621624110941995019";

            //Création de l'embed pour confirmer ou non la suppression
            let embedF = await reaction.message.channel.send(confirmationEmbed);
            await embedF.react(checkEmoji);
            await embedF.react(crossEmoji);

            const reactions = await embedF.awaitReactions(
              reaction =>
              reaction.emoji.id === checkEmoji ||
              (reaction.emoji.id === crossEmoji), {
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
              reaction.message.reactions.forEach(reaction => reaction.remove(el.idAuthor));
            }

          });
        }
      }
    }
  } else if (reaction.emoji.name === "☑") {}
};