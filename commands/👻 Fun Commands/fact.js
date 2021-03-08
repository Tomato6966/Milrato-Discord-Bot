const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();
const { Client, Collection, MessageEmbed } = require("discord.js");
const config = require("../../config.json")
const path = require("path");
module.exports = {

  name: path.parse(__filename).name,
  category: "👻 Fun Commands",
  useage: `${path.parse(__filename).name} [@User]`,
description: "*Image cmd in the style:* " + path.parse(__filename).name ,
  run: async (client, message, args) => {
  let owo;
  async function test() {
    owo = await neko.sfw.fact();
    console.log(owo);
    const blowjob = new Discord.MessageEmbed()
    .setTitle("Fact")
    .setDescription(owo.fact)
    .setColor(config.colors.yes).setFooter(client.user.username, config.AVATARURL)
    .setFooter(client.user.username, config.AVATARURL)
    message.channel.send(blowjob);

  }
  test();
}
 }