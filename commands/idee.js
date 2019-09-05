module.exports.run = async (l, Discord, data, bot, m, args) => {

    var fs = require('fs');
    var data = JSON.parse(fs.readFileSync('Storage/data.json', 'utf8'));
    const idIdea = "605049684192395264";

    if (m.channel.id === idIdea) {

        if (args[0] != undefined && args[1] != undefined && args[2] != undefined) {
            rdm = (getRandomInt(8) + 1);

            switch (rdm) {
                case 1:
                    result = l.idea1;
                    break;
                case 2:
                    result = l.idea2;
                    break;
                case 3:
                    result = l.idea3;
                    break;
                case 4:
                    result = l.idea4;
                    break;
                case 5:
                    result = l.idea5;
                    break;
                case 6:
                    result = l.idea6;
                    break;
                case 7:
                    result = l.idea7;
                    break;
                case 8:
                    result = l.idea8;
                    break;
            }

            if (!data.total) data.total = 1;

            const IdeaEmbed = new Discord.RichEmbed()
                .setColor('#ffc048')
                .setTitle('Serveur :')
                .setAuthor(m.member.displayName + ' annonce son idée, écoutez le !  Idée #' + data.total, m.author.avatarURL)
                .setDescription(args[0])
                .addField('Idée :', args[1])
                .addField('Description :', args[2])
                .attachFiles(['img/idea/' + rdm + '.png'])
                .setThumbnail('attachment://' + rdm + '.png')
                .setTimestamp()
                .setFooter('Myrith - ' + result, bot.user.avatarURL);

            m.channel.send(IdeaEmbed).then(async embedMessage => {
                await embedMessage.react('608273708725043258');
                await embedMessage.react('608273708628574222');
                await embedMessage.react('❌');
            });



            if (!data.total) data.total = 1;

            if (!data.ideas) data.ideas = [];
            data["ideas"].unshift({
                "number": data.total,
                "idea": args[1],
                "id": m.author.id
            });

            data.total++;

            fs.writeFile('Storage/data.json', JSON.stringify(data), (err) => {
                if (err) console.error(err);
            });

            m.delete();
        } else {
            //m.author.send(l.ideaNoArgs);
            //m.delete();
        }


    };

};

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}