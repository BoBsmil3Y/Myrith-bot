module.exports.run = async (l, Discord, bot, m, args) => {

  var fs = require('fs');
  var data = JSON.parse(fs.readFileSync('Storage/ideaData.json', 'utf8'));
  const idCommandChannel = "616992100826873875";
  const idCandidature = "637586100507901953";
  const checkEmoji = "620918371596369940";
  const crossEmoji = "621624110941995019";

  /*
  TODO

  ❌!candidature v

  ✔️Créer un salon avec seulement l 'utilisateur et @admin @fonda
  ❌Un message s 'envoit pour lui expliquer comment utiliser ce channel (Des questions s'enverront, et tu devras y répondre)
  ❌Tes réponses constituront ta candidature.Elle doit être soignée et vraie.
  ❌A la fin des questions,

  • !candidature
  • !candidature stop (pour arrêter le processus)
  
  */

  if (m.channel.id === idCommandChannel) {

    let idCategorie = "605021522096160798";

    if (!m.guild.channels.find(c => c.name === `candidature-${m.author.id}`)) {
      /* Si pas de salon */

      m.guild.createChannel(
          `candidature-${m.author.id}`, {
            type: 'text',
            topic: `Salon de candidature créé par ${m.author.username} | Id du joueur : ${m.author.id}`,
            parent: idCategorie,
            permissionOverwrites: [{
                id: m.guild.id,
                deny: ['VIEW_CHANNEL'],
              },
              {
                id: m.author.id,
                allow: ['VIEW_CHANNEL'],
              }
            ]
          })
        .then((chan) => {

          let help = new Discord.RichEmbed()
            .setTitle(`Voici ton salon pour effectuer ta candidature.`)
            .setDescription(`Attention, tu devras lire attentivement les questions et y répondre en environ 5 minutes maximum chacune. Autrement, ta candidature sera annulée et tu devras recommencer. Bonne chance <@${m.author.id}> !`)
            .setThumbnail(bot.user.avatarURL)
            .setTimestamp()
            .setFooter(`Myrith - Candidature pour ${m.author.username}`)
            .setColor("#0fbcf9");

          chan.send(help);

          /* Mettre des await en attendant le message 'next' */

        });
    } else {
      m.author.send("Vous avez déjà votre salon de candidature !")
      m.delete();
    }

  } else {
    m.author.send("Commande à entrer dans le salon adéquat !")
    m.delete();
  };

};