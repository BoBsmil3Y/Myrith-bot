module.exports.run = async (l, Discord, bot, m, args) => {

    const idIdee = "605049684192395264";

    if (m.channel.id === idIdee) {

        const command = "idee";

        let commandFile = require(`../constructor/questionConstructor.js`);
        commandFile.run(l, Discord, bot, m, command);

    };

};