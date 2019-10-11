module.exports.run = async (l, Discord, bot, m, args) => {

    var fs = require('fs');
    var data = JSON.parse(fs.readFileSync('Storage/bugData.json', 'utf8'));
    const idBug = '605701379310485514';
    const checkEmoji = "620918371596369940";
    const crossEmoji = "621624110941995019";

    if (m.channel.id === idBug) {
        if (args[0] != undefined && args[1] != undefined && args[2] != undefined) {
            rdm = (getRandomInt(6));

            let arr = [l.bug1, l.bug2, l.bug3, l.bug4, l.bug5, l.bug6, l.bug7, l.bug8];

            if (!data.total) data.total = 1;

            const bugEmbed = new Discord.RichEmbed()
                .setColor('#ff5e57')
                .setTitle('Serveur :')
                .setAuthor(m.author.username + ' a trouvé un bug ! Bug #' + data.total, m.author.avatarURL)
                .setDescription(args[0])
                .addField('Bug :', args[1])
                .addField('Description :', args[2])
                .attachFiles(['img/bug/' + rdm + '.png'])
                .setThumbnail('attachment://' + rdm + '.png')
                .setTimestamp()
                .setFooter('Myrith - ' + arr[rdm], bot.user.avatarURL);


            if (args[3]) {
                if (args[3].includes('http') && (args[3].includes('.png') || args[3].includes('.jpg') || args[3].includes('.jpeg'))) {
                    bugEmbed.setImage(args[3]);
                } else {
                    return m.author.send(l.invalidUrl) && m.delete();
                }
            }

            m.channel.send(bugEmbed).then(async embedMessage => {

                await embedMessage.react(checkEmoji);
                await embedMessage.react(crossEmoji);


                if (!data.bugs) data.bugs = [];

                data["bugs"].unshift({
                    "idMessage": embedMessage.id,
                    "title": args[1],
                    "description": args[2],
                    "idAuthor": m.author.id
                });

                data.total++;

                fs.writeFile('Storage/bugData.json', JSON.stringify(data), (err) => {
                    if (err) console.error(err);
                });

            });
            m.delete();

        } else {
            m.author.send(l.bugNoArgs);
            m.delete();
        }
    };

};

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}