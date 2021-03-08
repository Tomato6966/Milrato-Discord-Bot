const Discord = require("discord.js");
const config = require("../../config.json")
module.exports = {
    name: "advancedembed",
    category: "⛔️ Moderation Commands",
    description: "Sends an selfmade Embed into an channel",
    usage: "advancedembed",
    run: async (client, message, args) => {
        if (!message.member.hasPermission(["VIEW_AUDIT_LOG"])) return message.reply(`**${message.author.username}**, you dont have the missing permissions!`)
         /**
         * 1. COLOR
         * 2. TITLE
         * 3. DESCRIPTION
         * 4. THUMBNAIL y/n
         * 5. IMAGE 
         * 6. Channel
         */
        let color = config.colors.yes; let nocolor = false;
        let thumbnail; let nothumbnail = false;
        let description; let nodescription = false;
        let title; let notitle = false;
        let image; let noimage = false;
        let channel; 
        let qu = new Discord.MessageEmbed()
        .setColor(color)
        .setFooter(client.user.username, config.AVATARURL)
        .setFooter(message.guild.name, message.guild.iconURL())  
        //CHANNEL
        message.channel.send(qu.setTitle("To which channel do you want your embed to be sent?").setDescription("*If you want it to be sent here then type `here` if not tag it!* **#chat**\n\nIf you want to cancel the EMBED Builder, type: `cancel`")).then(msg=>{
            msg.channel.awaitMessages(m=>m.author.id===message.author.id, { max: 1, time: 60000, errors: ['time'] }).then(collected => 
                {
                    if(collected.first().content.toLowerCase() === "cancel")
                    return message.reply("CANCELLED THE EMBED BUILDER!")
                    else if(collected.first().content.toLowerCase() === "here")
                        channel = message.channel;
                    else
                        {
                            try{
                                let actch = collected.first().mentions.channels.first() || collected.first().content;
                                console.log(actch)
                                channel = message.guild.channels.cache.get(actch.id)
                            }catch{
                                return message.reply("COULD NOT FIND YOUR CHANNEL! Sorry")
                            }
                        }
            
        //COLOR
        message.channel.send(qu.setTitle("Please answer with the EMBED `COLOR`").setDescription("*ONLY HEX code(`#ff00ff`)*\n\n*If you want Milrato's `COLOR`, enter `standard`*\n\n*If you don't want a `COLOR`, enter `no`*\n\nIf you want to cancel the EMBED Builder, type: `cancel`")).then(msg=>{
            msg.channel.awaitMessages(m=>m.author.id===message.author.id, { max: 1, time: 60000, errors: ['time'] }).then(collected => 
                {
                    if(collected.first().content.toLowerCase() === "cancel")
                        return message.reply("CANCELLED THE EMBED BUILDER!")
                    else if(collected.first().content.toLowerCase() === "no")
                        nocolor = true;
                    else if(collected.first().content.toLowerCase() === "standard")
                        color = config.colors.yes;
                    else if(!collected.first().content.startsWith("#") && collected.first().content.length !== 7)
                        return message.reply("YOUR COLOR IS NOT VALID! Embed builder cancelled,  it must contain 7 letters! (6 HEx code, 1 #) Example: `#cf2e3d`")
                    else
                        color = collected.first().content;
             
        //TITLE
        message.channel.send(qu.setTitle("Please answer with the EMBED `TITLE`").setDescription("*If you don't want a `TITLE`, enter `no`*\n\nIf you want to cancel the EMBED Builder, type: `cancel`")).then(msg=>{
            msg.channel.awaitMessages(m=>m.author.id===message.author.id, { max: 1, time: 60000, errors: ['time'] }).then(collected => 
                {
                    if(collected.first().content.toLowerCase() === "cancel")
                        return message.reply("CANCELLED THE EMBED BUILDER!")
                    else if(collected.first().content.toLowerCase() === "no")
                        notitle = true;
                    else if(collected.first().content.length > 256)
                        return message.reply("YOUR TITLE IS TOO LONG, maximum lenght is 256! CANCELLED THE EMBED BUILDER")
                    else
                        title = collected.first().content;
                
        //DESCRIPTION
        message.channel.send(qu.setTitle("Please answer with the EMBED `DESCRIPTION`").setDescription("*If you don't want a `DESCRIPTION`, enter `no`*\n\nIf you want to cancel the EMBED Builder, type: `cancel`")).then(msg=>{
            msg.channel.awaitMessages(m=>m.author.id===message.author.id, { max: 1, time: 60000, errors: ['time'] }).then(collected => 
                {
                    if(collected.first().content.toLowerCase() === "cancel")
                        return message.reply("CANCELLED THE EMBED BUILDER!")
                    else if(collected.first().content.toLowerCase() === "no")
                        nodescription = true;
                    else if(collected.first().content.length > 2048)
                        return message.reply("YOUR DESCRIPTION IS TOO LONG, maximum lenght is 2048!")
                    else
                        description = collected.first().content;
           
        //THUMBNAIL
        message.channel.send(qu.setTitle("Please answer with the EMBED `THUMBNAIL`").setDescription("*If you don't want a `THUMBNAIL`, enter `no`*\n\nIf you want to cancel the EMBED Builder, type: `cancel`")).then(msg=>{
            msg.channel.awaitMessages(m=>m.author.id===message.author.id, { max: 1, time: 60000, errors: ['time'] }).then(collected => 
                {
                    let url = "";
                    if(collected.first().content.toLowerCase() === "cancel")
                        return message.reply("CANCELLED THE EMBED BUILDER!")
                    else if(collected.first().content.toLowerCase() === "no")
                        nothumbnail = true;
                    else if (collected.first().attachments.size > 0) {
                        if (collected.first().attachments.every(attachIsImage))
                        thumbnail = url;
                        else{
                            return message.reply("COULD NOT USE YOUR IMAGE!")
                        }
                        }
                    else if (collected.first().content.includes("https")||collected.first().content.includes("http"))
                        thumbnail = collected.first().content;
                    else{
                        return message.reply("Could not use your thumbnail! EMBED BUILDER CANCELLED")
                    }
                    function attachIsImage(msgAttach) {
                        url = msgAttach.url;
                        //True if this url is a png image.
                        return url.indexOf("png", url.length - "png".length /*or 3*/) !== -1 ||
                        url.indexOf("gif", url.length - "gif".length /*or 3*/) !== -1 ||
                            url.indexOf("jpeg", url.length - "jpeg".length /*or 3*/) !== -1 ||
                            url.indexOf("jpg", url.length - "jpg".length /*or 3*/) !== -1;
                    }
             
        //IMAGE
        message.channel.send(qu.setTitle("Please answer with the EMBED `IMAGE`").setDescription("*If you don't want a `IMAGE`, enter `no`*\n\nIf you want to cancel the EMBED Builder, type: `cancel`")).then(msg=>{
            msg.channel.awaitMessages(m=>m.author.id===message.author.id, { max: 1, time: 60000, errors: ['time'] }).then(collected => 
                {
                    let url = "";
                    if(collected.first().content.toLowerCase() === "cancel")
                        return message.reply("CANCELLED THE EMBED BUILDER!")
                    else if(collected.first().content.toLowerCase() === "no")
                       {
                            noimage = true;
                            let embed = new Discord.MessageEmbed()
                            if(!notitle)embed.setTitle(title)
                            if(!nodescription)embed.setDescription(description)
                            if(!nocolor)embed.setColor(color)
                            if(!nothumbnail)embed.setThumbnail(thumbnail)
                            if(!noimage)embed.setImage(image)
                            .setFooter(message.guild.name, message.guild.iconURL())  
                        
                        channel.send(embed).then(msg =>{
                            try{
                                if(msg.channel.type === "news")
                                msg.crosspost()
                        } catch (error) {
                            console.log(error.stack.toString().red)
                        }  
                        })
                        }
                    else if (collected.first().attachments.size > 0) {
                        if (collected.first().attachments.every(attachIsImage))
                        image = url;
                        else{
                            return message.reply("COULD NOT USE YOUR IMAGE!")
                        }
                        let embed = new Discord.MessageEmbed()
                                if(!notitle)embed.setTitle(title)
                                if(!nodescription)embed.setDescription(description)
                                if(!nocolor)embed.setColor(color)
                                if(!nothumbnail)embed.setThumbnail(thumbnail)
                                if(!noimage)embed.setImage(image)
                                .setFooter(message.guild.name, message.guild.iconURL())  
                            
                            channel.send(embed).then(msg =>{
                                try{
                                    if(msg.channel.type === "news")
                                    msg.crosspost()
                            } catch (error) {
                                console.log(error.stack.toString().red)
                            }  
                            })
                        }
                    else if (collected.first().content.includes("https")||collected.first().content.includes("http"))
                    {
                        image = collected.first().content;
                        let embed = new Discord.MessageEmbed()
                                if(!notitle)embed.setTitle(title)
                                if(!nodescription)embed.setDescription(description)
                                if(!nocolor)embed.setColor(color)
                                if(!nothumbnail)embed.setThumbnail(thumbnail)
                                if(!noimage)embed.setImage(image)
                                .setFooter(message.guild.name, message.guild.iconURL())  
                            
                            message.channel.send(embed).then(msg =>{
                                try{
                                    if(msg.channel.type === "news")
                                    msg.crosspost()
                            } catch (error) {
                                console.log(error.stack.toString().red)
                            }  
                            })
                    }
                    else{
                        return message.reply("Could not use your IMAGE! EMBED BUILDER CANCELLED")
                    }
                    function attachIsImage(msgAttach) {
                        url = msgAttach.url;
                        //True if this url is a png image.
                        return url.indexOf("png", url.length - "png".length /*or 3*/) !== -1 ||
                        url.indexOf("gif", url.length - "gif".length /*or 3*/) !== -1 ||
                        url.indexOf("jpeg", url.length - "jpeg".length /*or 3*/) !== -1 ||
                            url.indexOf("jpg", url.length - "jpg".length /*or 3*/) !== -1;
                    }
                })
            .catch(error => {
                console.log(error)
                return message.reply("EMBED CANCELLED! You didn't answer in time!");
            });
        })
    })
    .catch(error => {
        console.log(error)
        return message.reply("EMBED CANCELLED! You didn't answer in time!");
    });
})
})
.catch(error => {
console.log(error)
return message.reply("EMBED CANCELLED! You didn't answer in time!");
});
})
})
.catch(error => {
console.log(error)
return message.reply("EMBED CANCELLED! You didn't answer in time!");
});
})
})
.catch(error => {
console.log(error)
return message.reply("EMBED CANCELLED! You didn't answer in time!");
});
})
})
.catch(error => {
console.log(error)
return message.reply("EMBED CANCELLED! You didn't answer in time!");
});
})
        
    }
}
