const {  MessageEmbed } = require("discord.js");
const config = require("../config.json");
module.exports = {
    all: async (client) => {
        const description = {name: "logger", filename: "logger.js",version: "4.3" }
        console.log(` :: ⬜️ Module: ${description.name} | Loaded version ${description.version} from ("${description.filename}")`.bold.green)
        try{
        client.on("channelCreate", function (channel) {
            send(channel.guild, client, "GREEN", `Channel: \`${channel.name}\` \n ${channel}`, "CHANNEL CREATED")
        });

        client.on("channelDelete", function (channel) {
             
             send(channel.guild, client, "RED", `Channel: \`${channel.name}\` \n ${channel}`, "CHANNEL DELETED")
        });

        client.on("channelPinsUpdate", function (channel, time) {
            send(channel.guild, client, "YELLOW", `Channel: \`${channel.name}\` \n ${channel} \n\nPinned at: ${time}`, "CHANNEL PINS UPDATE")
        });

        client.on("channelUpdate", function (oldChannel, newChannel) {
            let newCategory;
            try{
                newCategory = newChannel.parent.name;
            }catch{
                newCategory = "ERROR";
            }
            let guildsChannel = newChannel.guild;
            if (!newCategory) newCategory = 'None';
            if (!guildsChannel || !guildsChannel.available) return;
        
            let types = {
                text: 'Text channel',
                voice: 'Voice channel',
                null: 'None',
                news: "News Channel",
            };
            if (oldChannel.name !== newChannel.name) {

                send(oldChannel.guild, client, "ORANGE", `__Channel: ${newChannel}__ \n\n**Before:** \`${oldChannel.name}\`
                **After:** \`${newChannel.name}\`
                **Channel type:** \`${types[newChannel.type]}\`
                **Channel category:** \`${newCategory}\`
                **Channel ID:** \`${newChannel.id}\``, "CHANNEL NAME CHANGED")
       
            }

            if (oldChannel.topic !== newChannel.topic) {
              let oldc; let newc;
              try{
                newc = newChannel.topic.substr(0, 650); + "..."
              } catch{
                newc = "It is now Empty"
              }
              try{
                oldc = oldChannel.topic.substr(0, 650); + "..."
              } catch{
                oldc = "It was Empty before"
              }
              send(oldChannel.guild, client, "ORANGE", `__Channel: ${newChannel}__ \n\n**Before:** \`${oldc}\`
              **After:** \`${newc}\`
              **Channel type:** \`${types[newChannel.type]}\`
              **Channel category:** \`${newCategory}\`
              **Channel ID:** \`${newChannel.id}\``, "CHANNEL TOPIC CHANGED")
     
            }

        });

        client.on("emojiCreate", function (emoji) {
            send(emoji.guild, client, "GREEN", `EMOJI: ${emoji}\n`, "EMOJI CREATED")
        });

        client.on("emojiDelete", function (emoji) {
            send(emoji.guild, client, "RED", `EMOJI: ${emoji}\n`, "EMOJI DELETED")
        });

        client.on("emojiUpdate", function (oldEmoji, newEmoji) {
            if (oldEmoji.name !== newEmoji.name) {
                    send(oldEmoji.guild, client, "ORANGE", `__Emoji: ${newEmoji}__ \n\n**Before:** \`${oldEmoji.name}\`
                    **After:** \`${newEmoji.name}\`
                    **Emoji ID:** \`${newEmoji.id}\``, "EMOJI NAME CHANGED")
            }
        });

        client.on("guildBanAdd", function (guild, user) {
            send(guild, client, "RED", `User: ${user} (\`${user.id}\`)\n\`${user.tag}\``, "USER BANNED")
        });

        client.on("guildBanRemove", function (guild, user) {
            send(guild, client, "YELLOW", `User: ${user} (\`${user.id}\`)\n\`${user.tag}\``, "USER UNBANNED")
        });

        client.on("guildMemberAdd", function (member) {
            send(member.guild, client, "GREEN", `Member: ${member.user} (\`${member.user.id}\`)\n\`${member.user.tag}\``, "MEMBER JOINED")
        });

        client.on("guildMemberRemove", function (member) {
            send(member.guild, client, "RED", `Member: ${member.user} (\`${member.user.id}\`)\n\`${member.user.tag}\``, "MEMBER LEFT")
        });

        client.on("guildMembersChunk", function (members, guild) {
            for(let i = 0; i<=members.length;i++){
                try{
                    send(guild, client, "RED", `${i} Member: ${members[i]} (\`${members[i].user.id}\`)\n\`${members[i].user.tag}\``, "MEMBER CHUNK / RAID")
                }catch{
                }
            }
        });

        client.on("guildMemberUpdate", function (oldMember, newMember) {
            let options = {}
            
            if (options[newMember.guild.id]) {
                options = options[newMember.guild.id]
            }

            // Add default empty list
            if (typeof options.excludedroles === "undefined") options.excludedroles = new Array([])
            if (typeof options.trackroles === "undefined") options.trackroles = true
            const oldMemberRoles = oldMember.roles.cache.keyArray()
            const newMemberRoles = newMember.roles.cache.keyArray()
            const oldRoles = oldMemberRoles.filter(x => !options.excludedroles.includes(x)).filter(x => !newMemberRoles.includes(x))
            const newRoles = newMemberRoles.filter(x => !options.excludedroles.includes(x)).filter(x => !oldMemberRoles.includes(x))
            const rolechanged = (newRoles.length || oldRoles.length)

            if (rolechanged) {
                let roleadded = ""
                if (newRoles.length > 0) {
                    for (let i = 0; i < newRoles.length; i++) {
                        if (i > 0) roleadded += ", "
                        roleadded += `<@&${newRoles[i]}>`
                    }
                }
                let roleremoved = ""
                if (oldRoles.length > 0) {
                    for (let i = 0; i < oldRoles.length; i++) {
                        if (i > 0) roleremoved += ", "
                        roleremoved += `<@&${oldRoles[i]}>`
                    }
                }
                let text = `${roleremoved ? `❌ ROLE REMOVED: \n${roleremoved}` : ""}${roleadded ? `✅ ROLE ADDED:\n${roleadded}` : ""}`
                send(oldMember.guild, client, `${roleadded ? "GREEN" : "RED"}`, `Member: ${newMember.user}\nUser: \`${oldMember.user.tag}\`\n\n${text}`, "Member ROLES Changed")
            }
          
        });

        client.on("messageDelete", function (message) {
            try{
                if (message.author.bot) return;
                
                if (message.channel.type !== "text") return;
                
                send(message.guild, client, "ORANGE", `
                **Author : ** <@${message.author.id}> - *${message.author.tag}*
                **Date : ** ${message.createdAt}
                **Channel : ** <#${message.channel.id}> - *${message.channel.name}*
                
                **Deleted Message : **
\`\`\`
${message.content.replace(/`/g, "'")}
\`\`\`
                
                **Attachment URL : **
                ${message.attachments.map(x => x.proxyURL)}
                
                `, "Message Deleted")
            }
            catch{
            }
        });

        client.on("messageDeleteBulk", function (messages) {
            send(messages.guild, client, "RED", `${messages}`, messages.length + "  Message Deleted BULK")
        });

        client.on("messageUpdate", function (oldMessage, newMessage) {
            try{
                if (oldMessage.author.bot) return;
    
            if (oldMessage.channel.type !== "text") return
            if (newMessage.channel.type !== "text") return
    
            if (oldMessage.content === newMessage.content) return
            send(oldMessage.guild, client, "YELLOW", `
            **Author : ** <@${newMessage.member.user.id}> - *${newMessage.member.user.tag}*
            **Date : ** ${newMessage.createdAt}
            **Channel : ** <#${newMessage.channel.id}> - *${newMessage.channel.name}*
            
            **Orignal Message : **
\`\`\`
${oldMessage.content.replace(/`/g, "'")}
\`\`\`
**Updated Message : **
\`\`\`
${newMessage.content.replace(/`/g, "'")}
\`\`\`
            `, "Message UPDATED")
        }
        catch{
    
        }
        });

        client.on("roleCreate", function (role) {
            send(role.guild, client, "GREEN", role, "ROLE CREATED")
        });

        client.on("roleDelete", function (role) {
            send(role.guild, client, "RED", role, "ROLE DELETED")
        });

        client.on("roleUpdate", function (oldRole, newRole) {
            
            if (oldRole.name !== newRole.name) {
                send(oldRole.guild, client, "ORANGE", `__ROLE: ${oldRole}__ \n\n**Before:** \`${oldRole.name}\`
                **After:** \`${newRole.name}\`
                **Role ID:** \`${newRole.id}\``, "ROLE NAME CHANGED")
            }
            
            else if (oldRole.color !== newRole.color) {
              send(oldRole.guild, client, "ORANGE", `__ROLE: ${newRole}__ \n\n**Before:** \`${oldRole.color.toString(16)}\`
              **After:** \`${newRole.color.toString(16)}\`
              **ROLE ID:** \`${newRole.id}\``, "ROLE COLOR CHANGED")
     
            }
            else {
              send(oldRole.guild, client, "RED", `__ROLE: ${newRole}__ \n
              **THE PERMISSIONS CHANGED PLEASE CHECK!!!**
              **Role ID:** \`${newRole.id}\``, "ROLE PERMISSIONS CHANGED")     
            }
        });

        client.on("userUpdate", function (oldUser, newUser) {
            if(oldUser.username !== newUser.username){
                send(newUser.guild, client, "BLACK", `Member: ${newUser}\nOld Username: \`${oldUser.username}\`\nNew Username: \`${newUser.username}\` `, "Member Username Changed")
            }
        });

        }catch (e){
            console.log("logger: " + e)
        }
       }
}

function send(guild, client, color, desc, title){
    try{
let embed = new MessageEmbed() 
  .setColor(color)
  .setDescription(desc.substr(0, 2000))
  .setTimestamp()
  .setFooter("Milrato", config.AVATARURL)
  if(title) embed.setTitle(("❗ | " + title).substr(0, 250))
  client.setups.ensure(guild.id,  {
    enabled: false,
    channel: "",
},"logger");
  let logger = client.setups.get(guild.id, "logger")
  if(!logger.enabled) return;
 
 
  let channel = client.guilds.cache.get(guild.id).channels.cache.get(logger.channel)
    try {
        channel.createWebhook(guild.name, {
            avatar: guild.iconURL({format: "png"}),
            }).then(async webhook => {
             await webhook.send({
                username: guild.name,
                avatarURL: guild.iconURL({format: "png"}),
                embeds: [embed],
            }).catch(e=> console.log(e));
            await webhook.delete().catch(e=> console.log(e));
        })
        .catch(e=> console.log(e));
	} catch  {
		
	}
  ;
}catch  { }
}