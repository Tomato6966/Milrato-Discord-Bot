const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();
const config = require("../../config.json")
module.exports = {
      name: "animalears",
      category: "🕹 SFW Commands",
      description: "kemonomimi",
      usage: "animalears",
      run: async (client, message, args) => {
            let owo = (await neko.sfw.kemonomimi());

            const animalears = new Discord.MessageEmbed()
                  .setTitle("Kemonomimi")
                  .setImage(owo.url)
                  .setColor(config.colors.yes).setFooter(client.user.username, config.AVATARURL)
                  .setURL(owo.url);
            message.channel.send(animalears);
      }
};