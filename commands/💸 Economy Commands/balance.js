const eco = require("discord-economy");
module.exports = {
    name: "balance",
    category: "💸 Economy Commands",
  description: "Lets you check how much money you have",
  usage: "balance [@USER]",
  run: async (client, message, args) => {
  //command
  let user = message.mentions.users.first();
  if(!user) message.author;

  var output = await eco.FetchBalance(user.id)
  message.reply(`${user} owns \`${output.balance} 💸\`.`);
  }
  };