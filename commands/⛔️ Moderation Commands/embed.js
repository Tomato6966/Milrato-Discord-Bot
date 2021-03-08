const Discord = require("discord.js");
const config = require("../../config.json")
module.exports = {
    name: "embed",
    category: "⛔️ Moderation Commands",
    description: "Sends an selfmade Embed into an channel",
    usage: "embed TITLE ++ DESCRIPTION",
    run: async (client, message, args, prefix) => {
        if (!message.member.hasPermission(["VIEW_AUDIT_LOG"])) return message.reply(`**${message.author.username}**, you dont have the missing permissions!`)
        let rest_of_the_string = message.content.slice(prefix.length + 'embed'.length); //removes the first part
        if(!rest_of_the_string.includes("++")) return message.reply(`USAGE: \`${prefix}embed [TITLE] ++ [DESCRIPTION]\``)
        let array_of_arguments = rest_of_the_string.split('++'); //[title, description, link, image]
    
        let embed = new Discord.MessageEmbed()
        embed.setTitle(array_of_arguments[0])
        embed.setDescription(array_of_arguments.slice(1).join(" "))
        embed.setColor(config.colors.yes)
        embed.setFooter(client.user.username, config.AVATARURL)
        embed.setThumbnail(message.guild.iconURL())
        embed.setFooter(message.guild.name, message.guild.iconURL())  
         
        message.channel.send(embed).then(msg =>{
            try{
                if(msg.channel.type === "news")
                msg.crosspost()
           } catch (error) {
               console.error(error)
           }  
        })
    }
}
