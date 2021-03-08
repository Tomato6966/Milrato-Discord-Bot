const Discord = require('discord.js')
const urban = require('urban.js')
const config = require("../../config.json")
module.exports = {
    name: "urban",
    category: "⚙️ Utility Commands",
  description: "Shows you a deffinition from urban dictionary",
  usage: "urban <your word>",
  run: async (client, message, args) => {

  const bargs =  message.content.split(' ');
  const searchString = bargs.slice(1).join(' ')
  if(!searchString)return message.channel.send(`You have to type in word`)
  
  
  
urban(searchString).then(urbans=>{
  
  message.channel.send({embed: {
          
      description: `__**${urbans.word}**__\n\n**Definition**\n${urbans.definition}\n\n**Example**\n${urbans.example}\n\n**Tags:** ${urbans.tags}\n\n👍 **${urbans.thumbsUp}** *Thumbs Up* **|** 👎 **${urbans.thumbsDown}** *Thumbs Down*`,
      author: {
          name: message.author.username,
          icon_url: message.author.avatarURL,
      },
      color: 0xff0000,
  

      timestamp: new Date(),
  
  }
})
})

  }
  };