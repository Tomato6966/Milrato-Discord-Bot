const Discord = require("discord.js")
const config = require("../../config.json")
module.exports = {
    name: "ping",
	aliases: ["latency"],
    category: "🤖 Information Commands",
    description: "Returns latency and API ping",
    usage: "ping",
    run: async (client, message, args) => {
        return message.reply(
            new Discord.MessageEmbed()
                .setAuthor(`PING`, "https://cdn.discordapp.com/attachments/743944083470549063/777968158978867240/signal_strength.png", "https://dc.musicium.eu")
                .setColor(config.colors.yes).setFooter(client.user.username, config.AVATARURL)
                .setFooter(client.user.username, config.AVATARURL)  
                .setDescription(`\`${client.ws.ping} ms\``)
        )
    }
}
