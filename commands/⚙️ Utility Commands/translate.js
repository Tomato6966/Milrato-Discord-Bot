    const Discord = require("discord.js");
    const config = require("../../config.json");
    const translate = require("translatte");
    module.exports = {
    name: "translate",
	   aliases: ["tr"],
    category: "⚙️ Utility Commands",
    description: "Translates a Text from a Language to another Language",
    usage: "translate <from> <to> <TEXT>",
    run: async (client, message, args) => {

      if(!args[0]) return message.channel.send(new Discord.MessageEmbed().setColor(config.colors.no).setTitle(":x: Error | Unknown Command Usage!").setDescription("`translate <from> <to> <Text>`\nExample: `translate en de Hello World`"))

      if(!args[1]) return message.channel.send(new Discord.MessageEmbed().setColor(config.colors.no).setTitle(":x: Error | Unknown Command Usage!").setDescription("`translate <from> <to> <Text>`\nExample: `translate en de Hello World`"))

      if(!args[2]) return message.channel.send(new Discord.MessageEmbed().setColor(config.colors.no).setTitle(":x: Error | Unknown Command Usage!").setDescription("`translate <from> <to> <Text>`\nExample: `translate en de Hello World`"))

    translate(args.slice(2).join(" "), {from: args[0], to: args[1]}).then(res=>{
      let embed = new Discord.MessageEmbed()
      .setColor(config.colors.yes)
      .setThumbnail("https://imgur.com/0DQuCgg.png")
      .setFooter("Milrato | powered by: milrato.eu", config.AVATARURL)
      .addField(`From: \`${args[0]}\``.substr(0, 256), args.slice(2).join(" ").substr(0, 1024))
      .addField("\u200B", "\u200B")
      .addField(`To: \`${args[1]}\``.substr(0, 256), res.text.substr(0, 1024))
      message.channel.send(embed)
      }).catch(err => {
        let embed = new Discord.MessageEmbed()
        .setColor(config.colors.yes)
        .setTitle(":x: Error | Something went wrong")
        .setFooter("Milrato", config.AVATARURL)
        .setDescription(String("```"+err.stack+"```").substr(0, 2000))
        message.channel.send(embed)
          console.log(err);
      });
    }
  };
