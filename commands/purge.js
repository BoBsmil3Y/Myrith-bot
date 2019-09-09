module.exports.run = async (l, Discord, data, bot, m, args) => {

  const idOwnerRole = "605040385173094410";
  const idAdminRole = "605022321496948757";

  if (!m.member.highestRole.id === idOwnerRole || !m.member.highestRole.id === idAdminRole) return m.channel.send((l.noPermission));

  if (isNaN(args[0])) {
    if (args[0] === "all") {
      const fetched = await m.channel.fetchMessages();
      m.channel.bulkDelete(fetched)
        .catch(error => m.reply(`Couldn't delete messages because of: ${error}`));
    } else return m.channel.send((l.purgeNotAll));

  } else {

    const deleteCount = parseInt(args[0], 10);

    if (!deleteCount || deleteCount < 1 || deleteCount > 100) return m.channel.send((l.purgeError));

    const fetched = await m.channel.fetchMessages({
      limit: deleteCount + 1
    });
    m.channel.bulkDelete(fetched)
      .catch(error => m.reply(`Couldn't delete messages because of: ${error}`));
  };

};