const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();
const config = require("../../config.json")
module.exports = {
      name: "dog",
      category: "🕹 SFW Commands",
      description: "sends random dog image",
      usage: "dog",
      run: async (client, message, args) => {
            let owo = (await neko.sfw.woof());

            const dog = new Discord.MessageEmbed()
                  .setTitle("Random dog Image")
                  .setImage(owo.url)
                  .setColor(config.colors.yes).setFooter(client.user.username, config.AVATARURL)
                  .setURL(owo.url);
            message.channel.send(dog);

      }
};