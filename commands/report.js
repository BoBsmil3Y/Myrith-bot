module.exports.run = async (l, Discord, data, bot, m, args) => {

    var fs = require('fs');
    var data = JSON.parse(fs.readFileSync('Storage/reportData.json', 'utf8'));
    const idReport = '605702979156181005';
    const checkEmoji = "620918371596369940";
    const crossEmoji = "621624110941995019";


    if (m.channel.id === idReport) {
        if (args[0] != undefined && args[1] != undefined && args[2] != undefined) {
            rdm = (getRandomInt(6));

            let arr = [l.report1, l.report2, l.report3, l.report4, l.report5, l.report6, l.report7, l.report8];

            const ReportEmbed = new Discord.RichEmbed()
                .setColor('#ff5e57')
                .setTitle('Raison :')
                .setAuthor(m.author.username + ' a report ' + args[0], m.author.avatarURL)
                .setDescription(args[1])
                .addField('Description :', args[2])
                .attachFiles(['img/report/' + rdm + '.png'])
                .setThumbnail('attachment://' + rdm + '.png')
                .setTimestamp()
                .setFooter('Myrith - ' + arr[rdm], bot.user.avatarURL);


            if (args[3]) {
                if (args[3].includes('http') && (args[3].includes('.png') || args[3].includes('.jpg') || args[3].includes('.jpeg'))) {
                    ReportEmbed.setImage(args[3]);
                } else {
                    return m.author.send(l.invalidUrl) && m.delete();
                }
            }

            m.channel.send(ReportEmbed).then(async embedMessage => {

                await embedMessage.react(checkEmoji);
                await embedMessage.react(crossEmoji);

                if (!data.total) data.total = 1;

                if (!data.reports) data.reports = [];

                data["reports"].unshift({
                    "idMessage": embedMessage.id,
                    "number": data.total,
                    "playerReport": args[0],
                    "title": args[1],
                    "description": args[2],
                    "idAuthor": m.author.id
                });

                data.total++;

                fs.writeFile('Storage/reportData.json', JSON.stringify(data), (err) => {
                    if (err) console.error(err);
                });

            });
            m.delete();

        } else {
            m.author.send(l.reportNoArgs);
            m.delete();
        }
    };

};

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}