const config = require("../config.json");
const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
module.exports = function (client, options) {
    const description = {
        name: "membercount",
        filename: "membercount.js",
        version: "1.3"
    }
    console.log(` :: ⬜️ Module: ${description.name} | Loaded version ${description.version} from ("${description.filename}")`.bold.green)

    client.on("guildMemberAdd", async (member) => {
      try{
        if(!member.guild) return;
        client.setups.ensure(member.guild.id,  {
          enabled: false,
          channel: "",
          tempnum: 0,
          message: "🗣 All Members: {member}"
      },"membercount");
        let membercount  = client.setups.get(member.guild.id, "membercount");
        if(!membercount.enabled) return;
         client.setups.set(member.guild.id, membercount.tempnum + 1, "membercount.tempnum");
         if(membercount.tempnum >= 10){
          client.setups.set(member.guild.id, 0, "membercount.tempnum");
          try{
            let channelid = membercount.channel;
            let channel = await client.channels.fetch(channelid);
            channel.setName(membercount.message.replace("{member}", member.guild.memberCount))
          }catch (e) {
            console.log("MEMBERCOUNT:".underline.red + " :: " + e.stack.toString().red);
          }
         }
        }catch(e){console.log("MEMBERCOUNT:".underline.red + " :: " + e.stack.toString().red)}
      })
  client.on("guildMemberRemove", async (member) => {
    try{
      if(!member.guild) return;
      client.setups.ensure(member.guild.id,  {
        enabled: false,
        channel: "",
        tempnum: 0,
        message: "🗣 All Members: {member}"
    },"membercount");
    let membercount  = client.setups.get(member.guild.id, "membercount");
    if(!membercount.enabled) return;
     client.setups.set(member.guild.id, membercount.tempnum + 1, "membercount.tempnum");
     if(membercount.tempnum >= 10){
      client.setups.set(member.guild.id, 0, "membercount.tempnum");
      try{
        let channelid = membercount.channel;
        let channel = await client.channels.fetch(channelid);
        channel.setName(membercount.message.replace("{member}", member.guild.memberCount))
      }catch (e) {
        console.log("MEMBERCOUNT:".underline.red + " :: " + e.stack.toString().red);
      }
     }
    }catch(e){console.log("MEMBERCOUNT:".underline.red + " :: " + e.stack.toString().red)}
  })
}
