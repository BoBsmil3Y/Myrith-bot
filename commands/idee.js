module.exports.run = async (l, Discord, data, bot, m, args) => {

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

            let n = data.total
            console.log("n : " + n)
            const IdeaEmbed = new Discord.RichEmbed()
                .setColor('#ffc048')
                .setTitle('Serveur :')
                .setAuthor(m.member.displayName + ' annonce son idée, écoutez le !  Idée #' + n, m.author.avatarURL)
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


            data.total = n + 1;
            console.log("n : " + n)
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