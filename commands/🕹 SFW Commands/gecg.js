const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();
const config = require("../../config.json")
module.exports = {
  name: "gecg",
  category: "🕹 SFW Commands",
  description: "Genetically engineered catgirl",
  usage: "gecg",
  run: async (client, message, args) => {
    let owo = (await neko.sfw.gecg());

    const wtf = new Discord.MessageEmbed()
      .setTitle("Genetically engineered catgirl")
      .setImage(owo.url)
      .setColor(config.colors.yes).setFooter(client.user.username, config.AVATARURL)
      .setURL(owo.url);
    message.channel.send(wtf);
  }
};