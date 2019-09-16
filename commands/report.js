module.exports.run = async (l, Discord, data, bot, m, args) => {

    const idReport = '605702979156181005';

    if (message.channel.id === idReport) {
        if (args[0] != undefined && args[1] != undefined && args[2] != undefined) {
            rdm = (getRandomInt(7) + 1);

            switch (rdm) {
                case 1:
                    result = l.report1;
                    break;
                case 2:
                    result = l.report2;
                    break;
                case 3:
                    result = l.report3;
                    break;
                case 4:
                    result = l.report4;
                    break;
                case 5:
                    result = l.report5;
                    break;
                case 6:
                    result = l.report6;
                    break;
                case 7:
                    result = l.report7;
                    break;
            }

            const ReportEmbed = new Discord.RichEmbed()
                .setColor('#ff5e57')
                .setTitle('Raison :')
                .setAuthor(message.member.displayName + ' a report ' + args[0], message.member.user.avatarURL)
                .setDescription(args[1])
                .addField('Description :', args[2])
                .attachFiles(['img/report/' + rdm + '.png'])
                .setThumbnail('attachment://' + rdm + '.png')
                .setTimestamp()
                .setFooter('Myrith - ' + result, bot.user.avatarURL);


            if (args[3] != undefined) {
                if (args[3].includes('.png') || args[3].includes('.jpg') || args[3].includes('.jpeg')) {
                    ReportEmbed.setImage(args[3]);
                }
            }

            message.channel.send(ReportEmbed).then(async embedMessage => {
                await embedMessage.react('❌');
            });
            message.delete();

        } else {
            message.author.send(l.reportNoArgs);
            message.delete();
        }
    };

};

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}