const eco = require("discord-economy");
module.exports = {
    name: "daily",
    category: "💸 Economy Commands",
  description: "ear your daily cash",
  usage: "daily",
  run: async (client, message, args) => {
    
    var output = await eco.Daily(message.author.id)
    if (output.updated) {

     var profile = await eco.AddToBalance(message.author.id, 100)
     message.reply(`You claimed your daily coins successfully! You now own \`${profile.newbalance}\` coins.`);

   } else {
     message.channel.send(`Sorry, you already claimed your daily coins!\nBut no worries, over \`${output.timetowait}\` you can daily again!`)
   }
  }
  };