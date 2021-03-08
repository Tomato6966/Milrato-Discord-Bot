const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();
const config = require("../../config.json")
module.exports = {
  name: "huggif",
  category: "🕹 SFW Commands",
  description: "Sends a random hug gif",
  usage: "huggif",
  run: async (client, message, args) => {
    const gifs = require('gifs-pro'); // require package

    const SlapGif = gifs.getHugGif() //slap gif
    const wtf = new Discord.MessageEmbed()
      .setTitle("Genetically engineered catgirl")
      .setImage(SlapGif)
      .setColor(config.colors.yes).setFooter(client.user.username, config.AVATARURL)
      .setURL(SlapGif);

    message.channel.send(wtf);

  }
};