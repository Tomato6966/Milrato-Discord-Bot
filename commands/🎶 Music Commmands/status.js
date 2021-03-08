const functions = require("../../functions")
const config = require("../../config.json")
module.exports = {
    name: "status",
    category: "🎶 Music Commmands",
    useage: "status",
    aliases: ["settings"],
  description: "Shows queue status/settings",
  run: async (client, message, args) => {
    
    if (!client.distube.isPlaying(message)) return functions.embedbuilder(client, 3000, message, config.colors.no, "Nothing playing!")
    if (!message.member.voice.channel) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`"  + " You must join a Voice Channel")
     if (client.distube.isPlaying(message) && message.member.voice.channel.id !== message.member.guild.me.voice.channel.id) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`"  + " You must join my Voice Channel: " + ` \`${message.member.guild.me.voice.channel.name ? message.member.guild.me.voice.channel.name : ""}\``)
          

    let queue = client.distube.getQueue(message);
    if (!queue) return functions.embedbuilder(client, "null", message, config.colors.no, "There is nothing playing!");

    return message.channel.send(functions.curembed(client, message));
  }
  };