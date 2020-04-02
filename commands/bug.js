module.exports.run = async (l, Discord, bot, m, args) => {

    const idBug = "605701379310485514";

    if (m.channel.id === idBug) {

        const command = "bug";

        let commandFile = require(`../constructor/questionConstructor.js`);
        commandFile.run(l, Discord, bot, m, command);

    };

};