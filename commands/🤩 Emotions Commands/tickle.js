const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();
const config = require("../../config.json")

module.exports = {
  name: "tickle",
  category: "🤩 Emotions Commands",
  description: "tickles a mentioned user",
  usage: "tickle [@User]",
  run: async (client, message, args) => {
 
      let user = message.mentions.users.first();
      if(!user) message.author;
        
        async function work() {
        let owo = (await neko.sfw.poke());

        const tickleembed = new Discord.MessageEmbed()
        .setTitle(user.username + " You have been tickled ")
        .setDescription((user.toString() + " got tickled by " + message.author.toString()))
        .setImage(owo.url)
        .setColor(config.colors.yes).setFooter(client.user.username, config.AVATARURL)
        .setURL(owo.url);
        message.channel.send(tickleembed);

}

      work();
}
                };