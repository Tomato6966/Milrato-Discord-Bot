//Here the command starts
const Discord = require("discord.js");
const config = require("../../config.json")
const ms = require("ms")
module.exports = {
	//definition
	name: "unmute", //the name of the command 
	category: "⛔️ Moderation Commands", //the category this will be listed at, for the help cmd
	aliases: [""], //every parameter can be an alias
	cooldown: 4, //this will set it to a 4 second cooldown
	usage: "unmute @User", //this is for the help command for EACH cmd
	description: "Unmutes a User!", //the description of the command

	//running the command with the parameters: client, message, args, user, text, prefix
	run: async (client, message, args, cmduser, text, prefix) => {
		if (!message.member.hasPermission("ADMINISTRATOR"))
			return message.reply(config.ERROR_MESSAGES.NO_PERMISSIONS).catch(error => console.log(error));


		let member = message.mentions.members.first();
		if (!member) return message.reply("ERROR, please ping a USER! Usage: `mute @User <Time> [REASON]` example: `mute @User 10m He is doing bad stuff!`")
		args.shift(); //shift args

		if(member.roles.highest.position>=message.member.roles.highest.position){
			return message.reply(":x: I cannot mute this Member, because he is higher/Equal to your Rang Position!")
		}

		if(!message.guild.me.hasPermission("MANAGE_ROLES")) return message.reply("I need the permission, to Manage Roles aka give roles");


		let allguildroles = message.guild.roles.cache.array();
		
		let mutedrole = false;
		for (let i = 0; i < allguildroles.length; i++) {
			if (allguildroles[i].name.toLowerCase().includes("muted")) {
				mutedrole = allguildroles[i];
				break;
			}
		}
		if (!mutedrole) {
			return message.reply(":x: You never muted someone, there is no muted role yet!")
		}
		if(!message.member.hasPermission("ADMINISTRATOR") && mutedrole.position > message.guild.me.roles.highest.position){
			return message.reply(":x: I cannot access the Role, because it's above me!")
		}
		try{
			member.roles.remove(mutedrole);
		}catch{
			message.channel.send("Something went wrong!")
		}
		let embed = new Discord.MessageEmbed()
		.setColor(config.colors.yes)
		.setTitle(`Unmuted: \`${member.user.tag}\``)
		.setThumbnail(member.tag.displayAvatarURL({dynamic:true}))
		.setFooter(`By: ${message.author.tag}`, message.author.displayAvatarURL({dynamic:true}))
		message.channel.send(embed)
		try{
			member.send(embed.setTitle(`You got unmuted by: \`${message.author.tag}\``))
		}catch{
		}		
	}
}
//-CODED-BY-TOMATO#6966-//
