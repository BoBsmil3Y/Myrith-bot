const Discord = require("discord.js");
const config = require("./json/config.json");
const l = require("./json/language.json");

const bot = new Discord.Client();
const prefix = config.prefix;

const idBob = "318004221809131521";
const idReport = "605702979156181005";
const idIdea = "605049684192395264";
const idBug = "605701379310485514";
const idReglement = "605034442842439700";
const roleMyrithiens = "605032955336851481";


bot.on("ready", () => {
    console.log("MyrithBot est en ligne !");
    bot.user.setActivity("#𝘗𝘓𝘈𝘠.𝘔𝘠𝘙𝘐𝘛𝘏.𝘍𝘙 🥳");
});

bot.login(config.token);

const events = {
    MESSAGE_REACTION_ADD: 'messageReactionAdd',
    MESSAGE_REACTION_REMOVE: 'messageReactionRemove',
};

bot.on('raw', async event => {
    if (!events.hasOwnProperty(event.t)) return;

    const {
        d: data
    } = event;
    const user = bot.users.get(data.user_id);
    const channel = bot.channels.get(data.channel_id) || await user.createDM();

    if (channel.messages.has(data.message_id)) return;

    const message = await channel.fetchMessage(data.message_id);
    const emojiKey = (data.emoji.id) ? `${data.emoji.name}:${data.emoji.id}` : data.emoji.name;
    let reaction = message.reactions.get(emojiKey);

    if (!reaction) {
        const emoji = new Discord.Emoji(bot.guilds.get(data.guild_id), data.emoji);
        reaction = new Discord.MessageReaction(message, emoji, 1, data.user_id === bot.user.id);
    }

    bot.emit(events[event.t], reaction, user);
});

var fs = require('fs');
var data = JSON.parse(fs.readFileSync('Storage/ideaData.json', 'utf8'));

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
    } else {

        const args = (m.content.slice(1).split(" ").shift() === "idée" ||
            m.content.slice(1).split(" ").shift() === "bug" ||
            m.content.slice(1).split(" ").shift() === "report") ? m.content.slice(config.prefix.length).split(" & ") : m.content.slice(config.prefix.length).split(" ");

        const command = args.shift().toLowerCase().replace("é", "e");

        try {
            let commandFile = require(`./commands/${command}.js`);
            commandFile.run(l, Discord, bot, m, args);
        } catch (error) {
            const emojis = m.guild.emojis.get("608273720208785419");
            const errorEmbed = new Discord.RichEmbed().setTitle(l.commandNotFound + emojis).setColor("#ff5e57");

            m.channel.send(errorEmbed).then(msg => {
                msg.delete(5000);
            });
            m.delete();
        }

    }

});


bot.on("messageReactionAdd", (reaction, user) => {
    if (user.id === bot.user.id) return;

    /*
    if (reaction.emoji.name === "❌") { // Réaction pour supprimer

        if (reaction.message.channel.id === idIdea) { // Si chanel idée

            if (user.id === idBob) { // Si c'est moi 

            } else { // Regarder si c'est l'autheur


                if (data.ideas.idMessage = reaction.message.embeds[0].id) {

                }
                //
                //Comparer l'id du message envoyé avec celui de l'id du message dans data.json
            }

        } else if (reaction.message.channel.id === idBug) {

        } else if (reaction.message.channel.id === idReport) {

        }

    } else if (reaction.emoji.name === "☑") { // Réaction pour valider

        if (reaction.message.channel.id === idIdea) { //Passe l'idée en vert

        } else if (reaction.message.channel.id === idBug) { // Passe le bug dans #fix-bug

        } else if (reaction.message.channel.id === idReport) { // Supprime le report et envoi un message à celui qui avait report

        }

    } else if (reaction.emoji.id === "620918371596369940") {

        //Validation des règles du discord

        if (reaction.message.channel.id === idReglement) {

            reaction.message.member.addRole(roleMyrithiens);

        }
    }
    */

    if (reaction.message.channel.id === idIdea && reaction.emoji.name === "❌") {

        if (user.id === idBob) {

            if (reaction.message.embeds[0].author.name.includes("refusé")) {
                var data = JSON.parse(fs.readFileSync('Storage/ideaData.json', 'utf8'));

                for (let el of data.ideas) {

                    if (el.idMessage === reaction.message.id) {

                        bot.fetchUser(el.idAuthor).then(u => {
                            u.send(l.deleteIdea);
                        })
                        reaction.message.delete();

                    }

                }

                reaction.message.delete();

            } else {
                const receivedEmbed = reaction.message.embeds[0];
                //envoyer l'embed à celui qui le refuse + attends une réponse qui sera la raison.
                const embed = new Discord.RichEmbed(receivedEmbed)
                    .setColor("#ff5e57")
                    .setAuthor("L'idée a été refusé par " + user.username, user.avatarURL)
                    .attachFiles(["img/cancel.png"])
                    .setThumbnail("attachment://cancel.png")
                    .setTimestamp()
                    .setFooter("Myrith - Idée refusée ❌", bot.user.avatarURL);
                //ajouter la raison dans une field ("Raison", imput)

                reaction.message.delete();
                reaction.message.channel.send(embed).then(async embed => {
                    await embed.react("❌");
                });
            }
        } else {
            var data = JSON.parse(fs.readFileSync('Storage/ideaData.json', 'utf8'));

            for (let el of data.ideas) {

                if (el.idMessage === reaction.message.id) {

                    bot.fetchUser(el.idAuthor).then(u => {
                        u.send(l.deleteIdea);
                    })
                    reaction.message.delete();

                }

            }

        }
    }
});

bot.on("guildMemberAdd", (member) => {
    try {
        let commandFile = require(`./handler/countStats.js`);
        commandFile.run(bot);
    } catch (error) {
        console.error(error);
    }
});

bot.on("guildMemberRemove", (member) => {
    try {
        let commandFile = require(`./handler/countStats.js`);
        commandFile.run(bot);
    } catch (error) {
        console.error(error);
    }
});

bot.on('presenceUpdate', (oldMember, newMember) => {
    try {
        let commandFile = require(`./handler/onlineStats.js`);
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


    REACTION:
        - Ajouter une réaction pour accepter les règles. (Myrith role: 605032955336851481)

*/