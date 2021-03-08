const Discord = require("discord.js")
const config = require("../../config.json")
module.exports = {
    name: "avatar",
    category: "⚙️ Utility Commands",
    description: "Gets the avatar of a user or yourself",
    usage: "avatar [@USER]",
    run: async(client, message, args) => {
       /* If user isnt found it selects ur profile */
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(' ') || x.user.username === args[0]) || message.member;

        if (!member.user.avatarURL) return message.channel.send(`That user does not have an avatar`);

        const avatar = new Discord.MessageEmbed()
            .setTitle(`${member.user.username}'s Avatar`)
            .setColor(config.colors.yes).setFooter(client.user.username, config.AVATARURL)
            .setImage(member.user.avatarURL())
            .setURL(member.user.avatarURL())
        message.channel.send(avatar)
    }
};