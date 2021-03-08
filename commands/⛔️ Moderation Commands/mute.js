//Here the command starts
const Discord = require("discord.js");
const config = require("../../config.json")
const ms = require("ms")
module.exports = {
	//definition
	name: "mute", //the name of the command 
	category: "⛔️ Moderation Commands", //the category this will be listed at, for the help cmd
	aliases: [""], //every parameter can be an alias
	cooldown: 4, //this will set it to a 4 second cooldown
	usage: "mute @User <Time+Format(e.g: 10m)> [REASON]", //this is for the help command for EACH cmd
	description: "Mutes a User for a specific Time!", //the description of the command

	//running the command with the parameters: client, message, args, user, text, prefix
	run: async (client, message, args, cmduser, text, prefix) => {
		if (!message.member.hasPermission("ADMINISTRATOR"))
			return message.reply(config.ERROR_MESSAGES.NO_PERMISSIONS).catch(error => console.log(error));
			
		let member = message.mentions.members.first();
		if (!member) return message.reply("ERROR, please ping a USER! Usage: `mute @User <Time+Format(e.g: 10m)> [REASON]` example: `mute @User 10m He is doing bad stuff!`")
		args.shift(); //shift args

		if(member.roles.highest.position>=message.member.roles.highest.position){
			return message.reply(":x: I cannot mute this Member, because he is higher/Equal to your Rang Position!")
		}

		if(!message.guild.me.hasPermission("MANAGE_ROLES")) return message.reply("I need the permission, to Manage Roles aka give roles");

		let time = args[0];
		if (!time) return message.reply("ERROR, please add a TIME! Usage: `mute @User <Time+Format(e.g: 10m)> [REASON]` example: `mute @User 10m He is doing bad stuff!`")
		args.shift();

		let reason = args.join(" ");

		let allguildroles = message.guild.roles.cache.array();
		
		let mutedrole = false;
		for (let i = 0; i < allguildroles.length; i++) {
			if (allguildroles[i].name.toLowerCase().includes("muted")) {
				mutedrole = allguildroles[i];
				break;
			}
		}
		if (!mutedrole) {
			if(!message.guild.me.hasPermission("MANAGE_GUILD")) return message.reply("I need the permission, to Manage Roles aka give roles");
			let highestrolepos = message.guild.me.roles.highest.position;
			console.log(Number(highestrolepos)-1)
			mutedrole = await message.guild.roles.create({
					data: {
						name: 'muted',
						color: '#222222', //grey color
						hoist: false, //hoist true
						position: Number(highestrolepos) - 1, //muted role under highest Bot Role!
					  //permissions: ["SEND_MESSAGES"]
					},
					reason: 'This role got created, to mute Members!',
				})
				.catch(e => {
					console.log(e);
					message.reply("I COULD NOT CREATE A ROLE, sorry")
				});
		}
		if(mutedrole.position > message.guild.me.roles.highest.position){
			return message.reply(":x: I cannot access the Role, because it's above me!")
		}
		let mutetime;
		try{
		mutetime = ms(time);
		}catch{
			return message.reply("ERROR, please add a TIME! Usage: `mute @User <Time+Format(e.g: 10m)> [REASON]` example: `mute @User 10m He is doing bad stuff!`")
		}	
		if(!mutetime || mutetime === undefined) return message.reply("ERROR, please add a TIME! Usage: `mute @User <Time+Format(e.g: 10m)> [REASON]` example: `mute @User 10m He is doing bad stuff!`")
		
		await message.guild.channels.cache.forEach(ch => {
			try{
				ch.updateOverwrite(mutedrole, { SEND_MESSAGES: false, ADD_REACTIONS: false, CONNECT: false, SPEAK: false });
			}catch (e) {console.log(e)}
		})

		try{
			member.roles.add(mutedrole);
		}catch{
			message.channel.send("Something went wrong!")
		}
		let embed = new Discord.MessageEmbed()
		.setColor(config.colors.yes)
		.setTitle(`Muted: \`${member.user.tag}\``)
		.setThumbnail(member.user.displayAvatarURL({dynamic:true}))
		.setFooter(`By: ${message.author.tag}`, message.author.displayAvatarURL({dynamic:true}))
		.setDescription(`He is now muted for \`${ms(mutetime, { long: true })}\`${reason ? `\n\n**REASON**\n> ${reason.substr(0 , 1800)}`: "\nNO REASON"}`)
		message.channel.send(embed).catch(e=>console.log(e))
		
		member.send(embed.setTitle(`You got muted by: \`${message.author.tag}\``)).catch(e=>console.log(e))
		
		setTimeout(()=>{
			try{
				message.channel.send(embed.setTitle(`You got unmuted: \`${member.user.tag}\``).setDescription("\u200b")).catch(e=>console.log(e))
				member.roles.remove(mutedrole);
			}catch{
				message.channel.send("Something went wrong!")
			}
		}, mutetime)
	}
}
//-CODED-BY-TOMATO#6966-//