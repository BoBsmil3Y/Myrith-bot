module.exports.run = async (l, Discord, data, bot, m, args) => {

    var fs = require('fs');
    var data = JSON.parse(fs.readFileSync('Storage/ideaData.json', 'utf8'));
    const idIdea = "605049684192395264";
    const checkEmoji = "620918371596369940";
    const crossEmoji = "621624110941995019";


    if (m.channel.id === idIdea) {

        if (args[0] != undefined && args[1] != undefined && args[2] != undefined) {
            rdm = getRandomInt(7); //0-7

            let arr = [l.idea1, l.idea2, l.idea3, l.idea4, l.idea5, l.idea6, l.idea7, l.idea8];

            if (!data.total) data.total = 1;

            const IdeaEmbed = new Discord.RichEmbed()
                .setColor('#ffc048')
                .setTitle('Serveur :')
                .setAuthor(m.author.username + ' annonce son idée, écoutez le !  Idée #' + data.total, m.author.avatarURL)
                .setDescription(args[0])
                .addField('Idée :', args[1])
                .addField('Description :', args[2])
                .attachFiles(['img/idea/' + rdm + '.png'])
                .setThumbnail('attachment://' + rdm + '.png')
                .setTimestamp()
                .setFooter('Myrith - ' + arr[rdm], bot.user.avatarURL);

            m.channel.send(IdeaEmbed).then(async embedMessage => {

                if (!data.total) data.total = 1;

                if (!data.ideas) data.ideas = [];

                data["ideas"].unshift({
                    "idMessage": embedMessage.id,
                    "number": data.total,
                    "title": args[1],
                    "description": args[2],
                    "idAuthor": m.author.id
                });

                data.total++;

                fs.writeFile('Storage/ideaData.json', JSON.stringify(data), (err) => {
                    if (err) console.error(err);
                });

                m.delete();

                await embedMessage.react('608273708725043258');
                await embedMessage.react('608273708628574222');
                await embedMessage.react(checkEmoji);
                await embedMessage.react(crossEmoji);

            });

        } else {
            try {
                m.author.send(l.ideaNoArgs);
                m.delete();
            } catch (err) {
                console.error(err);
            }
        }

    };

};

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}