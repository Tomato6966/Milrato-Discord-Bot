const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();
const config = require("../../config.json")

module.exports = {
  name: "slap",
  category: "🤩 Emotions Commands",
  description: "slaps a mentioned user",
  usage: "slap [@User]",
  run: async (client, message, args) => {
 
  
      let user = message.mentions.users.first();
      if(!user) message.author;
       
        async function work() {
        let owo = (await neko.sfw.slap());

        const slapemebd = new Discord.MessageEmbed()
        .setTitle(user.username + " You have been slapped ")
        .setDescription((user.toString() + " got slapped by " + message.author.toString()))
        .setImage(owo.url)
        .setColor(config.colors.yes).setFooter(client.user.username, config.AVATARURL)
        .setURL(owo.url);
        message.channel.send(slapemebd);

}

      work();
}
                };