const config = require("../config.json")
const {MessageEmbed} = require("discord.js")
module.exports = function (bot, options) {
    const description = {
        name: "jointocreate",
        filename: "jointocreate.js",
        version: "3.2"
    }
    let disabled = new MessageEmbed()
    .setColor(config.colors.no)
    .setTitle("Your Owner disabled all Join to Creates Channels! Sorry")
    .setFooter("Milrato", config.AVATARURL)
    .setThumbnail(config.AVATARURL)
    console.log(` :: ⬜️ Module: ${description.name} | Loaded version ${description.version} from ("${description.filename}")`.bold.green)


    bot.on("voiceStateUpdate", (oldState, newState) => {
    try{
                var oldChannelName
  var newChannelName

  // SET CHANNEL NAME STRING
  let oldparentname = "unknown"
  let oldchannelname = "unknown"
  let oldchanelid = "unknown"
  if (oldState && oldState.channel && oldState.channel.parent && oldState.channel.parent.name) oldparentname = oldState.channel.parent.name
  if (oldState && oldState.channel && oldState.channel.name) oldchannelname = oldState.channel.name
  if (oldState && oldState.channelID) oldchanelid = oldState.channelID

  let newparentname = "unknown"
  let newchannelname = "unknown"
  let newchanelid = "unknown"
  if (newState && newState.channel && newState.channel.parent && newState.channel.parent.name) newparentname = newState.channel.parent.name
  if (newState && newState.channel && newState.channel.name) newchannelname = newState.channel.name
  if (newState && newState.channelID) newchanelid = newState.channelID

  if (oldState.channelID) {
      if (typeof oldState.channel.parent !== "undefined") {
          oldChannelName = `${oldparentname}\n\t**${oldchannelname}**\n*${oldchanelid}*`
      } else {
          oldChannelName = `-\n\t**${oldparentname}**\n*${oldchanelid}*`
      }
  }
  if (newState.channelID) {
      if (typeof newState.channel.parent !== "undefined") {
          newChannelName = `${newparentname}\n\t**${newchannelname}**\n*${newchanelid}*`
      } else {
          newChannelName = `-\n\t**${newchannelname}**\n*${newchanelid}*`
      }
  }
  // JOINED V12
  if (!oldState.channelID && newState.channelID) {
    bot.setups.ensure(newState.guild.id, {
      jointocreate: {
          enabled: false,
          channels: [],
          tempchannels: [],
      }
    });
    let jointocreate = bot.setups.get(newState.guild.id, "jointocreate");
   if(!jointocreate.channels.includes(newState.channelID)) return;
   if(!jointocreate.enabled) return newState.member.send(disabled).catch(e=>console.log("JOIN_TO_CREATE:".underline.red + " :: " + e.stack.toString().red));
    jointocreatechannel(newState);  
   
  }
  // LEFT V12
  if (oldState.channelID && !newState.channelID) {
    bot.setups.ensure(newState.guild.id, {
      jointocreate: {
          enabled: false,
          channels: [],
          tempchannels: [],
      }
  });
      let jointocreate = bot.setups.get(newState.guild.id, "jointocreate");
      if (jointocreate.tempchannels.includes(oldState.channelID)) {
        if(!jointocreate.enabled) return newState.member.send(disabled).catch(e=>console.log("JOIN_TO_CREATE:".underline.red + " :: " + e.stack.toString().red));
            var vc = oldState.guild.channels.cache.get(oldState.channelID);
            if (vc.members.size < 1) { 
              try{
              bot.setups.remove(newState.guild.id, oldState.channelID, "jointocreate.tempchannels");
              }catch{}
              console.log(oldState.member.user.username + "#" + oldState.member.user.discriminator + " :: Room wurde gelöscht")
            return vc.delete().catch(e=> console.log("JOIN_TO_CREATE:".underline.red + " :: " + e.stack.toString().red)); 
            
          }
            else {
            }
          }
      
    
  }
  if (oldState.channelID && newState.channelID) {
    bot.setups.ensure(newState.guild.id, {
      jointocreate: {
          enabled: false,
          channels: [],
          tempchannels: [],
      }
  });
    // False positive check
    if (oldState.channelID !== newState.channelID) {
      let jointocreate = bot.setups.get(newState.guild.id, "jointocreate");
      
      if(jointocreate.channels.includes(newState.channelID)) {
        if(!jointocreate.enabled) return newState.member.send(disabled).catch(e=>console.log("JOIN_TO_CREATE:".underline.red + " :: " + e.stack.toString().red));
        jointocreatechannel(oldState);  
      }
      if (jointocreate.tempchannels.includes(oldState.channelID)) {
         var vc = oldState.guild.channels.cache.get(oldState.channelID);
        if (vc.members.size < 1) { 
          try{
            bot.setups.remove(newState.guild.id, oldState.channelID, "jointocreate.tempchannels");
            }catch{}
          console.log(oldState.member.user.username + "#" + oldState.member.user.discriminator + " :: Room wurde gelöscht")
        return vc.delete().catch(e=> console.log("JOIN_TO_CREATE:".underline.red + " :: " + e.stack.toString().red)); 
      }
      else {
      }
      }
    }
}
  async function jointocreatechannel(user) {
    console.log(user.member.user.username + "#" + user.member.user.discriminator + " :: Created a Room")
    await user.guild.channels.create(`┇${user.member.user.username}'s Room`, {
      type: 'voice',
      parent: user.channel.parent.id, //ADMINISTRATOR
      permissionOverwrites: [
        {
          id: user.id,
          allow: ['MANAGE_CHANNELS'],
        },
        {
          id: user.guild.id,
          allow: ['VIEW_CHANNEL'],
        },
      ],
    }).then(async vc => {
      user.setChannel(vc);
      bot.setups.push(newState.guild.id, vc.id, "jointocreate.tempchannels");
    })
  }
  }catch(e){console.log("JOIN_TO_CREATE:".underline.red + " :: " + e.stack.toString().red)}
  })

}
