const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();
const config = require("../../config.json")
module.exports = {
      name: "nekogif",
      category: "🕹 SFW Commands",
      description: "sends random neko gif",
      usage: "nekogif",
      run: async (client, message, args) => {
            let owo = (await neko.sfw.nekoGif());

            const nekogif = new Discord.MessageEmbed()
                  .setTitle("Random Neko Gif")
                  .setImage(owo.url)
                  .setColor(config.colors.yes).setFooter(client.user.username, config.AVATARURL)
                  .setURL(owo.url);
            message.channel.send(nekogif);

      }
};