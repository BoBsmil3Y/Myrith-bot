module.exports.run = async (l, Discord, bot, m, args) => {

  var fs = require('fs');
  var data = JSON.parse(fs.readFileSync('Storage/ideaData.json', 'utf8'));

  console.log();
  for (let element of data.ideas) {
    if (element.idMessage === "620982388700479499") {
      m.channel.fetchMessages()
    }
  }

}