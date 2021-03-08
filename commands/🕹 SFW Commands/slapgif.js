const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();
const config = require("../../config.json")
module.exports = {
  name: "slapgif",
  category: "🕹 SFW Commands",
  description: "Sends a random slap gif",
  usage: "slapgif",
  run: async (client, message, args) => {
    const gifs = require('gifs-pro'); // require package

    const HugGif = gifs.getSlapGif() //slap gif
    const wtf = new Discord.MessageEmbed()
      .setTitle("Genetically engineered catgirl")
      .setImage(SlapGif)
      .setColor(config.colors.yes).setFooter(client.user.username, config.AVATARURL)
      .setURL(HugGif);

    message.channel.send(wtf);

  }
};