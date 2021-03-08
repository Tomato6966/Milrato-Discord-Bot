const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();
const config = require("../../config.json")
module.exports = {
  name: "hboobs",
  category: "🔞 NSFW Commands",
  usage: "hboobs",
  run: async (client, message, args) => {

  //Checks channel for nsfw
  var errMessage = "This is not an NSFW Channel";
  if (!message.channel.nsfw) {
      message.react('💢');

      return message.reply(errMessage)
      .then(msg => {
      msg.delete({ timeout: 3000 })
      })
      
  }
  var superagent = require('superagent');

  if (!message.channel.nsfw) return message.channel.send('You must use this command in an nsfw lounge!') 

  var lo = new Discord.MessageEmbed()
              .setDescription(`Please wait...`)
              .setTimestamp().setColor(config.colors.yes).setFooter(client.user.username, config.AVATARURL)

  message.channel.send(lo).then(m => {

      superagent.get('https://nekobot.xyz/api/image').query({ type: 'hboobs'}).end((err, response) => {

          var embed_nsfw = new Discord.MessageEmbed()
              .setDescription(`:underage:\n**[image not loading? click here](${response.body.message})**`)
              .setTimestamp().setColor(config.colors.yes).setFooter(client.user.username, config.AVATARURL)
              .setImage(response.body.message)
          
          m.edit(embed_nsfw);
      });
  });
  
}
};