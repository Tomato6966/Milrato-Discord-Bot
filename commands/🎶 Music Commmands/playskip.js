const functions = require("../../functions")

const config = require("../../config.json")
module.exports = {
    name: "playskip",
    category: "🎶 Music Commmands",
    aliases: ["ps"],
    useage: "playskip <URL/NAME>",
  description: "Plays new song and skips current",
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
     if (!message.member.voice.channel) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`"  + " You must join a Voice Channel")
            if(!args[0]) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`"  + " Please add something you wanna search to")

            if (!client.distube.isPlaying(message)) {
              functions.embedbuilder(client, 5000, message, config.colors.yes, "Searching!", "```" + args.join(" ")+ "```")
              return client.distube.play(message, args.join(" "));
            }
            if (client.distube.isPlaying(message) && message.member.voice.channel.id !== message.member.guild.me.voice.channel.id) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`"  + " You must join my Voice Channel: " + ` \`${message.member.guild.me.voice.channel.name ? message.member.guild.me.voice.channel.name : ""}\``)
            functions.embedbuilder(client, 5000, message, config.colors.yes, "Searching and SKIPPING!", "```" + args.join(" ")+ "```")
            if(args.join(" ").includes("track") && args.join(" ").includes("open.spotify")){
              let info = await getPreview(args.join(" "));
              return client.distube.playSkip(message, info.artist + " " + info.title);
            }
            else  if(args.join(" ").includes("playlist")){
              return message.reply("Playlists are not supported for playskip lol")
            }
            else if(args.join(" ").includes("deezer")){
              return message.reply("Playlists are not supported for playskip lol")
            }
            else{
              return client.distube.playSkip(message, args.join(" "));
            }
  }
};