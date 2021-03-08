const eco = require("discord-economy");
module.exports = {
    name: "ecolb",
    category: "💸 Economy Commands",
    aliases: ["ecoleaderboard"],
  description: "Shows leaderboard of econmy",
  usage: "ecolb",
  run: async (client, message, args) => {
  //command
  let user = message.mentions.users.first();
  if(!user) message.author;
  if (message.mentions.users.first()) {
 
    var output = await eco.Leaderboard({
      filter: x => x.balance > 50,
      search: message.mentions.users.first().id
    })
    message.channel.send(`The user ${message.mentions.users.first().tag} is number ${output} on my leaderboard!`);

  } else {

    eco.Leaderboard({
      limit: 10, 
      filter: x => x.balance > 50 
    }).then(async users => { 

      if (users[0]) var firstplace = await client.users.fetch(users[0].userid) 
      if (users[1]) var secondplace = await client.users.fetch(users[1].userid) 
      if (users[2]) var thirdplace = await client.users.fetch(users[2].userid) 
      if (users[3]) var thirdplace1 = await client.users.fetch(users[3].userid) 
      if (users[4]) var thirdplace2 = await client.users.fetch(users[4].userid) 
      if (users[5]) var thirdplace3 = await client.users.fetch(users[5].userid) 
      if (users[6]) var thirdplace4 = await client.users.fetch(users[6].userid) 
      if (users[7]) var thirdplace5 = await client.users.fetch(users[7].userid) 
      if (users[8]) var thirdplace6 = await client.users.fetch(users[8].userid) 
      if (users[9]) var thirdplace7 = await client.users.fetch(users[9].userid) 
     
      message.channel.send(`My Global ECONOMY leaderboard:

**1** - \`${firstplace && firstplace.tag || 'Nobody Yet'}\` : \`${users[0] && users[0].balance || 'None'}\`
**2** - \`${secondplace && secondplace.tag || 'Nobody Yet'}\` : \`${users[1] && users[1].balance || 'None'}\`
**3** - \`${thirdplace && thirdplace.tag || 'Nobody Yet'}\` : \`${users[2] && users[2].balance || 'None'}\`
**4** - \`${thirdplace1 && thirdplace1.tag || 'Nobody Yet'}\` : \`${users[3] && users[3].balance || 'None'}\`
**5** - \`${thirdplace2 && thirdplace2.tag || 'Nobody Yet'}\` : \`${users[4] && users[4].balance || 'None'}\`
**6** - \`${thirdplace3 && thirdplace3.tag || 'Nobody Yet'}\` : \`${users[5] && users[5].balance || 'None'}\`
**7** - \`${thirdplace4 && thirdplace4.tag || 'Nobody Yet'}\` : \`${users[6] && users[6].balance || 'None'}\`
**8** - \`${thirdplace5 && thirdplace5.tag || 'Nobody Yet'}\` : \`${users[7] && users[7].balance || 'None'}\`
**9** - \`${thirdplace6 && thirdplace6.tag || 'Nobody Yet'}\` : \`${users[8] && users[8].balance || 'None'}\`
**10** - \`${thirdplace7 && thirdplace7.tag || 'Nobody Yet'}\` : \`${users[9] && users[9].balance || 'None'}\`
`)

    })

  }
  }
  };