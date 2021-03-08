const eco = require("discord-economy");
module.exports = {
    name: "work",
    category: "💸 Economy Commands",
  description: "Lets you work a job",
  usage: "work",
  run: async (client, message, args) => {

  var output = await eco.Work(message.author.id)
  //50% chance to fail and earn nothing. You earn between 1-100 coins. And you get one out of 20 random jobs.
  if (output.earned == 0) return message.reply('Awh, you did not do your job well so you earned nothing!')
  message.channel.send(`${message.author.username}
You worked as a \`${output.job}\` and earned \`${output.earned} 💸\`
You now own  \`${output.balance} 💸\``)
  }
  };