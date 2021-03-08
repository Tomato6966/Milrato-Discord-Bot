
const fetch = require("node-fetch");
const { Client, Collection, MessageEmbed } = require("discord.js");
const config = require("../../config.json")
const rgif = require("discord-gifs");
const path = require("path");
module.exports = {

    name: path.parse(__filename).name,
    category: "👻 Fun Commands",
    cooldown: 1,
    useage: `${path.parse(__filename).name} [@User]`,
    description: "Random gif",
    run: async (client, message, args) => {
      return message.reply(
        new MessageEmbed()
            .setColor(config.colors.yes)
            .setFooter(client.user.username, config.AVATARURL)  
            .setImage(rgif.randomgifs())
           )}
}