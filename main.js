const Discord = require("discord.js");
const config = require("./json/config.json");
const l = require("./json/language.json");
const data = require("./Storage/data.json");

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
    if (m.channel.type === 'dm') return;
    if (m.content.includes('onlineStats') || m.content.includes('countStats')) return m.delete();

    if (m.content.charAt(0) !== prefix) {
        if (m.channel.id === idBug || m.channel.id === idIdea || m.channel.id === idReport) {
            m.author.send(l.noPrefix);
            m.delete();
        }
    }

    if (m.content.charAt(0) === prefix) {

        const args = (m.content.slice(1).split(" ").shift() === "idée" ||
            m.content.slice(1).split(" ").shift() === "bug" ||
            m.content.slice(1).split(" ").shift() === "report") ? m.content.slice(config.prefix.length).split(" &") : m.content.slice(config.prefix.length).split(" ");

        console.log(args);

        const command = args
            .shift()
            .toLowerCase()
            .replace("é", "e");

        console.log(command);
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
    }


});

bot.on("messageReactionAdd", (reaction, user) => {
    if (user.id === bot.user.id) return;

    if (
        reaction.message.channel.id === idIdea &&
        reaction.emoji.name === "❌"
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

bot.on("guildMemberAdd", (member) => {
    try {
        let commandFile = require(`./commands/countStats.js`);
        commandFile.run(bot);
    } catch (error) {
        console.error(error);
    }
});

bot.on("guildMemberRemove", (member) => {
    try {
        let commandFile = require(`./commands/countStats.js`);
        commandFile.run(bot);
    } catch (error) {
        console.error(error);
    }
});

bot.on('presenceUpdate', (oldMember, newMember) => {
    try {
        let commandFile = require(`./commands/onlineStats.js`);
        commandFile.run(bot, oldMember, newMember);
    } catch (error) {
        console.error(error);
    }
});

/*
    
TODO

    EMBED:

        IDEA:
        - Send DM to author of the idea when it's refuse

        IDEA / REPORT / BUG : 
        - Add a reaction to delete it
        - Add a reaction to approve it
        
        BUG / REPORT:
        -When delete, send a message to say we have done the job
        
        BUG :
        - Embed for bug issue

    PURGE
        - !purge <number>

    REACTION:
        - Ajouter une réaction pour accepter les règles. (Myrith role: 605032955336851481)

*/