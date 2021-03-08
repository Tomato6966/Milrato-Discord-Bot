
const { MessageEmbed } = require("discord.js");
const { Client, Collection } = require("discord.js");
const client = new Client({ disableMentions: "everyone" });

const got = require('got');
const functions = require("../../functions")
const config = require("../../config.json")
module.exports = {
  name: "amazeme",
	aliases: ["amazeme"],
    category: "👻 Fun Commands",
    description: "IMAGE CMD",
    usage: "amazeme",
    run: async (client, message, args) => {
   
    got('https://www.reddit.com/r/interestingasfuck/random.json').then(response => {
      let content = JSON.parse(response.body);
      var title = content[0].data.children[0].data.title;
      var amazeme = content[0].data.children[0].data.url;
      let jokeembed = new MessageEmbed()
      .setDescription(`[\`Click here\`](${amazeme})`)
      .setColor(config.colors.yes).setFooter(client.user.username, config.AVATARURL)
      .setTitle(title)
      .setTimestamp()
      .setFooter(client.user.username, config.AVATARURL);
    if(amazeme.toLowerCase().endsWith("png")||amazeme.toLowerCase().endsWith("jpg")||amazeme.toLowerCase().endsWith("jpeg")||amazeme.toLowerCase().endsWith("gif")) jokeembed.setImage(amazeme);
    return message.channel.send(jokeembed);
    }).catch(console.error);
  }

};
