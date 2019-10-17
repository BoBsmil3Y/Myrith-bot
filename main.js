const Discord = require("discord.js");
const config = require("./json/config.json");
const l = require("./json/language.json");

const bot = new Discord.Client();
const prefix = config.prefix;

const idReport = "605702979156181005";
const idIdea = "605049684192395264";
const idBug = "605701379310485514";
const idReglement = "605034442842439700";



bot.on("ready", () => {

  console.log("MyrithBot est en ligne !");
  bot.user.setActivity("#𝘗𝘓𝘈𝘠.𝘔𝘠𝘙𝘐𝘛𝘏.𝘍𝘙 🥳");

});

const events = {
  MESSAGE_REACTION_ADD: "messageReactionAdd",
  MESSAGE_REACTION_REMOVE: "messageReactionRemove"
};

bot.on("raw", async event => {
  if (!events.hasOwnProperty(event.t)) return;

  const {
    d: data
  } = event;
  const user = bot.users.get(data.user_id);
  const channel = bot.channels.get(data.channel_id) || (await user.createDM());

  if (channel.messages.has(data.message_id)) return;

  const message = await channel.fetchMessage(data.message_id);
  const emojiKey = data.emoji.id ? `${data.emoji.name}:${data.emoji.id}` : data.emoji.name;
  let reaction = message.reactions.get(emojiKey);

  if (!reaction) {
    const emoji = new Discord.Emoji(bot.guilds.get(data.guild_id), data.emoji);
    reaction = new Discord.MessageReaction(message, emoji, 1, data.user_id === bot.user.id);
  }

  bot.emit(events[event.t], reaction, user);
});

bot.on("message", async m => {
  if (m.author.bot) return;
  if (m.channel.type === "dm") return;
  if (m.content.includes("onlineStats") || m.content.includes("countStats"))
    return m.delete();

  if (m.content.charAt(0) !== prefix) {
    if (m.channel.id === idBug || m.channel.id === idIdea || m.channel.id === idReport) {
      m.author.send(l.noPrefix);
      m.delete();
    }
  } else {
    const command = m.content.slice(1).split(" ").shift().toLowerCase().replace("é", "e").replace("è", "e");

    const args = (command === "idee" || command === "bug" || command === "report" || command === "reglement" ?
      m.content.slice(config.prefix.length + command.length + 3).split(" & ") : m.content.slice(config.prefix.length + command.length + 1).split(" "));

    try {
      let commandFile = require(`./commands/${command}.js`);
      commandFile.run(l, Discord, bot, m, args);
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

  if (reaction.message.channel.id === idIdea) {
    let commandFile = require(`./handler/reactionIdea.js`);
    commandFile.run(l, Discord, bot, reaction, user);
  } else if (reaction.message.channel.id === idReglement) {
    let commandFile = require(`./handler/reactionRules.js`);
    commandFile.run(l, Discord, bot, reaction, user);
  } else if (reaction.message.channel.id === idReport) {
    let commandFile = require(`./handler/reactionReport.js`);
    commandFile.run(l, Discord, bot, reaction, user);
  } else if (reaction.message.channel.id === idBug) {
    let commandFile = require(`./handler/reactionBug.js`);
    commandFile.run(l, Discord, bot, reaction, user);
  }
});

bot.on("messageReactionRemove", (reaction, user) => {
  if (user.id === bot.user.id) return;

  if (reaction.message.channel.id === idReglement) {
    let commandFile = require(`./handler/reactionRules.js`);
    commandFile.run(l, Discord, bot, reaction, user);
  }
});

bot.on("guildMemberAdd", member => {
  try {
    let commandFile = require(`./handler/guildMemberRemove.js`);
    commandFile.run(bot, member);
  } catch (error) {
    console.error(error);
  }
});

bot.on("guildMemberRemove", member => {
  try {
    let commandFile = require(`./handler/guildMemberRemove.js`);
    commandFile.run(bot);
  } catch (error) {
    console.error(error);
  }
});

bot.on("presenceUpdate", (oldMember, newMember) => {
  try {
    let commandFile = require(`./handler/onlineStats.js`);
    commandFile.run(bot, oldMember, newMember);
  } catch (error) {
    console.error(error);
  }
});

bot.login(process.env.TOKEN);