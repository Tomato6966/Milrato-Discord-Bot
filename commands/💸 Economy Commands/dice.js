const eco = require("discord-economy");
module.exports = {
    name: "dice",
    category: "💸 Economy Commands",
  description: "Rolls a dice",
  usage: "dice",
  run: async (client, message, args) => {
  //command

  var roll = args[0] //Should be a number between 1 and 6
  var amount = args[1] //Coins to gamble

  if (!roll || ![1, 2, 3, 4, 5, 6].includes(parseInt(roll))) return message.reply('Specify the \`roll\`, it should be a number between \`1\`-\`6\`')
  if (!amount) return message.reply('Specify the **amount** you want to gamble!')

  var output = eco.FetchBalance(message.author.id)
  if (output.balance < amount) return message.reply('You have fewer coins than the amount you want to gamble!')

  var gamble = await eco.Dice(message.author.id, roll, amount).catch(console.error)
  message.reply(`The dice rolled **${gamble.dice}**. So you \`${gamble.output}\`! New balance: \`${gamble.newbalance} 💸\``)
  }
  };