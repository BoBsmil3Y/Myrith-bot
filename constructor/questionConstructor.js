module.exports.run = async (l, Discord, bot, m, command) => {

  let author = m.author;

  const idCommandChannel = "616992100826873875";
  const idCategorie = "605021522096160798";

  let question = new Discord.RichEmbed().setColor("#0fbcf9");
  let questions = [l[command]["q1"], l[command]["q2"], l[command]["q3"], l[command]["q4"]]
  let desc = (l[command]["desc"] !== null) ? l[command]["desc"] : undefined;
  var answers = [];


  if (!m.guild.channels.find(c => c.name === `${command}-${m.author.id}`)) {

    let date = new Date(m.createdTimestamp);

    m.guild.createChannel(
      `${command}-${m.author.id}`, {
        type: 'text',
        topic: `Salon créé par ${m.author.username} | Créé à ${date.getHours()}h${date.getMinutes()} | Id du joueur : ${m.author.id} `,
        parent: idCategorie,
        permissionOverwrites: [{
          id: m.guild.id,
          deny: ['VIEW_CHANNEL']
        }, {
          id: m.author.id,
          allow: ['VIEW_CHANNEL']
        }]
      }).then(chan => {

      m.reply(`Un salon a été créé pour que tu puisses nous donner des informations à propos de ton ${command}, <#${chan.id}>`).then(m => m.delete(5000));

      let firstMessage = new Discord.RichEmbed()
        .setTitle(`Voici ton salon pour effectuer ton ${command}.`)
        .setDescription(`Tu as 10 minutes par question pour y répondre <@${m.author.id}>. Soit le plus clair possible dans tes explications pour que l'on puisse reproduire/retrouver/comprendre ton ${command} facilement !`)
        .setThumbnail(bot.user.avatarURL)
        .setTimestamp()
        .setFooter(`Myrith - Merci pour ton ${command} ${m.author.username}`)
        .setColor("#2980b9");

      chan.send(firstMessage);

      const questionCall = async function () {
        console.log(questions.length);
        for (i = 0; i < questions.length; i++) {

          questionEmbed = new Discord.RichEmbed().setTitle(questions[i]).setTimestamp().setFooter(`Myrith - Question n°${i+1}/${questions.length}`);
          if (i === 3 && command === "bug") questionEmbed.setDescription(desc);

          const theQuestion = await chan.send(questionEmbed);
          const filter = (message => message.author.id === author.id);

          const collected = await chan.awaitMessages(filter, {
            max: 1,
            time: 600000,
          });

          answers.push(collected.first().content);
        }
      }

      questionCall().then(() => {
        let commandFile = require(`../constructor/embedConstructor.js`);
        commandFile.run(l, Discord, bot, m, answers, command);

        chan.delete();
      });

    });

  } else {
    m.author.send(`Vous avez déjà votre salon pour déclarer votre ${command} !`);
    m.delete();
  };

}