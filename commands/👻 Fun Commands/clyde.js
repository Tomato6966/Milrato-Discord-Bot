const Canvas = require('canvas');
const { MessageEmbed } = require('discord.js');
const Discord = require(`discord.js`);
const config = require("../../config.json")
const canvacord = require("canvacord");
const path = require("path");
module.exports = {

    name: path.parse(__filename).name,
    category: "👻 Fun Commands",
    useage: `${path.parse(__filename).name} [@User]`,
  description: "*Image cmd in the style:* " + path.parse(__filename).name ,
    run: async (client, message, args) => {
        let msg = args.join(" ");
        if(!msg) msg = "Please provide text!"
        let image = await canvacord.Canvas.clyde(msg);
        let attachment = await new Discord.MessageAttachment(image, "clyde.png");
        await message.channel.send(attachment);
    }
}