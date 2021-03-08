const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();
const config = require("../../config.json")

module.exports = {
  name: "pat",
  category: "🤩 Emotions Commands",
  description: "pats a mentioned user",
  usage: "pat [@User]",
  run: async (client, message, args) => {
    let user = message.mentions.users.first();
    if(!user) message.author;
       
        async function work() {
        let owo = (await neko.sfw.pat());

        const patembed = new Discord.MessageEmbed()
        .setTitle(user.username + " !!! ")
        .setDescription((user.toString() + " got patted by " + message.author.toString()))
        .setImage(owo.url)
        .setColor(config.colors.yes).setFooter(client.user.username, config.AVATARURL)
        .setURL(owo.url);
        message.channel.send(patembed);

}

      work();
}
                };