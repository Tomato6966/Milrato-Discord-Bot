const radio = require("../../modules/radio")
const config = require("../../config.json")
module.exports = {
    name: "radio",
    category: "🎶 Music Commmands",
    useage: "radio [radiostation] [volume]",
  description: "Play one of the 200 Radio Station, or see them by just typing  +radio  in the chat!",
  run: async (client, message, args) => {
    if (client.distube.isPlaying(message) && args[0]){
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
            client.distube.stop(message);

            return radio(client, message, args); //get the radio module
    } 
    else{
        return radio(client, message, args); //get the radio module
    }
  }
};