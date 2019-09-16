module.exports.run = async (l, Discord, bot, reaction, user) => {

  const checkEmoji = "620918371596369940";

  let guild = bot.guilds.get("605021521467146279");
  let myrithiens = guild.roles.get("605032955336851481");
  let rulesEmbed = new Discord.RichEmbed().setColor("#0be881")
    .setAuthor("Merci d'avoir accepter les règles du Discord !")
    .attachFiles(['img/books.png'])
    .setThumbnail('attachment://books.png')
    .setTitle("Tu as donc débloqué l'ensemble des salons du Discord")
    .setDescription("Si tu enfreins ces règles, tu seras sanctionné en conséquence. Tu peux les avoir n'importe où avec le /regles.")
    .setFooter("Amuse toi bien sur Myrith !")
    .setTimestamp();

  if (reaction.emoji.id === checkEmoji) {

    let member = await guild.fetchMember(user.id);

    if (!member.roles.find(r => r.name.includes("Myrithiens"))) {

      member.addRole(myrithiens).catch(console.error);
      member.send(rulesEmbed).then(e => e.react("608273761564753930"));
      reaction.remove(user);

    } else {

      member.send(l.alreadyMyrithiens);
      reaction.remove(user);

    }
  } else {

    reaction.remove(user);

  }
};