const config = require("../config.json");
const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
module.exports = function (client, options) {
    const description = {
        name: "chatbot",
        filename: "chatbot.js",
        version: "3.2"
    }
    let disabled = new MessageEmbed()
    .setColor(config.colors.no)
    .setTitle("Your Owner disabled the AI-Chat! Sorry")
    .setFooter("Milrato", config.AVATARURL)
    .setThumbnail(config.AVATARURL)
    console.log(` :: ⬜️ Module: ${description.name} | Loaded version ${description.version} from ("${description.filename}")`.bold.green)

    client.on("message", message => {
        if(message.author.bot || !message.guild) return;
        client.setups.ensure(message.guild.id,  {
          enabled: false,
          channel: "",
      }, "aichatsystem");
        let chatbot = client.setups.get(message.guild.id, "aichatsystem");
      
        /**
         *  aichatsystem: {
         *      enabled: false,
         *      channel: "",
         *  },
         */
    if(message.channel.id == chatbot.channel){
      if(!chatbot.enabled) return message.author.send(disabled).catch(e => console.log("CHATBOT:".underline.red + " :: " + e.stack.toString().red));
      if(message.attachments.size > 0)
        return message.channel.send("Look at this too...",{
          files: ['./something.txt']
      })
     
      fetch(`http://api.brainshop.ai/get?bid=153861&key=0ZjvbPWKAxJvcJ96&uid=1&msg=${encodeURIComponent(message)}`)
     .then(res => res.json())
     .then(data => {
     message.channel.send(data.cnt).catch(e => console.log("CHATBOT:".underline.red + " :: " + e.stack.toString().red));
     });
    }
  })
}
