const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();
const config = require("../../config.json")
module.exports = {
  name: "wallpaper",
  category: "🕹 SFW Commands",
  description: "sends random wallpaper",
  usage: "wallpaper",
  run: async (client, message, args) => {
    let owo = (await neko.sfw.wallpaper());

    const wallpaper = new Discord.MessageEmbed()
      .setTitle("Random Wallpaper")
      .setImage(owo.url)
      .setColor(config.colors.yes).setFooter(client.user.username, config.AVATARURL)
      .setURL(owo.url);
    message.channel.send(wallpaper);
  }
};