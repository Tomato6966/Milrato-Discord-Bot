
const { Client, Collection, MessageEmbed } = require("discord.js");
const config = require("../../config.json")
const client = new Client({ disableMentions: "everyone" });
const got = require('got');
const path = require("path");
module.exports = {

  name: path.parse(__filename).name,
  category: "👻 Fun Commands",
  useage: `${path.parse(__filename).name} [@User]`,
description: "*Image cmd in the style:* " + path.parse(__filename).name ,
  run: async (client, message, args) => {
   
    got('https://www.reddit.com/r/jokes/random/.json').then(response => {
      let content = JSON.parse(response.body);
      var title = content[0].data.children[0].data.title;
      var joke = content[0].data.children[0].data.selftext;
      let jokeembed = new MessageEmbed()
      .setDescription(joke)
      .setColor(config.colors.yes).setFooter(client.user.username, config.AVATARURL)
      .setTitle(title)
      .setAuthor(`${BOTNAME} | Joke`)
      .setTimestamp()
      .setFooter(client.user.username, config.AVATARURL)
  
    return message.channel.send(jokeembed);
    }).catch(console.error);
  }

};
