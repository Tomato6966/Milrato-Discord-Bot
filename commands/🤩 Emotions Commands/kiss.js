const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();
const config = require("../../config.json")

module.exports = {
  name: "kiss",
  category: "🤩 Emotions Commands",
  description: "kisses a mentioned user",
  usage: "kiss [@User]",
  run: async (client, message, args) => {
    let user = message.mentions.users.first();
    if(!user) message.author;
        

        async function work() {
        let owo = (await neko.sfw.kiss());

        const kissembed = new Discord.MessageEmbed()
        .setTitle(user.username + " You have been kissed! ")
        .setDescription((user.toString() + " got kissed by " + message.author.toString()))
        .setImage(owo.url)
        .setColor(config.colors.yes).setFooter(client.user.username, config.AVATARURL)
        .setURL(owo.url);
        message.channel.send(kissembed);

}

      work();
}
                };