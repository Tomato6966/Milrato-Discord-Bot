    const Discord = require("discord.js")
    const config = require("../../config.json")
    module.exports = {
    name: "userinfo",
	   aliases: ["uinfo"],
    category: "⚙️ Utility Commands",
    description: "Get information about a user",
    usage: "userinfo [@USER]",
    run: async (client, message, args) => {
    const user = message.mentions.users.first();
    if(!user)
        return message.reply('Please mention the user who you want info about.');

    var playing = ("[ " + user.presence.activities + " ]")
    const who = new Discord.MessageEmbed()
          .setTitle("User Info:")
          .addField("Full Username", `\`${user.tag}\``)
          .addField("ID", "\`"+user.id+"\`")
          .addField("Playing","\`"+playing+"\`", true)
          .addField("Status", `\`${user.presence.status}\``, true)
          .addField("Joined Discord At", "\`"+user.createdAt+"\`")
          .setColor(config.colors.yes)
          .setTimestamp().setFooter(client.user.username, config.AVATARURL)
          .setThumbnail(user.avatarURL())
      message.channel.send(who)
    }
    };
