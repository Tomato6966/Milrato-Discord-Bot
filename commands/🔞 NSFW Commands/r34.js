const randomPuppy = require('random-puppy');
const request = require('node-fetch');
const fs = require("fs")
const config = require("../../config.json")
const Discord = require('discord.js');
const booru = require('booru');

module.exports = {
    name: "r34",
    category: "🔞 NSFW Commands",
    usage: "r34",
  description: "Searches rule34",
  run: async (bot, message, args, level) => {

  var errMessage = "This is not an NSFW Channel";
  if (!message.channel.nsfw) {
      message.react('💢');

      return message.reply(errMessage)
      .then(msg => {
      msg.delete({ timeout: 3000 })
      })
      
  }

  if (message.content.toUpperCase().includes('LOLI') || message.content.toUpperCase().includes('GORE')) return message.channel.send('That kind of stuff is not allowed! Not even in NSFW channels!');

  var query = message.content.split(/\s+/g).slice(1).join(" ");
  booru.search('rule34', [query], {nsfw: true, limit: 1, random: true })
      .then(booru.commonfy)
      .then(images => {
          for (let image of images) {
              const embed = new Discord.MessageEmbed()
              .setTitle("Rule34:")
              .setImage(image.common.file_url)
              .setColor(config.colors.yes).setFooter(client.user.username, config.AVATARURL)
              .setFooter(`Tags: r34 ${query}`)
              .setURL(image.common.file_url);
          return message.channel.send({ embed });
          }

      }).catch(err => {
          if (err.name === 'booruError') {
              return message.channel.send(`No results found for **${query}**!`);
          } else {
              return message.channel.send(`No results found for **${query}**!`);
          }
})
  }
  };