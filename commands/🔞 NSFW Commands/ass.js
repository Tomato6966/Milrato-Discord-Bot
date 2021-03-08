const superagent = require("node-fetch");
const Discord = require('discord.js')

const rp = require('request-promise-native');
const config = require("../../config.json")
module.exports = {
    name: "ass",
    category: "🔞 NSFW Commands",
  description: "Sends ass",
  usage: "ass",
  run: async (client, message, args, level) => {


  var errMessage = "This is not an NSFW Channel";
  if (!message.channel.nsfw) {
      message.react('💢');

      return message.reply(errMessage)
      .then(msg => {
      msg.delete({ timeout: 3000 })
      })
      
  }

  return rp.get('http://api.obutts.ru/butts/0/1/random').then(JSON.parse).then(function(res)  {
    return rp.get({
        url:'http://media.obutts.ru/' + res[0].preview,
        encoding: null
    });
}).then(function(res)   {

const ass = new Discord.MessageEmbed()
      .setTitle("Ass")
      .setColor(config.colors.yes).setFooter(client.user.username, config.AVATARURL)
      .setImage("attachment://file.png").attachFiles([{ attachment: res, name: "file.png" }])


    message.channel.send(ass);
});
  }
  };