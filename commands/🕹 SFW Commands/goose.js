const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();
const config = require("../../config.json")
module.exports = {
  name: "goose",
  category: "🕹 SFW Commands",
  description: "sends random goose image",
  usage: "goose",
  run: async (client, message, args) => {
    let owo = await neko.sfw.goose();
    const goose = new Discord.MessageEmbed()
      .setTitle("Random goose Image")
      .setImage(owo.url)
      .setColor(config.colors.yes).setFooter(client.user.username, config.AVATARURL)
      .setURL(owo.url);
    message.channel.send(goose);
  }
};