const Discord = require("discord.js");
const config = require("../../config.json")
module.exports = {
    name: "kick",
    category: "⛔️ Moderation Commands",
    description: "bans a mentioned user",
    usage: "kick <@USER> [REASON]",
    run: async (client, message, args) => {
        if (!message.member.hasPermission(["BAN_MEMBERS"])) return message.reply(`**${message.author.username}**, you dont have the missing permissions!`)

        let banMember = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        console.log(banMember)
        
        if (!banMember) return message.reply(`**${message.author.username}**, please tag a user to kick them!`)
        let reason = args.slice(1).join(" ");
        if (!reason) reason = "no reason"
    
        if (!message.guild.me.hasPermission(["KICK_MEMBERS", "ADMINISTRATOR"])) return message.reply("I dont have the permissions to kick users!")
    
        let Sembed = new Discord.MessageEmbed()
            .setColor(config.colors.yes).setFooter(client.user.username, config.AVATARURL)
            .setDescription(`> You've been kicked from ${message.guild.name} because of ${reason}.`)
        let i = 0;
        banMember.send(Sembed).catch(err => console.log(err.toString().red))
        banMember.kick(banMember, reason).catch(err => {
            console.log(err.toString().red)
            i++
           }).then(
               ()=>{
                let embed = new Discord.MessageEmbed()
                .setColor(config.colors.yes).setFooter(client.user.username, config.AVATARURL)
                .setDescription(`✅ **${banMember.user.tag}** successfully kicked!`)
                if(i==1)
                return message.reply("MISSING PERMISSIONS TO KICK HIM!")
                message.reply(embed).then(msg => {
                    msg.delete({timeout: 10000});
                })
               }
           )
        
    
        
    }
}
