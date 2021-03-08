const config = require("../config.json");
const { MessageEmbed,MessageAttachment } = require("discord.js");
const { Welcomer, Leaver } = require("canvacord");
const fetch = require("node-fetch");
module.exports = function (client, options) {
    const description = {
        name: "welcomeleavesytem",
        filename: "welcomeleavesytem.js",
        version: "4.3"
    }
    console.log(` :: ⬜️ Module: ${description.name} | Loaded version ${description.version} from ("${description.filename}")`.bold.green)
/**
 * @WELCOME when someone joins send into channel and add roles!
 */
    client.on("guildMemberAdd", async member => {
      if(!member.guild) return;

    client.setups.ensure(member.guild.id,  {
          enabled: false,
          channel: "",
          message: `We hope that you enjoy it in here! :v: :heart:`,
          roles: [],
          background: {
              enable: true,
              colors: {
                  "border": config.colors.yes,
                  "username-box": config.colors.yes,
                  "discriminator-box": config.colors.yes,
                  "message-box": config.colors.yes,
                  "title": config.colors.yes,
                  "avatar": config.colors.yes
              },
              image: "https://images.hdqwalls.com/download/gfx-nerds-uz-2560x1440.jpg"
          }
      }, "welcome" );
      if(client.setups.has(member.guild.id, "welcome.enabled")){


      let channel = member.guild.channels.cache.get(client.setups.get(member.guild.id, "welcome.channel"))
      if(channel){
        if(client.setups.get(member.guild.id, "welcome.background.enable")){
          let avatar = member.user.displayAvatarURL({format: "png"});
          let username = member.user.username
          let hash = member.user.discriminator;
          let membercount = member.guild.memberCount;
          let Servername = member.guild.name;
          let bg = client.setups.get(member.guild.id, "welcome.background.image")
          let image = new Welcomer()
              .setUsername(username)
              .setDiscriminator(hash)
              .setMemberCount(membercount)
              .setGuildName(Servername)
              .setAvatar(avatar)
              .setColor("border", client.setups.get(member.guild.id, "welcome.background.colors.border"))
              .setColor("username-box", client.setups.get(member.guild.id, "welcome.background.colors.username-box"))
              .setColor("discriminator-box", client.setups.get(member.guild.id, "welcome.background.colors.discriminator-box"))
              .setColor("message-box", client.setups.get(member.guild.id, "welcome.background.colors.message-box"))
              .setColor("title", client.setups.get(member.guild.id, "welcome.background.colors.title"))
              .setColor("avatar", client.setups.get(member.guild.id, "welcome.background.colors.avatar"))
              .setBackground(bg);
              let attachment = new MessageAttachment(await image.build(), "welcome-image.png");
              let embed = new MessageEmbed()
              .setColor(config.colors.yes)
              .setTitle("Welcome to: `" + member.guild.name + "`")
              .setDescription(client.setups.get(member.guild.id, "welcome.message"))
              .setFooter(member.user.tag+ " | " + member.user.id, member.user.displayAvatarURL({dynamic:true}))
              .attachFiles(attachment)
              .setImage("attachment://welcome-image.png")
              .setTimestamp()
              channel.send(embed).catch(e=>console.log("WELCOME:".underline.red + " :: " + e.stack.toString().red));
        }else{
          let embed = new MessageEmbed()
              .setColor(config.colors.yes)
              .setTitle("Welcome to: `" + member.guild.name + "`")
              .setDescription(client.setups.get(member.guild.id, "welcome.message"))
              .setFooter(member.user.tag+ " | " + member.user.id, member.user.displayAvatarURL({dynamic:true}))
              .setTimestamp()
              channel.send(embed).catch(e=>console.log("WELCOME:".underline.red + " :: " + e.stack.toString().red));
        }
      
        }
        let roles = client.setups.get(member.guild.id, "welcome.roles");
        if(roles.length >= 1){

        for(let i = 0; i < roles.length; i++){
          try{
            let grat = member.guild.roles.cache.get(roles[i])
             member.roles.add(grat.id);
          }catch (e){
            console.log("WELCOME:".underline.red + " :: " + e.stack.toString().red)
          }
        }
      }
  
        }
    })
/**
 * @LEAVE when someone joins send into channel
 */
    client.on("guildMemberRemove", async member => {
      if(!member.guild) return;
      client.setups.ensure(member.guild.id, 
        {
           enabled: false,
           channel: "",
           message: `Good bye from: ${member.guild.name}`,
           background: {
               enable: true,
               colors: {
                   "border": config.colors.no,
                   "username-box": config.colors.no,
                   "discriminator-box": config.colors.no,
                   "message-box": config.colors.no,
                   "title": config.colors.no,
                   "avatar": config.colors.no
               },
               image: "https://cdn.wallpapersafari.com/29/54/7zcTjw.jpg"
           }
       },"leave");
      if(client.setups.has(member.guild.id, "leave.enabled")){

      let channel = member.guild.channels.cache.get(client.setups.get(member.guild.id, "leave.channel"))
      if(channel){
        if(client.setups.get(member.guild.id, "leave.background.enable")){
          let avatar = member.user.displayAvatarURL({format: "png"});
          let username = member.user.username
          let hash = member.user.discriminator;
          let membercount = member.guild.memberCount;
          let Servername = member.guild.name;
          let bg = client.setups.get(member.guild.id, "leave.background.image")
          let image = new Leaver()
              .setUsername(username)
              .setDiscriminator(hash)
              .setMemberCount(membercount)
              .setGuildName(Servername)
              .setAvatar(avatar)
              .setColor("border", client.setups.get(member.guild.id, "leave.background.colors.border"))
              .setColor("username-box", client.setups.get(member.guild.id, "leave.background.colors.username-box"))
              .setColor("discriminator-box", client.setups.get(member.guild.id, "leave.background.colors.discriminator-box"))
              .setColor("message-box", client.setups.get(member.guild.id, "leave.background.colors.message-box"))
              .setColor("title", client.setups.get(member.guild.id, "leave.background.colors.title"))
              .setColor("avatar", client.setups.get(member.guild.id, "leave.background.colors.avatar"))
              .setBackground(bg);
              let attachment = new MessageAttachment(await image.build(), "welcome-image.png");
              let embed = new MessageEmbed()
              .setColor(config.colors.no)
              .setTitle("Welcome to: `" + member.guild.name + "`")
              .setDescription(client.setups.get(member.guild.id, "leave.message"))
              .setFooter(member.user.tag+ " | " + member.user.id, member.user.displayAvatarURL({dynamic:true}))
              .attachFiles(attachment)
              .setImage("attachment://welcome-image.png").setTimestamp()
              channel.send(embed).catch(e=>console.log("WELCOME:".underline.red + " :: " + e.stack.toString().red));
        }else{
          let embed = new MessageEmbed()
              .setColor(config.colors.no)
              .setTitle("Welcome to: `" + member.guild.name + "`")
              .setDescription(client.setups.get(member.guild.id, "leave.message"))
              .setFooter(member.user.tag+ " | " + member.user.id, member.user.displayAvatarURL({dynamic:true})).setTimestamp()
              channel.send(embed).catch(e=>console.log("WELCOME:".underline.red + " :: " + e.stack.toString().red));
        }
        }
        }
    })
}
