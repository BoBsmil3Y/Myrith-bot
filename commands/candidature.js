module.exports.run = async (l, Discord, bot, m, args) => {

  const idAdminCandid = "637586100507901953";
  const idCommandChannel = "616992100826873875";
  const idCategorie = "605021522096160798";
  let questionEmbed = new Discord.RichEmbed().setTimestamp().setFooter(`Myrith - Candidature pour ${m.author.username}`).setColor("#0fbcf9");
  let questions = ["Pour quel rôle candidates-tu ?", "Quel âge as-tu ?", "Dans quelle classe es-tu et dans quelle section ou bien, où travailles-tu ?", "Quand es-tu disponible pour engendrer ton rôle ?", "As-tu déjà intégrer ce rôle sur un autre serveur / autre entreprise ? Si oui, donne nous le nom de celui/celle ci.", `Pourquoi candidates-tu pour ce rôle ?`, "Autres choses à ajouter ? (Tu as 5 minutes pour cette dernière question."];
  let answers = [];

  if (m.channel.id === idCommandChannel) {

    if (!m.guild.channels.find(c => c.name === `candidature-${m.author.id}`)) {

      m.guild.createChannel(
        `candidature-${m.author.id}`, {
          type: 'text',
          topic: `Salon de candidature créé par ${m.author.username} | Id du joueur : ${m.author.id}`,
          parent: idCategorie,
          permissionOverwrites: [{
            id: m.guild.id,
            deny: ['VIEW_CHANNEL']
          }, {
            id: m.author.id,
            allow: ['VIEW_CHANNEL']
          }]
        }).then(chan => {

        let firstMessage = new Discord.RichEmbed()
          .setTitle(`Voici ton salon pour effectuer ta candidature.`)
          .setDescription(`Attention, tu devras lire attentivement les questions et y répondre en moins de 10 minutes chacunes! Bonne chance <@${m.author.id}> !`)
          .setThumbnail(bot.user.avatarURL)
          .setTimestamp()
          .setFooter(`Myrith - Candidature pour ${m.author.username}`)
          .setColor("#2980b9");

        chan.send(firstMessage);

        const filter = response => response.author.id === m.author.id;

        let question = new Discord.RichEmbed().setTitle(questions[0]).setTimestamp().setFooter(`Myrith - Question n°1/7`).setColor("#0fbcf9");

        chan.send(question)
        chan.awaitMessages(filter, {
          max: 1,
          time: 600000
        }).then(collected => {
          answers.push(collected.first().content);
          question = new Discord.RichEmbed().setTitle(questions[1]).setTimestamp().setFooter(`Myrith - Question n°2/7`).setColor("#0fbcf9");
          chan.send(question)
          chan.awaitMessages(filter, {
            max: 1,
            time: 600000
          }).then(collected => {
            answers.push(collected.first().content);
            question = new Discord.RichEmbed().setTitle(questions[2]).setTimestamp().setFooter(`Myrith - Question n°3/7`).setColor("#0fbcf9");
            chan.send(question)
            chan.awaitMessages(filter, {
              max: 1,
              time: 600000
            }).then(collected => {
              answers.push(collected.first().content);
              question = new Discord.RichEmbed().setTitle(questions[3]).setTimestamp().setFooter(`Myrith - Question n°4/7`).setColor("#0fbcf9");
              chan.send(question)
              chan.awaitMessages(filter, {
                max: 1,
                time: 600000
              }).then(collected => {
                answers.push(collected.first().content);
                question = new Discord.RichEmbed().setTitle(questions[4]).setTimestamp().setFooter(`Myrith - Question n°5/7`).setColor("#0fbcf9");
                chan.send(question)
                chan.awaitMessages(filter, {
                  max: 1,
                  time: 600000
                }).then(collected => {
                  answers.push(collected.first().content);
                  question = new Discord.RichEmbed().setTitle(questions[5]).setTimestamp().setFooter(`Myrith - Question n°6/7`).setColor("#0fbcf9");
                  chan.send(question)
                  chan.awaitMessages(filter, {
                    max: 1,
                    time: 600000
                  }).then(collected => {
                    answers.push(collected.first().content);
                    question = new Discord.RichEmbed().setTitle(questions[6]).setDescription("Si vous n'avez à rajouter, veuillez écrire `rien`").setTimestamp().setFooter(`Myrith - Question n°7/7`).setColor("#0fbcf9");
                    chan.send(question)
                    chan.awaitMessages(filter, {
                      max: 1,
                      time: 300000
                    }).then(collected => {

                      answers.push(collected.first().content);

                      let finalCandidature = new Discord.RichEmbed()
                        .setAuthor(`Candidature de ${m.author.username} pour le rôle ${answers[0]}`, bot.user.avatarURL)
                        .setTitle(questions[1])
                        .setDescription(answers[1])
                        .addField(questions[2], answers[2])
                        .addField(questions[3], answers[3])
                        .addField(questions[4], answers[4])
                        .addField(questions[5], answers[5])
                        .addField(questions[6], answers[6])
                        .setThumbnail(m.author.avatarURL)
                        .setTimestamp()
                        .setFooter(`Myrith - Candidature`, bot.user.avatarURL)
                        .setColor("#05c46b");

                      m.guild.channels.find(c => c.id === idAdminCandid).send(finalCandidature);

                      m.author.send(`Voici votre candidature ${m.author.username} !`);
                      m.author.send(finalCandidature);

                      chan.delete(5000);

                    }).catch(() => {
                      m.author.send("Tu n'as pas répondu dans le temps indiqué ! Tu vas devoir recommencer. Retourne dans le salon pour effectuer la commande.");
                      chan.delete(5000);
                    });

                  }).catch(() => {
                    m.author.send("Tu n'as pas répondu dans le temps indiqué ! Tu vas devoir recommencer. Retourne dans le salon pour effectuer la commande.");
                    chan.delete(5000);
                  });
                }).catch(() => {
                  m.author.send("Tu n'as pas répondu dans le temps indiqué ! Tu vas devoir recommencer. Retourne dans le salon pour effectuer la commande.");
                  chan.delete(5000);
                });
              }).catch(() => {
                m.author.send("Tu n'as pas répondu dans le temps indiqué ! Tu vas devoir recommencer. Retourne dans le salon pour effectuer la commande.");
                chan.delete(5000);
              });
            }).catch(() => {
              m.author.send("Tu n'as pas répondu dans le temps indiqué ! Tu vas devoir recommencer. Retourne dans le salon pour effectuer la commande.");
              chan.delete(5000);
            });
          }).catch(() => {
            m.author.send("Tu n'as pas répondu dans le temps indiqué ! Tu vas devoir recommencer. Retourne dans le salon pour effectuer la commande.");
            chan.delete(5000);
          });
        }).catch(() => {
          m.author.send("Tu n'as pas répondu dans le temps indiqué ! Tu vas devoir recommencer. Retourne dans le salon pour effectuer la commande.");
          chan.delete(5000);
        });


      }); // End createChannel

      // Delete the command
      m.delete();

      // End if channel already exist
    } else {
      m.author.send("Vous avez déjà votre salon de candidature !");
      m.delete();
    };

    // End if channel is not the good one to enter the command
  } else {
    m.author.send("Commande à entrer dans le salon adéquat !");
    m.delete();
  };
};