const functions = require("../../functions")
const config = require("../../config.json")
const path = require("path");
module.exports = {

    name: path.parse(__filename).name,
    category: "♨️ Music-Filter Commands",
    useage: `<${path.parse(__filename).name}>`,
  description: "*Adds a Filter named " + path.parse(__filename).name ,
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
                if(!isdj && !message.member.hasPermission("ADMINISTRATOR")) return functions.embedbuilder(client, 6000, message, "#ff264a", "DJ-ROLE", `<:declined:780403017160982538> You don\'t have permission for this Command! You need to have: ${leftb}`)
            }
            //CHECK IF DJ LOL
      if (!client.distube.isPlaying(message)) return functions.embedbuilder(client, 3000, message, config.colors.no, "Nothing playing!")
    if (!message.member.voice.channel) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`"  + " You must join a Voice Channel")
     if (client.distube.isPlaying(message) && message.member.voice.channel.id !== message.member.guild.me.voice.channel.id) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`"  + " You must join my Voice Channel: " + ` \`${message.member.guild.me.voice.channel.name ? message.member.guild.me.voice.channel.name : ""}\``)
          
    const queue = client.distube.getQueue(message);
    if(queue.dispatcher  === null) return functions.embedbuilder(client, 3000, message, config.colors.no, "Nothing Playing!", "If it is a Stream, than you sometimes you cannot add a Filter");
    let filter = message.content.slice(config.prefix.length).split(" ")[0];
    if (message.content.slice(config.prefix.length).split(" ")[0] === queue.filter) filter = "clear";
    filter = await client.distube.setFilter(message, filter);
    await functions.embedbuilder(client, 3000, message, config.colors.yes, "Adding filter!", filter)
    await functions.delay(5000);
  }
};