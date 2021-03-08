const Discord = require("discord.js");
const config = require("../../config.json")
module.exports = {
    name: "unban",
    category: "⛔️ Moderation Commands",
    description: "bans a mentioned user",
    usage: "unban <@USER> [REASON]",
    run: async (client, message, args) => {
        if (!message.member.hasPermission(["BAN_MEMBERS"])) return message.reply(`**${message.author.username}**, you dont have the missing permissions!`)
        if (isNaN(args[0])) return message.channel.send("You need to provide an ID.")
        let bannedMember = await client.users.fetch(args[0])
    
        if (!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.reply("I dont have the permissions to ban users!")

       
        let reason = args.slice(1).join(" ")
        if (!reason) reason = "No reason given!"

        try {
            message.guild.members.unban(bannedMember, reason).catch(err => console.log(err.toString().red))
            let Sembed = new Discord.MessageEmbed()
            .setColor(config.colors.yes).setFooter(client.user.username, config.AVATARURL)
            .setDescription(`> You've been unbanned from **${message.guild.name}** because of ${reason}. You are permanently banned.`)
            
            bannedMember.send(Sembed).catch(err => console.log(err.toString().red))
        let embed = new Discord.MessageEmbed()
            .setColor(config.colors.yes).setFooter(client.user.username, config.AVATARURL)
            .setDescription(`✅ **${bannedMember.tag}** successfully unbanned!`)
            
        message.reply(embed).catch(err => console.log(err.red))
        } catch (e) {
            message.channel.send("COULD NOT UNBAN HIM, sorry, an error occurred").catch(err => console.log(err.toString().red))
            console.log(e.stack.toString().red)
        }
        
    }
}
