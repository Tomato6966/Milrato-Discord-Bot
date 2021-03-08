const Discord = require("discord.js")
const config = require("../../config.json")
module.exports = {
    name: "uptime",
	aliases: ["uptime"],
    category: "🤖 Information Commands",
    description: "Returns latency and API ping",
    usage: "uptime",
    run: async (client, message, args) => {
    let days = Math.floor(client.uptime / 86400000);
    let hours = Math.floor(client.uptime / 3600000) % 24;
    let minutes = Math.floor(client.uptime / 60000) % 60;
    let seconds = Math.floor(client.uptime / 1000) % 60;
    const uptime = new Discord.MessageEmbed()
    .setTitle(`**Uptime**`)
    .setColor(config.colors.yes).setFooter(client.user.username, config.AVATARURL)
    .setTimestamp()
    .setFooter(client.user.username, config.AVATARURL) 
    .setDescription(`:clock1: \`${days}days\` \`${hours}hours\` \`${minutes}minutes\` \`${seconds}seconds\``);			
    return message.channel.send(uptime);
    }
}
