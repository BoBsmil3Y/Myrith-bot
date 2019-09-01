const Discord = require("discord.js");
const config = require("./json/config.json");
const l = require("./json/language.json");
const data = require("./data/data.json");

const bot = new Discord.Client();
const prefix = config.prefix;

const idBob = "318004221809131521";
const idReport = "605702979156181005";
const idIdea = "605049684192395264";
const idBug = "605701379310485514";
const cross = new Discord.Attachment("img/cancel.png");

bot.on("ready", () => {
    console.log("MyrithBot est en ligne !");
    bot.user.setActivity("play.myrith.fr");
    bot.user.setUsername("Myrith-bot");
});

bot.login(config.token);

// Event "on message" to send to commands files
bot.on("message", async m => {
    if (m.author.bot) return;
    if (m.content.charAt(0) !== prefix) {
        if (
            m.channel.id === idBug ||
            m.channel.id === idIdea ||
            m.channel.id === idReport
        ) {
            m.author.send(l.noPrefix);
            m.delete();
        }
    }

    const args = m.content.slice(config.prefix.length).split(" &");
    const command = args
        .shift()
        .toLowerCase()
        .replace("é", "e");

    try {
        let commandFile = require(`./commands/${command}.js`);
        commandFile.run(l, Discord, data, bot, m, args);
    } catch (error) {
        const emojis = m.guild.emojis.get("608273720208785419");
        const errorEmbed = new Discord.RichEmbed()
            .setTitle(l.commandNotFound + emojis)
            .setColor("#ff5e57");

        m.channel.send(errorEmbed).then(msg => {
            msg.delete(5000);
        });
        m.delete();
    }
});

/*
bot.on('message', async message => {

    let args = message.content.split("&");
    let sender = message.member;

    
    if (message.channel.name === RIdea) {

        if (message.content.charAt(0) === prefix) {

            if (args[1] != undefined && args[2] != undefined && args[3] != undefined) {
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
                    .setAuthor(sender.displayName + ' annonce son idée, écoutez le !  Idée #' + n, sender.user.avatarURL)
                    .setDescription(args[1])
                    .addField('Idée :', args[2])
                    .addField('Description :', args[3])
                    .attachFiles(['img/idea/' + rdm + '.png'])
                    .setThumbnail('attachment://' + rdm + '.png')
                    .setTimestamp()
                    .setFooter('Myrith - ' + result, bot.user.avatarURL);

                message.channel.send(IdeaEmbed).then(async embedMessage => {
                    await embedMessage.react('608273708725043258');
                    await embedMessage.react('608273708628574222');
                    await embedMessage.react('❌');
                });


                data.total = n + 1;
                console.log("n : " + n)
                message.delete();
            } else {
                //message.author.send(l.ideaNoArgs);
                //message.delete();
            }

        } else {
            //message.author.send(l.ideaNoPrefix);
            //message.delete();
        }


    };

    if (message.channel.name === RBug) {



    };

});
*/

bot.on("messageReactionAdd", (reaction, user) => {
    if (
        reaction.message.channel.name === RIdea &&
        reaction.emoji.name === "❌" &&
        user.id !== bot.user.id
    ) {
        if (user.id === idBob) {
            //ajouter l'utilisateur (else if) pour qu'il puisse supprimer son idée

            if (reaction.message.embeds[0].author.name.includes("refusé")) {
                reaction.message.delete();
            } else {
                const receivedEmbed = reaction.message.embeds[0];
                const embed = new Discord.RichEmbed(receivedEmbed)
                    .setColor("#ff5e57")
                    .setAuthor("L'idée a été refusé par " + user.username, user.avatarURL)
                    .attachFiles(["img/cancel.png"])
                    .setThumbnail("attachment://cancel.png")
                    .setTimestamp()
                    .setFooter("Myrith - Idée refusée ❌", bot.user.avatarURL);

                reaction.message.delete();
                reaction.message.channel.send(embed).then(async embed => {
                    await embed.react("❌");
                });
            }
        } else if (user.id === author) {
            //Autheur du message (récupéré via le #0001 de l'idée stocké dans json data)
        } else {
            reaction.remove();
        }
    }
});

/*

STATISTIQUES

bot.on('guildMemberAdd', member => {

});

*/

/*
    
TODO

    EMBED:

        - Send DM to author of the idea when it's refuse


        - Add a reaction to delete it
        - When delete, send a message to say we have done the job
        
        
        - Embed for bug issue

    
    STATS:
        - Nombre de personnes sur le discord
        - Nombre de membres connectés discord

*/