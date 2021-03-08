const Discord = require("discord.js");
const config = require("../../config.json")
module.exports = {
    name: "say",
    category: "⛔️ Moderation Commands",
    description: "Says text",
    usage: ",say TEXT",
    run: async (client, message, args) => {
        if (!message.member.hasPermission(["VIEW_AUDIT_LOG"])) return message.reply(`**${message.author.username}**, you dont have the missing permissions!`)
        if(!args) return message.reply("ADD SOMETHING TO SAY");
        message.channel.send(args.join(" ")).then(msg =>{
            try{
                if(msg.channel.type === "news")
                msg.crosspost()
           } catch (error) {
               console.log(error.stack.toString().red)
           }  
        })
    }
}
