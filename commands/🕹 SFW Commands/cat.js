const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();
const config = require("../../config.json")
module.exports = {
      name: "cat",
      category: "🕹 SFW Commands",
      description: "sends random cat image",
      usage: "cat",
      run: async (client, message, args) => {
            let owo = (await neko.sfw.meow());

            const cat = new Discord.MessageEmbed()
                  .setTitle("Random Cat Image")
                  .setImage(owo.url)
                  .setColor(config.colors.yes).setFooter(client.user.username, config.AVATARURL)
                  .setURL(owo.url);
            message.channel.send(cat);

      }
};