module.exports.run = async (l, Discord, bot, m, answers, command) => {

  var fs = require('fs');

  const checkEmoji = "620918371596369940";
  const crossEmoji = "621624110941995019";
  const wipEmoji = "632172486812893184";
  const color = (command !== "idee") ? "#ff5e57" : "#ffc048";


  var data = JSON.parse(fs.readFileSync(`Storage/${command}Data.json`, 'utf8'));

  var rdm = getRandomInt(7); //0-7


  if (answers[0] != undefined && answers[1] != undefined && answers[2] != undefined) {

    if (!data.total) data.total = 1;
    if (!data[command + "s"]) data[command + "s"] = [];

    const embed = new Discord.RichEmbed()
      .setColor(color)
      .setAuthor(m.author.username + l[command].title + data.total, m.author.avatarURL)
      .setTitle('Serveur :')
      .setDescription(answers[0])
      .addField(`${command}:`, answers[1])
      .addField('Description :', answers[2])
      .attachFiles([`img/${command}/${rdm}.png`])
      .setThumbnail(`attachment://${rdm}.png`)
      .setTimestamp()
      .setFooter('Myrith - ' + l[command][rdm], bot.user.avatarURL);

    if (answers[3]) {
      if (answers[3] !== "non") {
        if (answers[3].includes('http') && (answers[3].includes('.png') || answers[3].includes('.jpg') || answers[3].includes('.jpeg'))) {
          embed.setImage(answers[3]);
        } else m.author.send(l.invalidUrl);
      }
    }

    m.channel.send(embed).then(async embedMessage => {

      data[command + "s"].unshift({
        "idMessage": embedMessage.id,
        "number": data.total,
        "title": answers[1],
        "description": answers[2],
        "idAuthor": m.author.id
      });

      data.total++;

      fs.writeFile(`Storage/${command}Data.json`, JSON.stringify(data), (err) => {
        if (err) console.error(err);
      });

      if (command !== "report") {
        await embedMessage.react('608273708725043258');
        await embedMessage.react('608273708628574222');
      }

      m.delete();
    });

  } else {
    try {
      m.author.send(l[command + "NoArgs"]);
      m.delete();
    } catch (err) {
      console.error(err);
    }
  }

};


function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}