const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();

const config = require("../../config.json")
module.exports = {
  name: "cuddle",
  category: "🤩 Emotions Commands",
  description: "cuddles a mentioned user",
  usage: "cuddle [@USER]",
  run: async (client, message, args) => {
        let user = message.mentions.users.first();
        if(!user) message.author;
        

        async function work() {
        let owo = (await neko.sfw.cuddle());

        const cuddleembed = new Discord.MessageEmbed()
        .setTitle(user.username + " You just got a cuddle! ")
        .setDescription((user.toString() + " got a cuddle from " + message.author.toString()))
        .setImage(owo.url)
        .setColor(config.colors.yes).setFooter(client.user.username, config.AVATARURL)
        .setURL(owo.url);
        message.channel.send(cuddleembed);

}

      work();
}
                };