const eco = require("discord-economy");

module.exports = {  
    name: "slots",
    category: "💸 Economy Commands",
  description: "lets you play the slot machine",
  usage: "slots",
  run: async (client, message, args) => {
  //command
  var amount = args[0] //Coins to gamble
 
  if (!amount) return message.reply('Specify the amount you want to gamble!')

  var output = await eco.FetchBalance(message.author.id)
  if (output.balance < amount) return message.reply('You have fewer coins than the amount you want to gamble!')

  var gamble = await eco.Slots(message.author.id, amount, {
    width: 3,
    height: 1
  }).catch(console.error)
  message.channel.send(gamble.grid)//Grid checks for a 100% match vertical or horizontal.
  message.reply(`You ${gamble.output}! New balance: ${gamble.newbalance}`)

  }
  };