
const { MessageEmbed } = require('discord.js');
const answers = [
    "Maybe.",
    "Certainly Not.",
    "I hope so.",
    "Not in your wildest dreams.",
    "There is a good chance.",
    "Quite likely.",
    "I think so.",
    "I hope so.",
    "I hope not.",
    "Never!",
    "Fuhgeddaboudit",
    "Ahaha! Really?",
    "Pfft.",
    "Sorry, bucko.",
    "Hell, yeah!",
    "Hell, yes.",
    "Hell to the no.",
    "The future is bleak.",
    "The future is uncertain.",
    "I would rather not say",
    "Who cares?",
    "Possibly.",
    "Never, ever, ever.",
    "There is a small chance.",
    "Yes!",
    "Y E S",
    "Ähem, no..",
    "No, straight up, no!",
];

const functions = require("../../functions")
const config = require("../../config.json")
module.exports = {
    name: "8ball",
	aliases: ["8balls"],
    category: "👻 Fun Commands",
    description: "Answers a Question",
    usage: "8ball <QUESTION>",
    run: async (client, message, args) => {
    if(args[0]==null) return message.channel.send('Please provide a Question');
      return message.reply(args.join(' ').endsWith('?') ? 
       `🎱 ${answers[Math.floor(Math.random() * answers.length)]}` :
       "🎱 ***That doesn't seems to be a Question! Please try again!***");
    }
}