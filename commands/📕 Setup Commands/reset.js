const functions = require("../../functions")
const config = require("../../config.json")
module.exports = {
  name: "reset",
  aliases: ["hardreset"],
  category: "📕 Setup Commands",
  description: "Resets / Deletes all of the Setups as well as the prefix!",
  usage: "reset",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return functions.embedbuilder(client,"null", message, config.colors.no, "BOT-CHAT-SETUP", `❌ You don\'t have permission for this Command!`)

    if (message.member.guild.owner.id !== message.author.id) return functions.embedbuilder(client,"null", message, config.colors.no, "RESET", `❌ You don\'t have permission for this Command! *Only the Server-Owner*`)
    let themsg = await message.reply("Do you really want to reset all SETTINGS? ||(*Reply with:* **__`yes`__**)||")
    const filter = m => m.author.id === message.author.id;
    themsg.channel.awaitMessages(filter, {
      max: 1,
      time: 600000,
      errors: ['time']
  })
  .then(async collected => { 
    if(collected === "yes")
    {
    try{
      await client.settings.delete(message.guild.id,"prefix");
    }catch{ /* */ }
    try{
      await client.settings.delete(message.guild.id,"djroles");
    }catch{ /* */ }
    try{
      await client.settings.delete(message.guild.id,"playingembed");
    }catch{ /* */ }
    try{
      await client.settings.delete(message.guild.id,"playingchannel");
    }catch{ /* */ }
    try{
      await client.settings.delete(message.guild.id,"botchannel");
    }catch{ /* */ } 
    try{
      await client.custom.delete(message.guild.id, "playlists");
    }catch{ /* */ }
    client.custom.ensure(message.guild.id, {
      playlists: [],
    });
    client.settings.ensure(message.guild.id, {
        prefix: config.prefix,
        djroles: [],
        playingembed: "",
        playingchannel: "",
        botchannel: [],
    });
    await message.reply("SUCCESSFULLY RESETTED EVERYTHING")
  }
  }).catch(error=> {
    message.reply("CANCELLED CAUSE NOT THE RIGHT WORD / TIME RAN OUT!")
  })
   
}
};