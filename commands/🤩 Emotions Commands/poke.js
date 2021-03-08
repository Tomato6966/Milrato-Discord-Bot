const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();
const config = require("../../config.json")

module.exports = {
  name: "poke",
  category: "🤩 Emotions Commands",
  description: "pokes a mentioned user",
  usage: "poke [@User]",
  run: async (client, message, args) => {
 
      let user = message.mentions.users.first();
      if(!user) message.author;
        
        async function work() {
        let owo = (await neko.sfw.poke());

        const pokeembed = new Discord.MessageEmbed()
        .setTitle(user.username + " You have been poked ")
        .setDescription((user.toString() + " got poked by " + message.author.toString()))
        .setImage(owo.url)
        .setColor(config.colors.yes).setFooter(client.user.username, config.AVATARURL)
        .setURL(owo.url);
        message.channel.send(pokeembed);

}

      work();
}
                };