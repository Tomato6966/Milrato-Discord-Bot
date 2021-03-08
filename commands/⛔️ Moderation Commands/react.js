const Discord = require("discord.js");
const config = require("../../config.json")
module.exports = {
    name: "react",
    category: "⛔️ Moderation Commands",
    description: "Reacts to an message",
    usage: "react ID EMOJI",
    run: async (client, message, args) => {
        if (!message.member.hasPermission(["VIEW_AUDIT_LOG"])) return message.reply(`**${message.author.username}**, you dont have the missing permissions!`)
        if(!args) return message.reply("ADD SOMETHING TO SAY");
        try{

        message.channel.messages.fetch(args[0]).then(msg=>msg.react(args[1]))
    }catch (e){ console.log(e.stack.toString().red)}
        
    }
}
