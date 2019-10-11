module.exports.run = async (l, Discord, bot, m, args) => {

  const idOwnerRole = "605040385173094410";
  const idAdminRole = "605022321496948757";

  if (m.member.highestRole.id === idOwnerRole || m.member.highestRole.id === idAdminRole) {
    if (isNaN(args[0])) {
      if (args[0] === "all") {
        const fetched = await m.channel.fetchMessages();
        m.channel.bulkDelete(fetched)
          .catch(async error => m.reply(`Couldn't delete messages because of: ${error}`));
      } else return m.reply(l.purgeNotAll).then(async msg => {
        msg.delete(3000);
        m.delete();
      });

    } else {

      const deleteCount = parseInt(args[0], 10);

      if (!deleteCount || deleteCount < 1 || deleteCount > 100) return m.reply(l.purgeError).then(async msg => {
        msg.delete(3000);
        m.delete();;
      });

      const fetched = await m.channel.fetchMessages({
        limit: deleteCount + 1
      });
      m.channel.bulkDelete(fetched)
        .catch(error => m.reply(`Couldn't delete messages because of: ${error}`));
    };
  } else {
    m.channel.send(l.noPermission).then(async msg => {
      msg.delete(3000);
      m.delete();;
    });
  }
};