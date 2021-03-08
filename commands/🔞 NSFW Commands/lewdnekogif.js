const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();
const config = require("../../config.json")
module.exports = {
  name: "lewdnekogif",
  category: "🔞 NSFW Commands",
  description: "Sends random nsfw neko gfi",
  usage: "lewdnekogif",
  run: async (client, message, args) => {

  var errMessage = "This is not an NSFW Channel";
  if (!message.channel.nsfw) {
      message.react('💢');

      return message.reply(errMessage)
      .then(msg => {
      msg.delete({ timeout: 3000 })
      })
      
  }

        async function work() {
        let owo = (await neko.nsfw.nekoGif());

        const lewdnekogif = new Discord.MessageEmbed()
        .setTitle("NSFW Neko Gif")
        .setImage(owo.url)
        .setColor(config.colors.yes).setFooter(client.user.username, config.AVATARURL)
        .setURL(owo.url);
        message.channel.send(lewdnekogif);

}

      work();
}
                };