const Discord = require("discord.js");
const malScraper = require('mal-scraper');
const config = require("../../config.json")
module.exports = {
  name: "animesearch",
  category: "⚙️ Utility Commands",
description: "Get info about an anime",
usage: "animesearch <Anime>",
run: async (client, message, args) => {

const search = `${args}`;
if(!search)
return message.reply('Please add a search query if invalid command will not work.');

malScraper.getInfoFromName(search)
  .then((data) => {
  const malEmbed = new Discord.MessageEmbed()
    .setAuthor(`My Anime List search result for ${args}`.split(',').join(' '))
    .setThumbnail(data.picture).setFooter(client.user.username, config.AVATARURL)
    .setColor(config.colors.yes) //I personally use bubblegum pink!
    .addField('English Title', data.englishTitle, true)
    .addField('Japanese Title', data.japaneseTitle, true)
    .addField('Type', data.type, true)
    .addField('Episodes', data.episodes, true)
    .addField('Rating', data.rating, true)
    .addField('Aired', data.aired, true)
    .addField('Score', data.score, true)
    .addField('Score Stats', data.scoreStats, true)
    .addField('Link', data.url);

    message.channel.send(malEmbed);

  })
}
};