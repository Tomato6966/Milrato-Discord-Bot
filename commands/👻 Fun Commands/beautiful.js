const Canvas = require('canvas');
const { MessageEmbed } = require('discord.js');
const Discord = require(`discord.js`);

const canvacord = require("canvacord");

const functions = require("../../functions")
const config = require("../../config.json")
module.exports = {
  name: "beautiful",
	aliases: ["beautiful"],
    category: "👻 Fun Commands",
    description: "IMAGE CMD",
    usage: "beautiful",
    run: async (client, message, args) => {
        let tempmsg = await message.channel.send(new MessageEmbed().setColor(config.colors.yes).setFooter(client.user.username, config.AVATARURL).setAuthor("Loading...", "https://cdn.discordapp.com/emojis/769935094285860894.gif"))
        let user = message.mentions.users.first() || message.author;
        let avatar = user.displayAvatarURL({ dynamic: false, format: 'png' });
        let image = await canvacord.Canvas.beautiful(avatar);
        let attachment = await new Discord.MessageAttachment(image, "beautiful.png");
        let fastembed2 = new Discord.MessageEmbed()
        .setColor(config.colors.yes).setFooter(client.user.username, config.AVATARURL)
        .setImage("attachment://beautiful.png")
        .attachFiles(attachment)
        .setFooter(client.user.username, config.AVATARURL);
        await message.channel.send(fastembed2);
        await tempmsg.delete();//affect
    }
}