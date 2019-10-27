module.exports.run = async (l, Discord, bot, m, args) => {

  var fs = require('fs');
  var data = JSON.parse(fs.readFileSync('Storage/ideaData.json', 'utf8'));
  const idCommandChannel = "616992100826873875";
  const idCandidature = "637586100507901953";
  const checkEmoji = "620918371596369940";
  const crossEmoji = "621624110941995019";

  /*
  TODO

  - !candidature v
  - Créer un salon avec seulement l'utilisateur et @admin @fonda
  - Un message s'envoit pour lui expliquer comment utiliser ce channel (Des questions s'enverront, et tu devras y répondre)
  - Tes réponses constituront ta candidature. Elle doit être soignée et vraie.
  - A la fin des questions, 

  • !candidature
  • !candidature stop (pour arrêter le processus)
  
  */

  if (m.channel.id === idCommandChannel) {

    let idCategorie = "605021522096160798";

    m.guild.createRole({
      name: `candidature-${m.author.username}`,
      color: '#1e272e',
      mentionable: false
    }).then(r => {
      //let roleCandid = m.guild.roles.find(r => r.name === `candidature-${m.author.username}`);

      m.member.addRole(r);

      m.guild.createChannel(
          `Candidature-${m.author.username}`, {
            type: 'text',
            topic: `Salon de candidature créé par ${m.author.username} | Id du joueur : ${m.author.id}`,
            parent: idCategorie,
          })
        .then((chan) => {
          /* Everyone */
          chan.overwritePermissions(m.guild.defaultRole, {
            VIEW_CHANNEL: false
          });

          /* Myrithiens */
          chan.overwritePermissions('605032955336851481', {
            VIEW_CHANNEL: false
          });

          /* VIP */
          chan.overwritePermissions('605041596190294066', {
            VIEW_CHANNEL: false
          });

          /* PARTENAIRE */
          chan.overwritePermissions('615912141534265354', {
            VIEW_CHANNEL: false
          });

          /* Staff */
          chan.overwritePermissions('605041750968369166', {
            VIEW_CHANNEL: false
          });

          chan.overwritePermissions(r.id, {
            VIEW_CHANNEL: true
          });

          /* A la fin */
          //chan.delete();
        })
        .catch(console.error);


      /* A la fin */
      //r.delete();
    });





  } else {
    m.author.send("Commande à entrer dans le salon adéquat !")
    m.delete();
  };

};