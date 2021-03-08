const Discord = require("discord.js");
const config = require("../../config.json")
module.exports = {
  name: "serverinfo",
  category: "⚙️ Utility Commands",
description: "Shows info about a server",
usage: "serverinfo",
run: async (client, message, args) => {

//command
let servericon = message.guild.iconURL;
let serverembed = new Discord.MessageEmbed()
.setTitle("Server Information")
.setColor(config.colors.yes)

.addField("Server Name", "\`"+message.guild.name+"\`")
.addField("Owner",  "\`"+`${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}+"\`"`, true)
.addField("Channels",  "\`"+message.guild.channels.cache.size+"\`", true)
.addField("Roles",  "\`"+message.guild.roles.cache.size+"\`", true)
.addField("Created On",  "\`"+message.guild.createdAt+"\`")
.addField("You Joined",  "\`"+message.member.joinedAt+"\`")
.addField("Total Members",  "\`"+message.guild.memberCount+"\`")
.setThumbnail(message.guild.iconURL({dynamic: true}))
.setTimestamp()
.setFooter(message.guild.name, message.guild.iconURL({dynamic: true}))
message.channel.send(serverembed);
}
};