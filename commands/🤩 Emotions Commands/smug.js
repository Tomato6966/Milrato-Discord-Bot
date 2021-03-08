const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();
const config = require("../../config.json")
module.exports = {
  name: "smug",
  category: "🤩 Emotions Commands",
  description: "shows that you are smug",
  usage: "smug [@USER]",
  run: async (client, message, args) => {
        async function work() {
        let owo = (await neko.sfw.smug());

        const smug = new Discord.MessageEmbed()
        .setTitle("Someone is smug")
        .setDescription(( message.author.toString() + " is smug "))
        .setImage(owo.url)
        .setColor(config.colors.yes).setFooter(client.user.username, config.AVATARURL)
        .setURL(owo.url);
        message.channel.send(smug);

}

      work();
}
                };