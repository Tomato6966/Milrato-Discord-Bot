const functions = require("../../functions")
const config = require("../../config.json")
module.exports = {
    name: "loop",
    cooldown: 5, 
    category: "🎶 Music Commmands",
    aliases: ["repeat"],
    useage: "loop <0/1/2> |",
  description: "Enables loop for off / song / queue*\n0 = off\n1 = song\n2 = queue",
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
            if(!args[0]) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`"  + " Please add something you wanna search to")
            let loopis = args[0];
            if (args[0].toString().toLowerCase() === "song") loopis = "1";
            else if (args[0].toString().toLowerCase() === "queue") loopis = "2";
            else if (args[0].toString().toLowerCase() === "off") loopis = "0";
            else if (args[0].toString().toLowerCase() === "s") loopis = "1";
            else if (args[0].toString().toLowerCase() === "q") loopis = "2";
            else if (args[0].toString().toLowerCase() === "disable") loopis = "0";
            loopis = Number(loopis);

            if (0 <= loopis && loopis <= 2) {
                await client.distube.setRepeatMode(message, parseInt(args[0]));
                await functions.embedbuilder(client, 3000, message, config.colors.yes, "Repeat mode set to:", `${args[0].replace("0", "OFF").replace("1", "Repeat song").replace("2", "Repeat Queue")}`)
                return;
            }
            else {
                return functions.embedbuilder(client, 3000, message, config.colors.no, "ERROR", `Please use a number between **0** and **2**   |   *(0: disabled, 1: Repeat a song, 2: Repeat all the queue)*`)
            }
  }
  };