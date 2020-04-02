module.exports.run = async (l, Discord, bot, m, args) => {

    const idReport = "605702979156181005";

    if (m.channel.id === idReport) {

        const command = "report";

        let commandFile = require(`../constructor/questionConstructor.js`);
        commandFile.run(l, Discord, bot, m, command);

    };

};