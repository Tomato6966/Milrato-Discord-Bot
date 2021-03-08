const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();
const config = require("../../config.json")
module.exports = {
      name: "lizard",
      category: "🕹 SFW Commands",
      description: "sends random lizard image",
      usage: "lizard",
      run: async (client, message, args) => {
            let owo = (await neko.sfw.lizard());

            const lizard = new Discord.MessageEmbed()
                  .setTitle("Random Lizard Image")
                  .setImage(owo.url)
                  .setColor(config.colors.yes).setFooter(client.user.username, config.AVATARURL)
                  .setURL(owo.url);
            message.channel.send(lizard);
      }
};