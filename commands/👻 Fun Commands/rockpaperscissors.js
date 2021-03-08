const Canvas = require('canvas');

const Discord = require(`discord.js`);
const { Client, Collection, MessageEmbed } = require("discord.js");
const config = require("../../config.json")

const path = require("path");
module.exports = {

    name: path.parse(__filename).name,
    category: "👻 Fun Commands",
    useage: `${path.parse(__filename).name} [@User]`,
  description: "*Image cmd in the style:* " + path.parse(__filename).name ,
    run: async (client, message, args) => {
		const acceptedReplies = ['rock', 'paper', 'scissors'];
        const random = Math.floor((Math.random() * acceptedReplies.length));
        const result = acceptedReplies[random];

        const choice = args[1];
        if (!choice) return message.reply(`How to play: \`${prefix}rps <rock|paper|scissors>\``);
        if (!acceptedReplies.includes(choice)) return message.reply(`Only these responses are accepted: \`${acceptedReplies.join(', ')}\``);
        
        console.log('Bot Result:', result);
        if (result === choice) return message.reply(new MessageEmbed().setColor("ORANGE").setFooter(client.user.username, config.AVATARURL)
            .setAuthor("It's a tie! We had the same choice.", message.author.displayAvatarURL({dynamic: true})));
        
        switch (choice) {
            case 'rock': {
                if (result === 'paper') return message.reply(new MessageEmbed().setColor("RED").setFooter(client.user.username, config.AVATARURL)
                .setAuthor("I won!", message.author.displayAvatarURL({dynamic: true})));
                else return message.reply(new MessageEmbed().setColor("GREEN").setFooter(client.user.username, config.AVATARURL)
                .setAuthor("You won!", message.author.displayAvatarURL({dynamic: true})));
            }
            case 'paper': {
                if (result === 'scissors') return message.reply(new MessageEmbed().setColor("RED").setFooter(client.user.username, config.AVATARURL)
                .setAuthor("I won!", message.author.displayAvatarURL({dynamic: true})));
                else return message.reply(new MessageEmbed().setColor("GREEN").setFooter(client.user.username, config.AVATARURL)
                .setAuthor("You won!", message.author.displayAvatarURL({dynamic: true})));        
            }
            case 'scissors': {
                if (result === 'rock') return message.reply(new MessageEmbed().setColor("RED").setFooter(client.user.username, config.AVATARURL)
                .setAuthor("I won!", message.author.displayAvatarURL({dynamic: true})));
                else return message.reply(new MessageEmbed().setColor("GREEN").setFooter(client.user.username, config.AVATARURL)
                .setAuthor("You won!", message.author.displayAvatarURL({dynamic: true})));
            }
            default: {
                return message.reply(`Only these responses are accepted: \`${acceptedReplies.join(', ')}\``);
            }
        }
    }
}
