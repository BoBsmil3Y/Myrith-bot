module.exports.run = async (l, Discord, bot, m, args) => {

  let embed = new Discord.RichEmbed()
    .setColor("#5f27cd")
    .setAuthor("Liste des commandes du bot", bot.user.avatarURL)
    .setTitle("Voici la liste des commandes que tu peux effectuer")
    .setDescription("Les '&' dans les commandes sont très importants et permettent de séparer les différentes sections de ta commande, ne les oublie pas, et n'en met pas dans tes phrases !")
    .attachFiles(['img/command.png'])
    .setThumbnail('attachment://command.png')
    .addField("• Légende :", "< > = optionel, non obligatoire | ! = préfix | !bug = commande | & = séparateur de section de la commande")
    .addField("• Effectuer les commandes dans les bons channels", "Les commandes s'effectue dans leur channel respectif (!bug => #bug) etc... Attention, aucune discussion ne peut être faite dans ses salons là !")
    .addBlankField()
    .addField("Commande pour report un bug | **!bug**", "`!bug & serveur & titre & description <& lien d'un screen>`")
    .addField("Commande pour report un joueur | **!report**", "`!report & joueur à report & titre du report & une description <& un lien>`")
    .addField("Commande pour proposer une idée | **!idée**", "`!idée & serveur en question & titre de l'idée & une description`")
    .addField("Commande pour obtenir les règles | **!règles**", "Vous envoi les règles du serveur Discord en MP.")
    .addField("Commande pour obtenir les commandes | **!help**", "Vous envoi les commandes du bot en MP (ce message).")
    .addBlankField()
    .addField("Exemple de report de bug avec !bug", "`!bug & serveur en question (Skyblock, Discord, Lobby) & titre de votre bug (ex: Mon beacon ne fonctionne plus.) & une description (ex: J'ai placé il y a un mois un beacon qui fontionnait parfaitement, et depuis peu, il ne s'active plus. J'ai essayé de le casser et le reposer mais ça ne marche pas) <& un lien si vous avez un screen à transmettre, il faut qu'il soit hébergé sur un site d'image ! (ex: https://imgur.com/a/TPVGESi)>`")

    .setTimestamp()
    .setFooter('Myrith - Liste des commandes', bot.user.avatarURL);

  m.author.send(embed);
  m.delete();

};