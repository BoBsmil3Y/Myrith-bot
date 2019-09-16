module.exports.run = async (l, Discord, bot, reaction, user) => {

  const checkEmoji = "620918371596369940";
  //const myrithiens = "605032955336851481";

  let guild = bot.guilds.get("605021521467146279");
  let myr = guild.roles.get("605032955336851481");

  let rulesEmbed = new Discord.RichEmbed().setColor("#0be881")
    .setAuthor("Merci d'avoir accepter les règles du Discord !")
    .setFooter("Amuse toi bien sur Myrith !")
    .setTimestamp();

  console.log("test")

  if (reaction.emoji.id === checkEmoji) {

    let member = await guild.fetchMember(user.id);

    console.log("test if")
    reaction.users.forEach(u => {
      if (u.id === user.id) {
        //Si on ajoute la reaction 
        console.log("test role")
        member.addRole(myr).catch(console.error);
        member.send(rulesEmbed).then(e => e.react("608273761564753930"));
        console.log("test fin role")

      } else {
        //Si on enlève la reaction
        member.removeRole(myrithiens).catch(console.error);
      }
    });




  } else {
    reaction.remove(user);
  }
};