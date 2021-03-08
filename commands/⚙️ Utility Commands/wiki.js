    const Discord = require("discord.js");
    const config = require("../../config.json");
    const fetch = require("node-fetch");

module.exports = {
  name: "wikipedia",
  aliases: ["wiki", "wikip"],
  category: "⚙️ Utility Commands",
  description: "Search Anything on Wikipedia",
  usage: "wikipedia <Query>",
  run: async (client, message, args) => {

    const wiki = args.join(' ')
    if(!wiki) return message.reply('Provide A Query To Search.') // If No Topic Provided To Searched
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wiki)}` // From Here BOT Will Search For Searched Topic

    let response
    try {
        response = await fetch(url).then(res => res.json()) // Getting Result
    }
    catch (e) {
        return message.reply('An Error Occured, Try Again.') // If Error Occur's
    }

    try {
        if(response.type === 'disambiguation') { // If Their Are Many Results With Same Searched Topic
            const embed = new Discord.MessageEmbed()
            .setColor(config.colors.yes)
            .setTitle(response.title) // Title Of Topic
            .setURL(response.content_urls.desktop.page) // URL Of Searched Topic
            .setDescription([`
            ${response.extract}
            Links For Topic You Searched [Link](${response.content_urls.desktop.page}).`])
            .setFooter("Milrato | powered by milrato.eu", client.user.displayAvatarURL())
            message.channel.send(embed)
        }
        else { // If Only One Result
            const embed = new Discord.MessageEmbed()
            try{embed.setColor(config.colors.yes)}catch{}
            try{embed.setTitle(response.title)}catch{} // Title Of Topic
            try{embed.setURL(response.content_urls.desktop.page)}catch{} // URL Of Searched Topic
            try{embed.setThumbnail(response.thumbnail.source)}catch(e){console.log(e)}
            try{embed.setDescription(response.extract)}catch{}
            try{embed.setFooter("Milrato | powered by milrato.eu", client.user.displayAvatarURL())}catch{}
            message.channel.send(embed)
        }
    }
    catch (e){
      console.log(e)
        return message.reply('Provide A Valid Query To Search.') // If Searched Topic Is Not Available
    }
  }
};
