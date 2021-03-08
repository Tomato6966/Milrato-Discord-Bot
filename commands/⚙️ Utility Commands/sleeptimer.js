const functions = require("../../functions")
const config = require("../../config.json")
module.exports = {
    name: "sleeptimer",
    category: "⚙️ Utility Commands",
    aliases: ["sleep"],
    useage: "sleeptimer <Duration in Hours>",
  description: "Sets a sleep timer which will stop the bot / leave the channel, and kick you out of the channel after the hours of duration you set",
  run: async (client, message, args) => {
              //CHECK IF DJ LOL
              if(client.settings.get(message.guild.id, `djroles`).toString()!==""){
                let isdj=false;
                let leftb = "";
                    if(client.settings.get(message.guild.id, `djroles`).join("") === "") 
                        leftb = "no Channels, aka all Channels are Bot Channels"
                    else
                        for(let i = 0; i < client.settings.get(message.guild.id, `djroles`).length; i++){
                                if(message.member.roles.cache.has(client.settings.get(message.guild.id, `djroles`)[i])) isdj = true;
                                    if(!message.guild.roles.cache.get(client.settings.get(message.guild.id, `djroles`)[i])) continue;
                                leftb += "<@&" + client.settings.get(message.guild.id, `djroles`)[i] + "> | "
                        }
                    if(!isdj && !message.member.hasPermission("ADMINISTRATOR")) return functions.embedbuilder(client, 6000, message, config.colors.no, "DJ-ROLE", `<:declined:780403017160982538> You don\'t have permission for this Command! You need to have: ${leftb}`)
                }
                //CHECK IF DJ LOL
    if (!client.distube.isPlaying(message)) return functions.embedbuilder(client, 3000, message, config.colors.no, "Nothing playing!")
    if (!message.member.voice.channel) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`"  + " You must join a Voice Channel")
    if (client.distube.isPlaying(message) && message.member.voice.channel.id !== message.member.guild.me.voice.channel.id) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`"  + " You must join my Voice Channel: " + ` \`${message.member.guild.me.voice.channel.name ? message.member.guild.me.voice.channel.name : ""}\``)
    let queue = client.distube.getQueue(message);
        if(!queue) return functions.embedbuilder(client, 3000, message, config.colors.no, "Nothing playing!")

    if(!args[0]) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`"  + "Please add the amount of \"sleep\" you wanna add, in hours please.")
    functions.embedbuilder(client, "null", message, config.colors.no, "Sleeptimer set", `I will leave the Channel in \`${args[0]}hours\``)
    setTimeout(()=>{
        functions.embedbuilder(client, "null", message, config.colors.no, "STOPPED!", `Left the channel`)
        let voicestate = message.member.voice;
        try{
            voicestate.setChannel(null)
            message.author.send(`Sleep well, ${message.author} :zzz:`);
        }catch{}

        try {
            client.distube.stop(message);
        } catch {}

        try {
            voicestate.channel.leave();
        } catch {}

    }, Number(args[0]) * 1000 * 60 * 60)
  }
};