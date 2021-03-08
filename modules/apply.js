const config = require("../config.json");
const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
const Discord = require("discord.js")
module.exports = function (client, options) {
    const description = {
        name: "chatbot",
        filename: "chatbot.js",
        version: "3.2"
    }
    let disabled = new MessageEmbed()
    .setColor(config.colors.no)
    .setTitle("Your Owner disabled the APPLICATION SYSTEM! Sorry")
    .setFooter("Milrato", config.AVATARURL)
    .setThumbnail(config.AVATARURL)
    console.log(` :: ⬜️ Module: ${description.name} | Loaded version ${description.version} from ("${description.filename}")`.bold.green )

    client.on("messageReactionAdd", async (reaction, user) => {
      const { message } = reaction;
      if(user.bot || !message.guild) return;
      if(message.partial) await message.fetch();
      if(reaction.partial) await reaction.fetch();
      client.apply.ensure(message.guild.id, {
        "channel_id": "",
        "f_channel_id": "", //changequestions --> which one (lists everyone with index) --> 4. --> Question
        "QUESTIONS": [{"1":"DEFAULT"}],
        "TEMP_ROLE": "",   
        "accept": "You've got accepted!",
        "deny": "You've got denied!"
       })
      if(message.channel.id === client.apply.get(message.guild.id, "channel_id") && reaction.emoji.name === "✅"){
          reaction.users.remove(user);
          let guild = await message.guild.fetch();
          let channel_tosend = guild.channels.cache.get(client.apply.get(message.guild.id, "f_channel_id"));
          if(!channel_tosend) return console.log("RETURN FROM !CHANNEL_TOSEND");
          let answers = [];
          let counter = 0;
          let Questions = client.apply.get(message.guild.id, "QUESTIONS");
          let act = Object.values(Questions[counter]).join(" ")
          ask_question(act);
  
          function ask_question(qu){
              if(counter === Questions.length) return send_finished();
              user.send(new Discord.MessageEmbed().setFooter(message.guild.name, message.guild.iconURL({dynamic:true})).setColor("#fcfc03").setDescription(qu).setFooter(message.guild.name, message.guild.iconURL({dynamic:true}))).then(msg => {
                  msg.channel.awaitMessages(m=>m.author.id === user.id, {max: 1, time: 60000, errors: ["time"]}).then(collected => {
                      answers.push(collected.first().content);
                      counter++;
                      if(counter === Questions.length) return send_finished();
                      let act = Object.values(Questions[counter]).join(" ")
                      ask_question(act);
                  }).catch(error=>{
                      console.log(error)
                      return message.channel.send(`${user}, SORRY BUT YOUR TIME RAN OUT!`).then(msg=> msg.delete({timeout: 3000}))
                  })
              }).catch(e => {
                reaction.message.channel.send(`${user}, SORRY! But i cant dm you :'(`).then(msg=> msg.delete({timeout: 3000}))
                
                console.log("APPLY:".underline.red + " :: " + e.stack.toString().red)});
          }
          async function send_finished(){
              let embed = new Discord.MessageEmbed().setFooter(message.guild.name, message.guild.iconURL({dynamic:true}))
              .setColor("#fcfc03")
              .setTitle("A new application from: " + user.tag) //Tomato#6966
              .setDescription(`${user}  |  \`${new Date()}\``)
              .setFooter(user.id, user.displayAvatarURL({dynamic:true}))
              .setTimestamp()
              for(let i = 0; i < Questions.length; i++){
                  try{
                      embed.addField(("**"+Object.keys(Questions[i])+". |** `" + Object.values(Questions[i]) + "`").substr(0, 256), String(answers[i]).substr(0, 1024))
                  }catch{
                  }
              }
              channel_tosend.send(embed).then(msg => {
                  msg.react("✅");
                  msg.react("❌");
                  client.apply.set(msg.id, user.id, "temp")
              }).catch(e => console.log("APPLY:".underline.red + " :: " + e.stack.toString().red));
              try{
                  let roleid = client.apply.get(message.guild.id, "TEMP_ROLE");
                  let member = message.guild.members.cache.get(user.id);
                  let role = await message.guild.roles.cache.get(roleid)
                  member.roles.add(role.id)
              }catch (e){
                  console.log(e)
              }
              user.send(new Discord.MessageEmbed().setFooter(message.guild.name, message.guild.iconURL({dynamic:true})).setColor("#fcfc03").setTitle("Thanks for applying to: `" + message.guild.name + "`").setDescription(`${reaction.message.channel}`).setFooter(message.guild.name, message.guild.iconURL({dynamic:true}))).catch(e => console.log("APPLY:".underline.red + " :: " + e.stack.toString().red));
          }
          
  
      }
      if(message.channel.id === client.apply.get(message.guild.id, "f_channel_id") && (reaction.emoji.name === "✅" || reaction.emoji.name === "❌")){
          //Entferne Alle Reactions vom BOT
          reaction.message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
          
          const targetMessage = await message.channel.messages.fetch(message.id, false, true)
      if (!targetMessage) {
        return message.reply(new Discord.MessageEmbed().setFooter(message.guild.name, message.guild.iconURL({dynamic:true})).setColor("RED").setTitle("Couldn't get information about this Message!").setFooter(message.guild.name, message.guild.iconURL({dynamic:true})));
      }
      //altes embed
      const oldEmbed = targetMessage.embeds[0];
      if(!oldEmbed) return message.reply("NOT A VALID EMBED")
      const embed = new Discord.MessageEmbed().setFooter(message.guild.name, message.guild.iconURL({dynamic:true}))
            .setTitle(oldEmbed.title)
            .setDescription(`Edited by: ${user} | ${reaction.emoji}`)
            if(oldEmbed.fields[0]){
              try{
                for(let i = 0; i<= oldEmbed.fields.length; i++){
                  try{
                    if(oldEmbed.fields[i]) embed.addField(oldEmbed.fields[i].name, oldEmbed.fields[i].value)
                  }catch{}
                }
              }catch{}
            }
            if(oldEmbed.footer) embed.setFooter(oldEmbed.footer.text, oldEmbed.footer.iconURL)
                      
            if (reaction.emoji.name === "✅")  {
              embed.setColor("GREEN")
              targetMessage.edit(embed)
              let approve = new Discord.MessageEmbed().setFooter(message.guild.name, message.guild.iconURL({dynamic:true}))
              .setColor("GREEN")
              .setTitle("You've got accepted from: `" + message.guild.name + "`")
              .setFooter("By  |  " + user.tag, user.displayAvatarURL({dynamic:true}))
              .setDescription(client.apply.get(message.guild.id, "accept"))
              let usert = await client.users.fetch(client.apply.get(message.id, "temp"))
              usert.send(approve).catch(e => {message.channel.send("COULDN'T DM THIS PERSON!");console.log("APPLY:".underline.red + " :: " + e.stack.toString().red)});
            }
            if (reaction.emoji.name === "❌")  {
              embed.setColor("RED")
              targetMessage.edit(embed)
              let deny = new Discord.MessageEmbed().setFooter(message.guild.name, message.guild.iconURL({dynamic:true}))
              .setColor("RED")
              .setTitle("You've got denied from: `" + message.guild.name + "`")
              .setDescription(client.apply.get(message.guild.id, "deny"))
              .setFooter("By  |  " + user.tag, user.displayAvatarURL({dynamic:true}))
              let usert = await client.users.fetch(client.apply.get(message.id, "temp"))
              usert.send(deny).catch(e => {message.channel.send("COULDN'T DM THIS PERSON!");console.log("APPLY:".underline.red + " :: " + e.stack.toString().red)});

            }
        
        targetMessage.edit(embed)
      }
  })
}
