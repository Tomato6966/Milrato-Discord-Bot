const functions = require("../../functions")
const config = require("../../config.json");
const { MessageEmbed,MessageAttachment } = require("discord.js");
const Discord = require("discord.js")
const Canvacord = require("canvacord");
const { Welcomer, Leaver } = require("canvacord");
module.exports = {
  name: "setup",
  aliases: ["setup"],
  category: "📕 Setup Commands",
  description: "Show the list of available setup systems!",
  usage: "setup",
  run: async (client, message, args) => {

    if (!message.member.hasPermission("ADMINISTRATOR")) return functions.embedbuilder(client,"null", message, config.colors.no, "SETUPS", `❌ You don\'t have permission for this Command!`)
   let embed = new MessageEmbed()
   .setColor(config.colors.yes)
   .setTitle("What Setup do u want?")
   .setDescription(`
**1.** \`Welcome/Leave System\`
**2.** \`Ticket System\`
**3.** \`Ranking System\`
**4.** \`Join to Create\`
**5.** \`AI-CHAT System\`
**6.** \`Counter Chat System\`
**7.** \`Member Counter Channel\`
**8.** \`Logger System\`
**9.** \`Application System\`
**10.** \`Reaction Role System\`
`).addField("**__TUTORIAL VIDEO__**", "https://youtu.be/DpWLmoLd84Y")

   .setFooter("Pick the INDEX NUMBER", config.AVATARURL)
   .setThumbnail(config.AVATARURL)


   message.reply(embed).then(msg => {
  msg.channel.awaitMessages(m=> m.author.id === message.author.id, { max: 1, time: 30000, errors: ['time'] }).then(collected=>{
    switch(collected.first().content.toString()){
      case "1":
        welcomesystem();
      break;
      case "2":
        ticketsystem();
      break;
      case "3":
        rankingsystem();
      break;
      case "4":
        jointocreatesystem();
      break;
      case "5":
        aichat();
      break;
      case "6":
        counter()
      break;
      case "7":
        membercountsystem();
      break;
      case "8":
        loggersystem();
      break;
      case "9":
        applysystem();
      break;
      case "10":
        reactionrolesystem()
      break;
      default:
        message.reply(String("SORRY, that Number does not exists :(\n Your Input:\n> " + collected.first().content).substr(0,1999))
      break;

    }
  }).catch(error=>{
    console.log(error)
    return message.reply("SORRY BUT YOUR TIME RAN OUT!")
})
})
/**
 * @APPLYSYSTEM NOT FINISHED
 */
function applysystem(){
  let rembed = new MessageEmbed()
    .setColor(config.colors.yes)
    .setTitle("What do u want to do?")
    .setDescription(`
**1.** \`Create Setup\` - *Creates ONE Application System*
**2.** \`Edit Setup\` - *Edits the already existing Application System*
**3.** \`Reset\` - *Resets settings for Application system*
`)
    .setFooter("Pick the INDEX NUMBER", config.AVATARURL)
    .setThumbnail(config.AVATARURL)

    message.reply(rembed).then(msg => {
    msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(collected=>{
      switch(collected.first().content.toString()){
      case "1":
        let color = "GREEN";
        let desc;
        let userid = message.author.id;

        message.reply(new Discord.MessageEmbed().setFooter(message.guild.name, message.guild.iconURL({dynamic:true})).setColor(config.colors.yes).setAuthor("Setting up...", "https://miro.medium.com/max/1600/1*e_Loq49BI4WmN7o9ItTADg.gif").setFooter(message.guild.name, message.guild.iconURL({dynamic:true})))
        message.guild.channels.create("📋 | Applications", {
            type: "category",
        }).then(ch=>{
            ch.guild.channels.create("✔️|finished-applies", {
                type: "text",
                topic: "React to the Embed, to start the application process",
                parent: ch.id,
                permissionOverwrites: [
                    {
                        id: ch.guild.id,
                        deny: ["VIEW_CHANNEL"]
                    }
                ]
            }).then(ch=> {
                client.apply.set(ch.guild.id, ch.id, "f_channel_id")
            })
            ch.guild.channels.create("✅|apply-here", {
                type: "text",
                topic: "React to the Embed, to start the application process",
                parent: ch.id,
                permissionOverwrites: [
                    {
                        id: ch.guild.id,
                        allow: ["VIEW_CHANNEL"],
                        deny: ["SEND_MESSAGES"]
                    }
                ]
            }).then(ch=> {
                let embed = new Discord.MessageEmbed().setFooter(message.guild.name, message.guild.iconURL({dynamic:true}))
                .setColor("ORANGE")
                .setFooter(message.guild.name, message.guild.iconURL({dynamic:true}))
                 message.channel.send(embed.setTitle("What should be the embed color?").setDescription("It MUST be an HEX CODE 7 letters long, **with** the `#` (e.g: #ffee55)")).then(msg =>{
                    msg.channel.awaitMessages(m => m.author.id === userid, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
                        let content = collected.first().content;
                        if(!content.startsWith("#") && content.length !== 7){
                            message.reply("WRONG COLOR! USING `GREEN`")
                        }
                        else {
                            if(isValidColor(content)){
                                console.log(content)
                                color = content;
                            }
                            else{
                                message.reply("WRONG COLOR! USING `GREEN`")
                            }
                        }
                        function isValidColor(str) {
                            return str.match(/^#[a-f0-9]{6}$/i) !== null;
                        }
                    }).catch(error=>{
                        console.log(error)
                        return message.reply("SORRY BUT YOUR TIME RAN OUT!")
                    })
                    .then(something=>{
                        message.channel.send(embed.setTitle("What should be the embed TEXT?").setDescription("Like what do u want to have listed in the Embed?")).then(msg =>{
                            msg.channel.awaitMessages(m => m.author.id === userid, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
                                desc = collected.first().content;
                                let setupembed = new Discord.MessageEmbed().setFooter(message.guild.name, message.guild.iconURL({dynamic:true}))
                                    .setColor(color)
                                    .setDescription(desc)
                                    .setTitle("Apply for: `" + message.guild.name + "`")
                                    .setFooter(message.guild.name, message.guild.iconURL({dynamic:true}))
                                    ch.send(setupembed).then(msg=>{
                                        msg.react("✅")
                                        client.apply.set(msg.guild.id, msg.channel.id, "channel_id")
                                    });
                                    let counter = 0;
                                    client.apply.set(msg.guild.id, [{"1":"DEFAULT"}], "QUESTIONS")
                                    ask_which_qu();
                                    function ask_which_qu(){
                                        counter++;
                                        if(counter === 25) {
                                            message.reply(new Discord.MessageEmbed().setFooter(message.guild.name, message.guild.iconURL({dynamic:true})).setColor("RED").setAuthor("You reached the maximum amount of Questions!", "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/facebook/65/cross-mark_274c.png"))
                                            return ask_addrole();
                                        }
                                        message.channel.send(embed.setTitle(`What should be the **${counter}** Question?`).setDescription("Enter `finish`, if you are finished with your Questions!")).then(msg=>{
                                            msg.channel.awaitMessages(m => m.author.id === userid, {max: 1, time: 60000, errors: ["TIME"]}).then(collected => {
                                                if(collected.first().content.toLowerCase() === "finish") {
                                                    return ask_addrole();
                                                }
                                                switch(counter){
                                                    case 1: { client.apply.set(msg.guild.id, [], "QUESTIONS"); client.apply.push(msg.guild.id, {"1": collected.first().content}, "QUESTIONS");}break;
                                                    case 2: client.apply.push(msg.guild.id, {"2": collected.first().content}, "QUESTIONS");break;
                                                    case 3: client.apply.push(msg.guild.id, {"3": collected.first().content}, "QUESTIONS");break;
                                                    case 4: client.apply.push(msg.guild.id, {"4": collected.first().content}, "QUESTIONS");break;
                                                    case 5: client.apply.push(msg.guild.id, {"5": collected.first().content}, "QUESTIONS");break;
                                                    case 6: client.apply.push(msg.guild.id, {"6": collected.first().content}, "QUESTIONS");break;
                                                    case 7: client.apply.push(msg.guild.id, {"7": collected.first().content}, "QUESTIONS");break;
                                                    case 8: client.apply.push(msg.guild.id, {"8": collected.first().content}, "QUESTIONS");break;
                                                    case 9: client.apply.push(msg.guild.id, {"9": collected.first().content}, "QUESTIONS");break;
                                                    case 10: client.apply.push(msg.guild.id, {"10": collected.first().content}, "QUESTIONS");break;
                                                    case 11: client.apply.push(msg.guild.id, {"11": collected.first().content}, "QUESTIONS");break;
                                                    case 12: client.apply.push(msg.guild.id, {"12": collected.first().content}, "QUESTIONS");break;
                                                    case 13: client.apply.push(msg.guild.id, {"13": collected.first().content}, "QUESTIONS");break;
                                                    case 14: client.apply.push(msg.guild.id, {"14": collected.first().content}, "QUESTIONS");break;
                                                    case 15: client.apply.push(msg.guild.id, {"15": collected.first().content}, "QUESTIONS");break;
                                                    case 16: client.apply.push(msg.guild.id, {"16": collected.first().content}, "QUESTIONS");break;
                                                    case 17: client.apply.push(msg.guild.id, {"17": collected.first().content}, "QUESTIONS");break;
                                                    case 18: client.apply.push(msg.guild.id, {"18": collected.first().content}, "QUESTIONS");break;
                                                    case 19: client.apply.push(msg.guild.id, {"19": collected.first().content}, "QUESTIONS");break;
                                                    case 20: client.apply.push(msg.guild.id, {"20": collected.first().content}, "QUESTIONS");break;
                                                    case 21: client.apply.push(msg.guild.id, {"21": collected.first().content}, "QUESTIONS");break;
                                                    case 22: client.apply.push(msg.guild.id, {"22": collected.first().content}, "QUESTIONS");break;
                                                    case 23: client.apply.push(msg.guild.id, {"23": collected.first().content}, "QUESTIONS");break;
                                                    case 24: client.apply.push(msg.guild.id, {"24": collected.first().content}, "QUESTIONS");break;
                                                }
                                                ask_which_qu();
                                            }).catch(error=>{
                                                console.log(error)
                                                return message.reply("SORRY BUT YOUR TIME RAN OUT!")
                                            })
                                        })
                                    }
                                    function ask_addrole(){
                                        message.channel.send(embed.setTitle(`Do you want to add a Role, when some1 applies?`).setDescription("Enter `no`, if not\n\nJust ping the Role")).then(msg=>{
                                            msg.channel.awaitMessages(m => m.author.id === userid, {max: 1, time: 60000, errors: ["TIME"]}).then(async collected => {
                                                if(collected.first().content.toLowerCase() === "no") {
                                                    return message.reply(`YOUR APPLICATION SYSTEM IS READY 2 USE: ${ch}\n\n*You can edit Questions by running the cmd: \`//setup\`->\`editsetup\` / rerunning: \`//setup\`* NOTE: ONLY ONE SETUP**/**GUILD`);
                                                }
                                                else{
                                                    let role = collected.first().mentions.roles.map(role => role.id).join(" ");
                                                    if(!role) return message.reply(`COULD NOT FIND THE ROLE!\n\nYOUR APPLICATION SYSTEM IS READY 2 USE: ${ch}\n\n*You can edit Questions by running the cmd: \`//setup\`->\`editsetup\` / rerunning: \`//setup\`* NOTE: ONLY ONE SETUP**/**GUILD`)
                                                    let guildrole = message.guild.roles.cache.get(role)
                                                    let botrole = message.guild.roles.cache.get(message.guild.me.roles.highest.id)

                                                    if(guildrole.position >= botrole.position){
                                                        message.channel.send("I can't access that role, place \"me\" / \"my highest Role\" above other roles that you want me to manage.\n\n SO I AM USING **NO** ROLE, you can change it with: `e!editsetup role`")
                                                        return message.reply(`YOUR APPLICATION SYSTEM IS READY 2 USE: ${ch}\n\n*You can edit Questions by running the cmd: \`//setup\`->\`editsetup\` / rerunning: \`//setup\`* NOTE: ONLY ONE SETUP**/**GUILD`)
                                                    }
                                                        client.apply.set(message.guild.id, role, "TEMP_ROLE")
                                                    return message.reply(`YOUR APPLICATION SYSTEM IS READY 2 USE: ${ch}\n\n*You can edit Questions by running the cmd: \`//setup\`->\`editsetup\` / rerunning: \`//setup\`* NOTE: ONLY ONE SETUP**/**GUILD`)
                                                }
                                            }).catch(error=>{
                                                console.log(error)
                                                return message.reply("SORRY BUT YOUR TIME RAN OUT!")
                                            })
                                        })
                                    }
                                }).catch(error=>{
                                    console.log(error)
                                    return message.reply("SORRY BUT YOUR TIME RAN OUT!")
                                })
                        })
                    })
                })
            })
        })
        break;
        case "2":
          let rrembed = new MessageEmbed()
    .setColor(config.colors.yes)
    .setTitle("What do u want to do?")
    .setDescription(`
**1.** \`acceptmsg\` - *Edit's the accept message!*
**2.** \`denymsg\` - *Edit's the deny message!*
**3.** \`question\` - *Edit one Question out of all Questions*
**4.** \`role\` - *Edit's the Role*
**5.** \`addquestion\` - *Add a Question to the Questions*
`)
    .setFooter("Pick the INDEX NUMBER", config.AVATARURL)
    .setThumbnail(config.AVATARURL)

    message.reply(rrembed).then(msg => {
    msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(collected=>{
          switch(collected.first().content.toString()){
            case "1":

            {
                message.channel.send(new Discord.MessageEmbed().setFooter(message.guild.name, message.guild.iconURL({dynamic:true})).setColor(config.colors.yes).setAuthor("What should be the new accept message?", message.author.displayAvatarURL({dynamic:true}))).then(msg=>{
                    msg.channel.awaitMessages(m=>m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
                        client.apply.set(message.guild.id, collected.first().content, "accept")
                        return message.reply(new Discord.MessageEmbed().setFooter(message.guild.name, message.guild.iconURL({dynamic:true})).setColor("GREEN").setAuthor("Successfully changed the ACCEPT MESSAGE!", message.author.displayAvatarURL({dynamic:true})))
                    }).catch(error=>{
                        console.log(error)
                        return message.reply("SORRY BUT YOUR TIME RAN OUT!")
                    })
                })
            }
            break;
            case "2":

            {
                message.channel.send(new Discord.MessageEmbed().setFooter(message.guild.name, message.guild.iconURL({dynamic:true})).setColor(config.colors.yes).setAuthor("What should be the new deny message?", message.author.displayAvatarURL({dynamic:true}))).then(msg=>{
                    msg.channel.awaitMessages(m=>m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
                        client.apply.set(message.guild.id, collected.first().content, "deny")
                        return message.reply(new Discord.MessageEmbed().setFooter(message.guild.name, message.guild.iconURL({dynamic:true})).setColor("GREEN").setAuthor("Successfully changed the DENY MESSAGE!", message.author.displayAvatarURL({dynamic:true})))
                    }).catch(error=>{
                        console.log(error)
                        return message.reply("SORRY BUT YOUR TIME RAN OUT!")
                    })
                })
            }
            break;
            case "3":

            {
                    let Questions = client.apply.get(message.guild.id, "QUESTIONS");

                    let embed = new Discord.MessageEmbed().setFooter(message.guild.name, message.guild.iconURL({dynamic:true}))
                    .setColor(config.colors.yes)
                    .setTitle("Current Questions") //Tomato#6966
                    .setDescription("WHICH QUESTION DO U WANT TO EDIT?")
                    .setFooter("ADD THE INDEX TO EDIT THE MSG", message.guild.iconURL({dynamic: true}))
                    .setTimestamp()

                    for(let i = 0; i < Questions.length; i++){
                        try{
                            embed.addField("**"+Object.keys(Questions[i])+".** ",Object.values(Questions[i]))
                        }catch (e){
                        console.log(e)
                        }
                    }

                    message.channel.send(embed).then(msg=>{
                      msg.channel.awaitMessages(m=>m.author.id === message.author.id, {max: 1, time: 60000, errors:["TIME"]}).then(collected=>{


                        let arr = client.apply.get(message.guild.id, "QUESTIONS");
                            if(arr.length >= Number(collected.first().content)){
                                message.channel.send(new Discord.MessageEmbed().setFooter(message.guild.name, message.guild.iconURL({dynamic:true})).setColor(config.colors.yes).setAuthor("What should be the new Question?", message.author.displayAvatarURL({dynamic:true}))).then(msg=>{
                                    msg.channel.awaitMessages(m=>m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected => {
                                        const index = Number(collected.first().content);
                                        var obj;
                                        switch(Number(index)){
                                            case 1: obj =  {"1": collected.first().content};break;
                                            case 2: obj =  {"2": collected.first().content};break;
                                            case 3: obj =  {"3": collected.first().content};break;
                                            case 4: obj =  {"4": collected.first().content};break;
                                            case 5: obj =  {"5": collected.first().content};break;
                                            case 6: obj =  {"6": collected.first().content};break;
                                            case 7: obj =  {"7": collected.first().content};break;
                                            case 8: obj =  {"8": collected.first().content};break;
                                            case 9: obj =  {"9": collected.first().content};break;
                                            case 10: obj =  {"10": collected.first().content};break;
                                            case 11: obj =  {"11": collected.first().content};break;
                                            case 12: obj =  {"12": collected.first().content};break;
                                            case 13: obj =  {"13": collected.first().content};break;
                                            case 14: obj =  {"14": collected.first().content};break;
                                            case 15: obj =  {"15": collected.first().content};break;
                                            case 16: obj =  {"16": collected.first().content};break;
                                            case 17: obj =  {"17": collected.first().content};break;
                                            case 18: obj =  {"18": collected.first().content};break;
                                            case 19: obj =  {"19": collected.first().content};break;
                                            case 20: obj =  {"20": collected.first().content};break;
                                            case 21: obj =  {"21": collected.first().content};break;
                                            case 22: obj =  {"22": collected.first().content};break;
                                            case 23: obj =  {"23": collected.first().content};break;
                                            case 24: obj =  {"24": collected.first().content};break;
                                        }
                                        arr[index-1] = obj;
                                        client.apply.set(message.guild.id, arr, "QUESTIONS")
                                        Questions = client.apply.get(message.guild.id, "QUESTIONS");
                                        let new_embed = new Discord.MessageEmbed().setFooter(message.guild.name, message.guild.iconURL({dynamic:true}))
                                            .setColor(config.colors.yes)
                                            .setTitle("NEW Questions") //Tomato#6966
                                            .setFooter(message.guild.name, message.guild.iconURL({dynamic: true}))
                                            .setTimestamp()
                                        for(let i = 0; i < Questions.length; i++){
                                            try{
                                                new_embed.addField("**"+Object.keys(Questions[i])+".** ",Object.values(Questions[i]))
                                            }catch{
                                            }
                                        }
                                        message.channel.send(new_embed);
                                    }).catch(error=>{
                                        console.log(error)
                                        return message.reply("SORRY BUT YOUR TIME RAN OUT!")
                                    })
                                })
                            }else{
                                 message.reply(new Discord.MessageEmbed().setFooter(message.guild.name, message.guild.iconURL({dynamic:true})).setColor("RED").setAuthor("It seems, that this Question does not exist! Please retry! Here are all Questions:", message.author.displayAvatarURL({dynamic:true})))
                                 return message.channel.send(embed);
                            }

                          })
                          .catch(e=>{
                            return message.reply("YOUR TIME RAN OUT!, Cancelled")
                          })
                        })
            }
            break;
            case "4":
                message.channel.send("What should be the new role?\n\nJust ping it!").then(msg=>{
                    msg.channel.awaitMessages(m=>m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
                        if(!collected.first().mentions.roles) return message.reply("YOU did not ping a role!")
                        let roleid = collected.first().mentions.roles.map(role => role.id)[0];
                        let guildrole = message.guild.roles.cache.get(roleid)
                        let botrole = message.guild.roles.cache.get(message.guild.me.roles.highest.id)

                        if(guildrole.position >= botrole.position){
                            return message.channel.send("I can't access that role, place \"me\" / \"my highest Role\" above other roles that you want me to manage.")
                        }
                        client.apply.set(message.guild.id, roleid, "TEMP_ROLE")
                        return message.reply("SUCCESSFULLY CHANGED THE TEMP_ROLE!")
                    }).catch(error=>{
                        console.log(error)
                        return message.reply("SORRY BUT YOUR TIME RAN OUT!")
                    })
                })
            break;
            case "5":

            {
                message.channel.send(new Discord.MessageEmbed().setFooter(message.guild.name, message.guild.iconURL({dynamic:true})).setColor(config.colors.yes).setAuthor("What Question should be added?", message.author.displayAvatarURL({dynamic:true}))).then(msg=>{
                    msg.channel.awaitMessages(m=>m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
                        let Questions = client.apply.get(message.guild.id, "QUESTIONS")
                        let obj;
                        switch(Questions.length+1){
                            case 1: obj =  {"1": collected.first().content};break;
                            case 2: obj =  {"2": collected.first().content};break;
                            case 3: obj =  {"3": collected.first().content};break;
                            case 4: obj =  {"4": collected.first().content};break;
                            case 5: obj =  {"5": collected.first().content};break;
                            case 6: obj =  {"6": collected.first().content};break;
                            case 7: obj =  {"7": collected.first().content};break;
                            case 8: obj =  {"8": collected.first().content};break;
                            case 9: obj =  {"9": collected.first().content};break;
                            case 10: obj =  {"10": collected.first().content};break;
                            case 11: obj =  {"11": collected.first().content};break;
                            case 12: obj =  {"12": collected.first().content};break;
                            case 13: obj =  {"13": collected.first().content};break;
                            case 14: obj =  {"14": collected.first().content};break;
                            case 15: obj =  {"15": collected.first().content};break;
                            case 16: obj =  {"16": collected.first().content};break;
                            case 17: obj =  {"17": collected.first().content};break;
                            case 18: obj =  {"18": collected.first().content};break;
                            case 19: obj =  {"19": collected.first().content};break;
                            case 20: obj =  {"20": collected.first().content};break;
                            case 21: obj =  {"21": collected.first().content};break;
                            case 22: obj =  {"22": collected.first().content};break;
                            case 23: obj =  {"23": collected.first().content};break;
                            case 24: obj =  {"24": collected.first().content};break;
                        }
                        client.apply.push(message.guild.id, obj, "QUESTIONS")
                        message.reply(new Discord.MessageEmbed().setFooter(message.guild.name, message.guild.iconURL({dynamic:true})).setColor("GREEN").setAuthor("Successfully added your Question!", message.author.displayAvatarURL({dynamic:true})))
                        Questions = client.apply.get(message.guild.id, "QUESTIONS");
                        let embed = new Discord.MessageEmbed().setFooter(message.guild.name, message.guild.iconURL({dynamic:true}))
                        .setColor(config.colors.yes)
                        .setTitle("NEW Questions") //Tomato#6966
                        .setFooter(message.guild.name, message.guild.iconURL({dynamic: true}))
                        .setTimestamp()
                        for(let i = 0; i < Questions.length; i++){
                            try{
                                embed.addField("**"+Object.keys(Questions[i])+".** ",Object.values(Questions[i]))
                            }catch (e){
                            console.log(e)
                            }
                        }
                        message.channel.send(embed);
                    }).catch(error=>{
                        console.log(error)
                        return message.reply("SORRY BUT YOUR TIME RAN OUT!")
                    })
                })
            }
            break;
            default:
            message.reply(String("SORRY, that Number does not exists :(\n Your Input:\n> " + collected.first().content).substr(0,1999))
          break;

        }
        })
      })
          break;
          case "3":
            client.apply.set(message.guild.id, {
              "channel_id": "",
              "f_channel_id": "", //changequestions --> which one (lists everyone with index) --> 4. --> Question
              "QUESTIONS": [{"1":"DEFAULT"}],
              "TEMP_ROLE": "",
              "accept": "You've got accepted!",
              "deny": "You've got denied!"
             })
             message.reply("Successfully resetted the application System!")
             break;
        default:
          break;
      }
    })
  })
}
/**
 * @REACTIONROLESYSTEM FINISHED
 */
function reactionrolesystem(){
  let rembed = new MessageEmbed()
    .setColor(config.colors.yes)
    .setTitle("What do u want to do?")
    .setDescription(`
**1.** \`Create new Reaction Role\` - *Creates A New Reaction Role*
**2.** \`Reset Settings\` - *Resets settings for Reaction Role*
`)
    .setFooter("Pick the INDEX NUMBER", config.AVATARURL)
    .setThumbnail(config.AVATARURL)

    message.reply(rembed).then(msg => {
      msg.channel.awaitMessages(m=>m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
        switch(collected.first().content){
          case "1":
            let rembed = new MessageEmbed()
            .setColor(config.colors.yes)
            .setTitle("THIS IS A INFORMATION EMBED!")
            .setDescription(`
       **How to setup Milrato's Reaction Role!**
       > 1. React to message __BELOW__ **this** message

       > 2. Then, afterwards a new message appears! After that, you can PING the ROLE for the reacted EMOJI

       > 3. Process 1... continues, enter \`finish\` to finish the process! (or just dont react)

       > 4. Once it's finished:

       > 4.1 I will ask you, which reaction role **type** you want!
           | - **Multiple** = *you can have every possible reaction option!*
           | - **Single** = *Only one Role at the same time!*
       > 4.2 You will be asked for the TITLE of the Reaction Role, that's necessary!
       > 4.3 After that, enter in which channel you want to have your Reaction Role listed at! Just ping it! \`#chat\`
       > 4.4 After that the Reaction Role Embed, with the information for every Parameter: \`EMOJI = ROLE\`, will be sent in your wished channel and it'll work!

       *You have 30 seconds for each input!*
       `)
        .setThumbnail(config.AVATARURL)
            .setFooter("Milrato", config.AVATARURL)
            message.channel.send(rembed)
            let objet = {
              MESSAGE_ID: "",
              remove_others: false,
              Parameters: []
            };
            let counters = 0;
            ask_emoji()

            function ask_emoji(){
              counters++;
              if(counters.length === 21) return finished();
              let object2 = { Emoji: "", Role: "" };
              let rermbed = new MessageEmbed()
              .setColor(config.colors.yes)
              .setTitle("What's the next Emoji, which u want to use?")
              let cancel = false;
              message.channel.send(rermbed).then(msg => {
                msg.awaitReactions((reaction, user) => user.id == message.author.id,
                { max: 1, time: 30000 }).then(collected => {
                        if (collected.first().emoji.name) {
                          msg.delete();
                          object2.Emoji = collected.first().emoji.name;
                          return ask_role();
                        }
                        else if(collected.first().emoji.id){
                          msg.delete();
                          object2.Emoji = collected.first().emoji.id;
                          return ask_role();
                        }else{
                          message.channel.send('Operation canceled. and finished!');
                          return finished();
                        }
                }).catch(() => {
                        if(!cancel){
                        message.reply('No reaction after 30 seconds, operation canceled');
                        return finished();
                      }
                });
                msg.channel.awaitMessages(m=>m.author.id===message.author.id,{ max: 1, time: 30000 }).then(collected => {
                  if(collected.first().content.toLowerCase()=== "finish"){
                    cancel = true;
                    return finished();
                  }
              }).catch(() => {if(!cancel){
                      message.reply('No reaction after 30 seconds, operation canceled');
                      return finished();
                    }
              });
              })
              function ask_role(){
                counters++;
                let rermbed = new MessageEmbed()
                .setColor(config.colors.yes)
                .setTitle("What Role do you want for that emoji?")
                message.channel.send(rermbed).then(msg => {
                  msg.channel.awaitMessages(m => m.author.id == message.author.id,
                  { max: 1, time: 30000 }).then(collected => {
                    let role = collected.first().mentions.roles.first();
                    if(!role) message.reply("CANCELLED, u didn't Pingged a valid Role")
                    if (role) {

                      object2.Role = role.id;
                      objet.Parameters.push(object2)


                      try{msg.delete();}catch{}
                      try{msg.channel.bulkDelete(1);}catch{}

                      return ask_emoji();
                    }
                    else{
                      message.channel.send('Operation canceled. and finished!');
                      return finished();
                    }
                  }).catch((e) => {
                    console.log(e)
                          message.reply('No reaction after 30 seconds, operation canceled');
                          return finished();
                  });
                })
              }
            }


            function finished(){
              message.reply("What type of Reaction Role do you want?\n`1` === Multiple reaction Options\n`2` === Single reaction Options").then(msg=>{
                msg.channel.awaitMessages(m=>m.author.id===message.author.id, {max: 1, time: 60000, errors:["TIME"]}).then(collected=>{
                  switch(collected.first().content){
                    case "1":
                      break;
                      case "2":
                        objet.remove_others = true;
                        break;
                        default:
                            message.reply("NO CORRECT INPUT! So i will use `MULTIPLE REACTION OPTION`")
                          break;
                  }
              message.reply(`I will use${objet.remove_others ? "Single": "Multiple"} Reaction Option!\n\n`+"What should be the **`Title`** of your Reaction Role?").then(msg=>{
                msg.channel.awaitMessages(m=>m.author.id===message.author.id, {max: 1, time: 60000, errors:["TIME"]}).then(collected=>{
                let title = collected.first().content;
              message.reply("In which channel do you want your Reaction Role to Be?").then(msg=>{
                msg.channel.awaitMessages(m=>m.author.id===message.author.id, {max: 1, time: 60000, errors:["TIME"]}).then(collected=>{

                  if(collected.first().mentions.channels.first()){

                    let channel = collected.first().mentions.channels.first();
                    let embed = new MessageEmbed().setColor(config.colors.yes) .setTitle(title.substr(0, 256)).setFooter(message.guild.name, message.guild.iconURL({dynamic:true}))
                    let buffer = "";
                    for(let i = 0; i< objet.Parameters.length; i++){
                      try{ buffer += objet.Parameters[i].Emoji+ "  **==**  <@&"+objet.Parameters[i].Role+">\n";}catch (e){console.log(e)}
                    }
                    channel.send(embed.setDescription(buffer)).then(msg=>{
                      for(let i = 0; i< objet.Parameters.length; i++){
                        try{msg.react(objet.Parameters[i].Emoji).catch(e=>console.log(e))}catch (e){ console.log(e)}
                      }
                      objet.MESSAGE_ID = msg.id;
                      client.reactionrole.push(message.guild.id, objet, "reactionroles");
                      message.reply("YOUR REACTION ROLE IS FINISHED AND READY TO USE! <#" + msg.channel.id + ">")
                    })

                  }
                  else{
                    message.reply('You didn\'t Ping a CHANNEL, CANCELLED!');
                    return;
                  }
                }).catch(e=>console.log(e))
              })
            }).catch(e=>console.log(e))
          })
        }).catch(e=>console.log(e))
      })
            }
          break;
          case "2":
            client.reactionrole.set(message.guild.id,
              {
                 reactionroles: [
                ]
              }
          );
          return message.reply("Successfully resetted, ReactionRole Setup!")

          break;
          default:
            message.reply(String("SORRY, that Number does not exists :(\n Your Input:\n> " + collected.first().content).substr(0,1999))
          break;

        }


      }).catch(e=>console.log(e))

    });
}
/**
 * @welcomesystem FINISHED
 */
function welcomesystem(){

  let rembed = new MessageEmbed()
    .setColor(config.colors.yes)
    .setTitle("What do u want to do?")
    .setDescription(`
**1.** \`Welcome System\` - *Creates ONE Welcome System*
**2.** \`Leave System\` - *Creates ONE Leave System*
**3.** \`Reset-Both\` - *Resets settings for Welcome & Leave Setup*
`)
    .setFooter("Pick the INDEX NUMBER", config.AVATARURL)
    .setThumbnail(config.AVATARURL)

    message.reply(rembed).then(msg => {
    let parent = false;
    if(msg.channel.parent) parent = msg.channel.parent.id;
    msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(collected=>{
      switch(collected.first().content.toString()){
        case "1":
        _welcome();
        break;
        case "2":
        _leave();
        break;
        case "3":
          client.setups.set(message.guild.id, {
            enabled: true,
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
          }, "welcome")
          client.setups.set(message.guild.id, {
            enabled: true,
            channel: "",
            message: `Good bye from: ${message.guild.name}`,
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
          }, "leave")
          return message.reply("Successfully, resetted WELCOME and LEAVE Setup")
          break;
        default:
          message.reply(String("SORRY, that Number does not exists :(\n Your Input:\n> " + collected.first().content).substr(0,1999))
        break;
      }
    }).catch(error=>{
      console.log(error)
      return message.reply("SORRY BUT YOUR TIME RAN OUT!")
  })
  })

  function _welcome(){
    let rembed = new MessageEmbed()
    .setColor(config.colors.yes)
    .setTitle("What do u want to do?")
    .setDescription(`
**0.** \`Create Setup\` - *Creates an Welcome channel setup!*
**1.** \`Manage Message\` - *Let's you edit the Welcome Message*
**2.** \`Manage Roles\` - *Let's you add/remove Roles from the Welcome Roles*
**3.** \`Manage Image\` - *Let's you manage the settings for the background Image*
**4.** \`Reset\` - *Resets settings for Welcome Setup*
${!client.setups.get(message.guild.id, "welcome.enabled") ?
`**5.** \`Enable Welcome\` - *Enables Welcome*` :
`**5.** \`Disable Welcome\` - *Disables Welcome*`}
`)
    .setFooter("Pick the INDEX NUMBER", config.AVATARURL)
    .setThumbnail(config.AVATARURL)

    message.reply(rembed).then(msg => {
    msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(async collected=>{
      switch(collected.first().content.toString()){
        case "0":
          let avatar = message.author.displayAvatarURL({format: "png"});
          let username = message.author.username
          let hash = message.author.discriminator;
          let membercount = message.guild.memberCount;
          let Servername = message.guild.name;
          let bg = client.setups.get(message.guild.id, "welcome.background.image")

          let image = new Canvacord.Welcomer()
              .setUsername(username)
              .setDiscriminator(hash)
              .setMemberCount(membercount)
              .setGuildName(Servername)
              .setAvatar(avatar)
              .setColor("border", client.setups.get(message.guild.id, "welcome.background.colors.border"))
              .setColor("username-box", client.setups.get(message.guild.id, "welcome.background.colors.username-box"))
              .setColor("discriminator-box", client.setups.get(message.guild.id, "welcome.background.colors.discriminator-box"))
              .setColor("message-box", client.setups.get(message.guild.id, "welcome.background.colors.message-box"))
              .setColor("title", client.setups.get(message.guild.id, "welcome.background.colors.title"))
              .setColor("avatar", client.setups.get(message.guild.id, "welcome.background.colors.avatar"))
              .setBackground(bg);
              let attachment = new MessageAttachment(await image.build(), "welcome-image.png");


        message.guild.channels.create("👋welcome", {
          type: 'text',
          permissionOverwrites: [
            {
              id: message.guild.id,
              allow: ['READ_MESSAGE_HISTORY'],
              deny: ['SEND_MESSAGES'],
            },
          ],
        })
        .then((channel) => {

          let embed = new MessageEmbed()
          .setColor(config.colors.yes)
          .setTitle("Welcome to: `" + message.guild.name + "`")
          .setDescription(client.setups.get(message.guild.id, "welcome.message"))
          .setFooter(message.author.tag+ " | " + message.author.id, message.author.displayAvatarURL({dynamic:true}))
          .attachFiles(attachment)
          .setImage("attachment://welcome-image.png").setTimestamp()
          channel.send(embed);
          client.setups.set(message.guild.id, true, "welcome.enabled")
          client.setups.set(message.guild.id, channel.id, "welcome.channel")
          return message.reply("<#"+channel.id+ "> | Your Welcome Setup is completed now! Run the `//setup` cmd again to adjust the Roles, Welcome Message, and the Background Image!")
        })
        break;
        case "1":
          message.channel.send("Enter your message now!").then(msg=>{
            msg.channel.awaitMessages(m=>m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
              client.setups.set(message.guild.id, collected.first().content, "welcome.message")
              return message.reply("Successfully set the welcome message!")
            }).catch(error=>{
              console.log(error)
              return message.reply("SORRY BUT YOUR TIME RAN OUT!")
          })
          })
        break;
        case "2":
        let rrembed = new MessageEmbed()
    .setColor(config.colors.yes)
    .setTitle("What do u want to do?")
    .setDescription(`
**1.** \`Add Role\` - *Adds a Role for the Welcome Setup*
**2.** \`Remove Role\` - *Removes a Role from the Welcome Setup*
`)
    .setFooter("Pick the INDEX NUMBER", config.AVATARURL)
    .setThumbnail(config.AVATARURL)
        message.channel.send(rrembed).then(msg=>{
          msg.channel.awaitMessages(m=>m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
            switch(collected.first().content.toString()){
              case "1":
                message.channel.send("Ping your Role now!").then(msg=>{
                  msg.channel.awaitMessages(m=>m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
                    let role = collected.first().mentions.roles.map(role => role.id).join(" ");
                    if(!role) return message.reply(`COULD NOT FIND THE ROLE! Please retry Setup`)
                    let guildrole = message.guild.roles.cache.get(role)
                    let botrole = message.guild.roles.cache.get(message.guild.me.roles.highest.id)

                    if(guildrole.position >= botrole.position){
                      return message.channel.send("I can't access that role, place \"me\" / \"my highest Role\" above other roles that you want me to manage.\n\n Please retry Setup")
                    }
                    client.setups.push(message.guild.id, role, "welcome.roles")
                    return message.reply(`Successfully added Role to the Welcome Setup!`)
                  })
                })
              break;
              case "2":
              message.channel.send("Ping your Role now!").then(msg=>{
                msg.channel.awaitMessages(m=>m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
                  let role = collected.first().mentions.roles.map(role => role.id).join(" ");
                  if(!role) return message.reply(`COULD NOT FIND THE ROLE! Please retry Setup`)
                 try{
                  client.setups.remove(message.guild.id, role, "welcome.roles")
                  return message.reply(`Successfully added Role to the Welcome Setup!`)
                 }catch{
                  return message.reply(`Something went wrong!`)
                 }
                })
              })
              break;
              default:
              message.reply(String("SORRY, that Number does not exists :(\n Your Input:\n> " + collected.first().content).substr(0,1999))
              break;
            }
            }).catch(error=>{
              console.log(error)
              return message.reply("SORRY BUT YOUR TIME RAN OUT!")
          })
        })
        break;
        case "3":
          let rrrembed = new MessageEmbed()
    .setColor(config.colors.yes)
    .setTitle("What do u want to do?")
    .setDescription(`
    ${!client.setups.get(message.guild.id, "welcome.background.enabled") ?
    `**1.** \`Disable Background\` - *Disable Background*` :
    `**1.** \`Enable Background\` - *Enables Background*`}
**2.** \`Change Background\` - *Changes the Background*
**3.** \`Change border Color\` - *Changes the Color of the border*
**4.** \`Change username-box Color\` - *Changes the Color of the Username-box*
**5.** \`Change discriminator-box Color\` - *Changes the Color of the discriminator-box*
**6.** \`Change message-box Color\` - *Changes the Color of the message-box*
**7.** \`Change title Color\` - *Changes the Color of the Title*
**8.** \`Change avatar Color\` - *Changes the Color of the Avatar*
**9.** \`Reset Image\` - *Resets the Image of the Welcome*
`)
    .setFooter("Pick the INDEX NUMBER", config.AVATARURL)
    .setThumbnail(config.AVATARURL)
        message.channel.send(rrrembed).then(msg=>{
          msg.channel.awaitMessages(m=>m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(async collected=>{
            switch(collected.first().content.toString()){
              case "1":
                if(!client.setups.get(message.guild.id, "welcome.background.enabled")) {
                  client.setups.set(message.guild.id, true, "welcome.background.enabled");
                  message.reply("Succesfully enabled the Background-Welcome-Setup")
                }
                else if(client.setups.get(message.guild.id, "welcome.background.enabled")) {
                  client.setups.set(message.guild.id, false, "welcome.background.enabled");
                  message.reply("Succesfully disabled the Background-Welcome-Setup")
                }
                else{
                  message.reply("Something went wrong")
                }
              break;

              case "2":
                message.reply("Enter your Background now!").then(msg => {
                  msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(collected=>{
                    switch(collected.first().content.toString()){
                      case "1":
                       client.setups.set(message.guild.id, "null", "welcome.background.image")
                        break;
                      default:
                       if (collected.first().attachments.size > 0) {
                         if (collected.first().attachments.every(attachIsImage)){

                           message.reply("Successfully, set your Background Image! Please make sure to **not** delete your Image from the Channel!")
                           client.setups.set(message.guild.id, url, "welcome.background.image")
                         }
                         else{
                          message.reply("Could not your message as a backgroundimage")
                      }
                       }
                       else if (collected.first().content.includes("https")||collected.first().content.includes("http")){
                         message.reply("Successfully, set your Background Image! Please make sure to **not** delete your Image from the Channel!")
                         client.setups.set(message.guild.id, collected.first().content, "welcome.background.image")
                       }
                       else{
                         message.reply("Could not your message as a backgroundimage")
                       }

                        break;
                   }
                   function attachIsImage(msgAttach) {
                     url = msgAttach.url;

                     //True if this url is a png image.
                     return url.indexOf("png", url.length - "png".length /*or 3*/) !== -1 ||
                      url.indexOf("jpeg", url.length - "jpeg".length /*or 3*/) !== -1 ||
                      url.indexOf("jpg", url.length - "jpg".length /*or 3*/) !== -1;
                 }
                 }).catch(error=>{
                  console.log(error)
                  return message.reply("SORRY BUT YOUR TIME RAN OUT!")
              })
               })
               break;

              case "3":
                message.channel.send("Enter your color now!\n\nIt MUST be an HEX CODE 7 letters long, **with** the `#` (e.g: #ffee55)").then(msg =>{
                  msg.channel.awaitMessages(m => m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
                      let content = collected.first().content;
                      if(!content.startsWith("#") && content.length !== 7){
                          message.reply("WRONG COLOR! USING `GREEN`")
                      }
                      else {
                          if(isValidColor(content)){
                            client.setups.set(message.guild.id, content, "welcome.background.colors.border");
                            message.reply("Succesfully changed the border color")
                            finise();
                          }
                          else{
                              message.reply("WRONG COLOR! USING `GREEN`")
                          }
                      }
                      function isValidColor(str) {
                          return str.match(/^#[a-f0-9]{6}$/i) !== null;
                      }
                  }).catch(error=>{
                      console.log(error)
                      return message.reply("SORRY BUT YOUR TIME RAN OUT!")
                  })
                })
              break;

              case "4":
                message.channel.send("Enter your color now!\n\nIt MUST be an HEX CODE 7 letters long, **with** the `#` (e.g: #ffee55)").then(msg =>{
                  msg.channel.awaitMessages(m => m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
                      let content = collected.first().content;
                      if(!content.startsWith("#") && content.length !== 7){
                          message.reply("WRONG COLOR! USING `GREEN`")
                      }
                      else {
                          if(isValidColor(content)){
                            client.setups.set(message.guild.id, content, "welcome.background.colors.username-box");
                            message.reply("Succesfully changed the username-box color")
                            finise();
                          }
                          else{
                              message.reply("WRONG COLOR! USING `GREEN`")
                          }
                      }
                      function isValidColor(str) {
                          return str.match(/^#[a-f0-9]{6}$/i) !== null;
                      }
                  }).catch(error=>{
                      console.log(error)
                      return message.reply("SORRY BUT YOUR TIME RAN OUT!")
                  })
                })
              break;
              case "5":
                message.channel.send("Enter your color now!\n\nIt MUST be an HEX CODE 7 letters long, **with** the `#` (e.g: #ffee55)").then(msg =>{
                  msg.channel.awaitMessages(m => m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
                      let content = collected.first().content;
                      if(!content.startsWith("#") && content.length !== 7){
                          message.reply("WRONG COLOR! USING `GREEN`")
                      }
                      else {
                          if(isValidColor(content)){
                            client.setups.set(message.guild.id, content, "welcome.background.colors.discriminator-box");
                            message.reply("Succesfully changed the discriminator-box color")
                            finise();
                          }
                          else{
                              message.reply("WRONG COLOR! USING `GREEN`")
                          }
                      }
                      function isValidColor(str) {
                          return str.match(/^#[a-f0-9]{6}$/i) !== null;
                      }
                  }).catch(error=>{
                      console.log(error)
                      return message.reply("SORRY BUT YOUR TIME RAN OUT!")
                  })
                })
              break;
              case "6":
                message.channel.send("Enter your color now!\n\nIt MUST be an HEX CODE 7 letters long, **with** the `#` (e.g: #ffee55)").then(msg =>{
                  msg.channel.awaitMessages(m => m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
                      let content = collected.first().content;
                      if(!content.startsWith("#") && content.length !== 7){
                          message.reply("WRONG COLOR! USING `GREEN`")
                      }
                      else {
                          if(isValidColor(content)){
                            client.setups.set(message.guild.id, content, "welcome.background.colors.message-box");
                            message.reply("Succesfully changed the message-box color")
                            finise();
                          }
                          else{
                              message.reply("WRONG COLOR! USING `GREEN`")
                          }
                      }
                      function isValidColor(str) {
                          return str.match(/^#[a-f0-9]{6}$/i) !== null;
                      }
                  }).catch(error=>{
                      console.log(error)
                      return message.reply("SORRY BUT YOUR TIME RAN OUT!")
                  })
                })
              break;
              case "7":
                message.channel.send("Enter your color now!\n\nIt MUST be an HEX CODE 7 letters long, **with** the `#` (e.g: #ffee55)").then(msg =>{
                  msg.channel.awaitMessages(m => m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
                      let content = collected.first().content;
                      if(!content.startsWith("#") && content.length !== 7){
                          message.reply("WRONG COLOR! USING `GREEN`")
                      }
                      else {
                          if(isValidColor(content)){
                            client.setups.set(message.guild.id, content, "welcome.background.colors.title");
                            message.reply("Succesfully changed the title color")
                            finise();
                          }
                          else{
                              message.reply("WRONG COLOR! USING `GREEN`")
                          }
                      }
                      function isValidColor(str) {
                          return str.match(/^#[a-f0-9]{6}$/i) !== null;
                      }
                  }).catch(error=>{
                      console.log(error)
                      return message.reply("SORRY BUT YOUR TIME RAN OUT!")
                  })
                })
              break;
              case "8":
                message.channel.send("Enter your color now!\n\nIt MUST be an HEX CODE 7 letters long, **with** the `#` (e.g: #ffee55)").then(msg =>{
                  msg.channel.awaitMessages(m => m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
                      let content = collected.first().content;
                      if(!content.startsWith("#") && content.length !== 7){
                          message.reply("WRONG COLOR! USING `GREEN`")
                      }
                      else {
                          if(isValidColor(content)){
                            client.setups.set(message.guild.id, content, "welcome.background.colors.avatar");
                            message.reply("Succesfully changed the avatar color")
                            finise();
                          }
                          else{
                              message.reply("WRONG COLOR! USING `GREEN`")
                          }
                      }
                      function isValidColor(str) {
                          return str.match(/^#[a-f0-9]{6}$/i) !== null;
                      }
                  }).catch(error=>{
                      console.log(error)
                      return message.reply("SORRY BUT YOUR TIME RAN OUT!")
                  })
                })
              break;

              case "9":
                client.setups.set(message.guild.id,  {
                      enable: true,
                      image: "https://images.hdqwalls.com/download/gfx-nerds-uz-2560x1440.jpg",
                      colors: {
                        "border": config.colors.yes,
                        "username-box": config.colors.yes,
                        "discriminator-box": config.colors.yes,
                        "message-box": config.colors.yes,
                        "title": config.colors.yes,
                        "avatar": config.colors.yes
                    },
                }, "welcome.background")
                return message.reply("Successfully resetted the Leave Image!")
              break;
              default:
              message.reply(String("SORRY, that Number does not exists :(\n Your Input:\n> " + collected.first().content).substr(0,1999))
              break;
            }
         async function finise(){
         let avatar = message.author.displayAvatarURL({format: "png"});
         let username = message.author.username
         let hash = message.author.discriminator;
         let membercount = message.guild.memberCount;
         let Servername = message.guild.name;
         let bg = client.setups.get(message.guild.id, "welcome.background.image");

         let image = new Canvacord.Welcomer()
            .setUsername(username)
            .setDiscriminator(hash)
            .setMemberCount(membercount)
            .setGuildName(Servername)
            .setAvatar(avatar)
            .setColor("border", client.setups.get(message.guild.id, "welcome.background.colors.border"))
            .setColor("username-box", client.setups.get(message.guild.id, "welcome.background.colors.username-box"))
            .setColor("discriminator-box", client.setups.get(message.guild.id, "welcome.background.colors.discriminator-box"))
            .setColor("message-box", client.setups.get(message.guild.id, "welcome.background.colors.message-box"))
            .setColor("title", client.setups.get(message.guild.id, "welcome.background.colors.title"))
            .setColor("avatar", client.setups.get(message.guild.id, "welcome.background.colors.avatar"))
            .setBackground(bg);

            let attachment = new MessageAttachment((await image.build()), "welcome-image.png");
            let embeds = new MessageEmbed()
          .setColor(config.colors.yes)
          .setTitle("Welcome to: `" + message.guild.name + "`")
          .setDescription(client.setups.get(message.guild.id, "welcome.message"))
          .setFooter(message.author.tag+ " | " + message.author.id, message.author.displayAvatarURL({dynamic:true}))
          .attachFiles(attachment)
          .setImage("attachment://welcome-image.png").setTimestamp()
          message.channel.send(embeds)
        }
          }).catch(error=>{
            console.log(error)
            return message.reply("SORRY BUT YOUR TIME RAN OUT!")
        })
        })

        break;
        case "4":
          client.setups.set(message.guild.id, {
            enabled: true,
            channel: "",
            message: `We hope that you enjoy it in here! :v: :heart:`,
            roles: [],
            background: {
                enable: true,
                image: "https://images.hdqwalls.com/download/gfx-nerds-uz-2560x1440.jpg",
                colors: {
                  "border": config.colors.yes,
                  "username-box": config.colors.yes,
                  "discriminator-box": config.colors.yes,
                  "message-box": config.colors.yes,
                  "title": config.colors.yes,
                  "avatar": config.colors.yes
              },
            }
          }, "welcome")
          return message.reply("Successfully, resetted WELCOME Setup")
          break;
        case "5":
            if(!client.setups.get(message.guild.id, "welcome.enabled")) {
              client.setups.set(message.guild.id, true, "welcome.enabled");
              message.reply("Succesfully enabled the Welcome-Setup")
            }
            else if(client.setups.get(message.guild.id, "welcome.enabled")) {
              client.setups.set(message.guild.id, false, "welcome.enabled");
              message.reply("Succesfully disabled the Welcome-Setup")
            }
            else{
              message.reply("Something went wrong")
            }
          break;
        default:
          message.reply(String("SORRY, that Number does not exists :(\n Your Input:\n> " + collected.first().content).substr(0,1999))
        break;
      }
    }).catch(error=>{
      console.log(error)
      return message.reply("SORRY BUT YOUR TIME RAN OUT!")
  })
  })
  }
  function _leave(){

    let rembed = new MessageEmbed()
    .setColor(config.colors.yes)
    .setTitle("What do u want to do?")
    .setDescription(`
**0.** \`Create Setup\` - *Creates an Leave channel setup!*
**1.** \`Manage Message\` - *Let's you edit the Leave Message*
**2.** \`Manage Image\` - *Let's you manage the settings for the background Image*
**3.** \`Reset\` - *Resets settings for Leave Setup*
${!client.setups.get(message.guild.id, "leave.enabled") ?
`**4.** \`Enable Leave\` - *Enables Leave*` :
`**4.** \`Disable Leave\` - *Disables Leave*`}
`)
    .setFooter("Pick the INDEX NUMBER", config.AVATARURL)
    .setThumbnail(config.AVATARURL)

    message.reply(rembed).then(msg => {
    msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(async collected=>{
      switch(collected.first().content.toString()){
        case "0":
          let avatar = message.author.displayAvatarURL({format: "png"});
          let username = message.author.username
          let hash = message.author.discriminator;
          let membercount = message.guild.memberCount;
          let Servername = message.guild.name;
          let bg = client.setups.get(message.guild.id, "leave.background.image")
          let image = new Canvacord.Leaver()
              .setUsername(username)
              .setDiscriminator(hash)
              .setMemberCount(membercount)
              .setGuildName(Servername)
              .setAvatar(avatar)
              .setColor("border", client.setups.get(message.guild.id, "leave.background.colors.border"))
              .setColor("username-box", client.setups.get(message.guild.id, "leave.background.colors.username-box"))
              .setColor("discriminator-box", client.setups.get(message.guild.id, "leave.background.colors.discriminator-box"))
              .setColor("message-box", client.setups.get(message.guild.id, "leave.background.colors.message-box"))
              .setColor("title", client.setups.get(message.guild.id, "leave.background.colors.title"))
              .setColor("avatar", client.setups.get(message.guild.id, "leave.background.colors.avatar"))
              .setBackground(bg);
              let attachment = new MessageAttachment(await image.build(), "Leave-image.png");


        message.guild.channels.create("👋Good Bye", {
          type: 'text',
          permissionOverwrites: [
            {
              id: message.guild.id,
              allow: ['READ_MESSAGE_HISTORY'],
              deny: ['SEND_MESSAGES'],
            },
          ],
        })
        .then((channel) => {

          let embed = new MessageEmbed()
          .setColor(config.colors.no)
          .setTitle("Good bye from: `" + message.guild.name + "`")
          .setDescription(client.setups.get(message.guild.id, "leave.message"))
          .setFooter(message.author.tag+ " | " + message.author.id, message.author.displayAvatarURL({dynamic:true}))
          .attachFiles(attachment)
          .setImage("attachment://Leave-image.png").setTimestamp()
          channel.send(embed);
          client.setups.set(message.guild.id, true, "leave.enabled")
          client.setups.set(message.guild.id, channel.id, "leave.channel")
          return message.reply("<#"+channel.id+ "> | Your Leave Setup is completed now! Run the `//setup` cmd again to adjust the Roles, Leave Message, and the Background Image!")
        })
        break;
        case "1":
          message.channel.send("Enter your message now!").then(msg=>{
            msg.channel.awaitMessages(m=>m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
              client.setups.set(message.guild.id, collected.first().content, "leave.message")
              return message.reply("Successfully set the Leave message!")
            }).catch(error=>{
              console.log(error)
              return message.reply("SORRY BUT YOUR TIME RAN OUT!")
          })
          })
        break;
        case "2":
          let rrrembed = new MessageEmbed()
    .setColor(config.colors.yes)
    .setTitle("What do u want to do?")
    .setDescription(`
    ${!client.setups.get(message.guild.id, "leave.background.enabled") ?
    `**1.** \`Enable Background\` - *Enables Background*` :
    `**1.** \`Disable Background\` - *Disables Background*`}
**2.** \`Change Background\` - *Changes the Background*
**4.** \`Change border Color\` - *Changes the Color of the border*
**3.** \`Change username-box Color\` - *Changes the Color of the Username-box*
**5.** \`Change discriminator-box Color\` - *Changes the Color of the discriminator-box*
**6.** \`Change message-box Color\` - *Changes the Color of the message-box*
**7.** \`Change title Color\` - *Changes the Color of the Title*
**8.** \`Change avatar Color\` - *Changes the Color of the Avatar*
**9.** \`Reset Image\` - *Resets the Image*
`)
    .setFooter("Pick the INDEX NUMBER", config.AVATARURL)
    .setThumbnail(config.AVATARURL)
        message.channel.send(rrrembed).then(msg=>{
          msg.channel.awaitMessages(m=>m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(async collected=>{
            switch(collected.first().content.toString()){
              case "1":
                if(!client.setups.get(message.guild.id, "leave.background.enabled")) {
                  client.setups.set(message.guild.id, true, "leave.background.enabled");
                  message.reply("Succesfully enabled the Background-Leave-Setup")
                }
                else if(client.setups.get(message.guild.id, "leave.background.enabled")) {
                  client.setups.set(message.guild.id, false, "leave.background.enabled");
                  message.reply("Succesfully disabled the Background-Leave-Setup")
                }
                else{
                  message.reply("Something went wrong")
                }
              break;

              case "2":
                message.reply("Enter your Background now!").then(msg => {
                  msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(collected=>{
                    switch(collected.first().content.toString()){
                      case "1":
                       client.setups.set(message.guild.id, "null", "leave.background.image")
                        break;
                      default:
                       if (collected.first().attachments.size > 0) {
                         if (collected.first().attachments.every(attachIsImage)){

                           message.reply("Successfully, set your Background Image! Please make sure to **not** delete your Image from the Channel!")
                           client.setups.set(message.guild.id, url, "leave.background.image")
                         }
                         else{
                          message.reply("Could not your message as a backgroundimage")
                      }
                       }
                       else if (collected.first().content.includes("https")||collected.first().content.includes("http")){
                         message.reply("Successfully, set your Background Image! Please make sure to **not** delete your Image from the Channel!")
                         client.setups.set(message.guild.id, collected.first().content, "leave.background.image")
                       }
                       else{
                         message.reply("Could not your message as a backgroundimage")
                       }

                        break;
                   }
                   function attachIsImage(msgAttach) {
                     url = msgAttach.url;

                     //True if this url is a png image.
                     return url.indexOf("png", url.length - "png".length /*or 3*/) !== -1 ||
                      url.indexOf("jpeg", url.length - "jpeg".length /*or 3*/) !== -1 ||
                      url.indexOf("jpg", url.length - "jpg".length /*or 3*/) !== -1;
                 }
                 }).catch(error=>{
                  console.log(error)
                  return message.reply("SORRY BUT YOUR TIME RAN OUT!")
              })
               })
               break;

              case "3":
                message.channel.send("Enter your color now!\n\nIt MUST be an HEX CODE 7 letters long, **with** the `#` (e.g: #ffee55)").then(msg =>{
                  msg.channel.awaitMessages(m => m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
                      let content = collected.first().content;
                      if(!content.startsWith("#") && content.length !== 7){
                          message.reply("WRONG COLOR! USING `GREEN`")
                      }
                      else {
                          if(isValidColor(content)){
                            client.setups.set(message.guild.id, content, "leave.background.colors.border");
                            message.reply("Succesfully changed the border color")
                            finise();
                          }
                          else{
                              message.reply("WRONG COLOR! USING `GREEN`")
                          }
                      }
                      function isValidColor(str) {
                          return str.match(/^#[a-f0-9]{6}$/i) !== null;
                      }
                  }).catch(error=>{
                      console.log(error)
                      return message.reply("SORRY BUT YOUR TIME RAN OUT!")
                  })
                })
              break;

              case "4":
                message.channel.send("Enter your color now!\n\nIt MUST be an HEX CODE 7 letters long, **with** the `#` (e.g: #ffee55)").then(msg =>{
                  msg.channel.awaitMessages(m => m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
                      let content = collected.first().content;
                      if(!content.startsWith("#") && content.length !== 7){
                          message.reply("WRONG COLOR! USING `GREEN`")
                      }
                      else {
                          if(isValidColor(content)){
                            client.setups.set(message.guild.id, content, "leave.background.colors.username-box");
                            message.reply("Succesfully changed the username-box color")
                            finise();
                          }
                          else{
                              message.reply("WRONG COLOR! USING `GREEN`")
                          }
                      }
                      function isValidColor(str) {
                          return str.match(/^#[a-f0-9]{6}$/i) !== null;
                      }
                  }).catch(error=>{
                      console.log(error)
                      return message.reply("SORRY BUT YOUR TIME RAN OUT!")
                  })
                })
              break;
              case "5":
                message.channel.send("Enter your color now!\n\nIt MUST be an HEX CODE 7 letters long, **with** the `#` (e.g: #ffee55)").then(msg =>{
                  msg.channel.awaitMessages(m => m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
                      let content = collected.first().content;
                      if(!content.startsWith("#") && content.length !== 7){
                          message.reply("WRONG COLOR! USING `GREEN`")
                      }
                      else {
                          if(isValidColor(content)){
                            client.setups.set(message.guild.id, content, "leave.background.colors.discriminator-box");
                            message.reply("Succesfully changed the discriminator-box color")
                            finise();
                          }
                          else{
                              message.reply("WRONG COLOR! USING `GREEN`")
                          }
                      }
                      function isValidColor(str) {
                          return str.match(/^#[a-f0-9]{6}$/i) !== null;
                      }
                  }).catch(error=>{
                      console.log(error)
                      return message.reply("SORRY BUT YOUR TIME RAN OUT!")
                  })
                })
              break;
              case "6":
                message.channel.send("Enter your color now!\n\nIt MUST be an HEX CODE 7 letters long, **with** the `#` (e.g: #ffee55)").then(msg =>{
                  msg.channel.awaitMessages(m => m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
                      let content = collected.first().content;
                      if(!content.startsWith("#") && content.length !== 7){
                          message.reply("WRONG COLOR! USING `GREEN`")
                      }
                      else {
                          if(isValidColor(content)){
                            client.setups.set(message.guild.id, content, "leave.background.colors.message-box");
                            message.reply("Succesfully changed the message-box color")
                            finise();
                          }
                          else{
                              message.reply("WRONG COLOR! USING `GREEN`")
                          }
                      }
                      function isValidColor(str) {
                          return str.match(/^#[a-f0-9]{6}$/i) !== null;
                      }
                  }).catch(error=>{
                      console.log(error)
                      return message.reply("SORRY BUT YOUR TIME RAN OUT!")
                  })
                })
              break;
              case "7":
                message.channel.send("Enter your color now!\n\nIt MUST be an HEX CODE 7 letters long, **with** the `#` (e.g: #ffee55)").then(msg =>{
                  msg.channel.awaitMessages(m => m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
                      let content = collected.first().content;
                      if(!content.startsWith("#") && content.length !== 7){
                          message.reply("WRONG COLOR! USING `GREEN`")
                      }
                      else {
                          if(isValidColor(content)){
                            client.setups.set(message.guild.id, content, "leave.background.colors.title");
                            message.reply("Succesfully changed the title color")
                            finise();
                          }
                          else{
                              message.reply("WRONG COLOR! USING `GREEN`")
                          }
                      }
                      function isValidColor(str) {
                          return str.match(/^#[a-f0-9]{6}$/i) !== null;
                      }
                  }).catch(error=>{
                      console.log(error)
                      return message.reply("SORRY BUT YOUR TIME RAN OUT!")
                  })
                })
              break;
              case "8":
                message.channel.send("Enter your color now!\n\nIt MUST be an HEX CODE 7 letters long, **with** the `#` (e.g: #ffee55)").then(msg =>{
                  msg.channel.awaitMessages(m => m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
                      let content = collected.first().content;
                      if(!content.startsWith("#") && content.length !== 7){
                          message.reply("WRONG COLOR! USING `GREEN`")
                      }
                      else {
                          if(isValidColor(content)){
                            client.setups.set(message.guild.id, content, "leave.background.colors.avatar");
                            message.reply("Succesfully changed the avatar color")
                            finise();
                          }
                          else{
                              message.reply("WRONG COLOR! USING `GREEN`")
                          }
                      }
                      function isValidColor(str) {
                          return str.match(/^#[a-f0-9]{6}$/i) !== null;
                      }
                  }).catch(error=>{
                      console.log(error)
                      return message.reply("SORRY BUT YOUR TIME RAN OUT!")
                  })
                })
              break;

              case "9":
                client.setups.set(message.guild.id,  {
                      enable: true,
                      image: "https://cdn.wallpapersafari.com/29/54/7zcTjw.jpg",
                      colors: {
                        "border": config.colors.no,
                        "username-box": config.colors.no,
                        "discriminator-box": config.colors.no,
                        "message-box": config.colors.no,
                        "title": config.colors.no,
                        "avatar": config.colors.no
                    },
                }, "leave.background")
                return message.reply("Successfully resetted the Leave Image!")
              break;
              default:
              message.reply(String("SORRY, that Number does not exists :(\n Your Input:\n> " + collected.first().content).substr(0,1999))
              break;
            }
         async function finise(){
         let avatar = message.author.displayAvatarURL({format: "png"});
         let username = message.author.username
         let hash = message.author.discriminator;
         let membercount = message.guild.memberCount;
         let Servername = message.guild.name;
         let bg = client.setups.get(message.guild.id, "leave.background.image");

         let image = new Canvacord.Leaver()
            .setUsername(username)
            .setDiscriminator(hash)
            .setMemberCount(membercount)
            .setGuildName(Servername)
            .setAvatar(avatar)
            .setColor("border", client.setups.get(message.guild.id, "leave.background.colors.border"))
            .setColor("username-box", client.setups.get(message.guild.id, "leave.background.colors.username-box"))
            .setColor("discriminator-box", client.setups.get(message.guild.id, "leave.background.colors.discriminator-box"))
            .setColor("message-box", client.setups.get(message.guild.id, "leave.background.colors.message-box"))
            .setColor("title", client.setups.get(message.guild.id, "leave.background.colors.title"))
            .setColor("avatar", client.setups.get(message.guild.id, "leave.background.colors.avatar"))
            .setBackground(bg);

            let attachment = new MessageAttachment((await image.build()), "Leave-image.png");
            let embeds = new MessageEmbed()
          .setColor(config.colors.yes)
          .setTitle("Welcome to: `" + message.guild.name + "`")
          .setDescription(client.setups.get(message.guild.id, "welcome.message"))
          .setFooter(message.author.tag+ " | " + message.author.id, message.author.displayAvatarURL({dynamic:true}))
          .attachFiles(attachment)
          .setImage("attachment://Leave-image.png").setTimestamp()
          message.channel.send(embeds)
        }
          }).catch(error=>{
            console.log(error)
            return message.reply("SORRY BUT YOUR TIME RAN OUT!")
        })
        })

        break;
        case "3":
          client.setups.set(message.guild.id, {
            enabled: true,
            channel: "",
            message: `We hope that you enjoy it in here! :v: :heart:`,
            roles: [""],
            background: {
                enable: true,
                image: "https://cdn.wallpapersafari.com/29/54/7zcTjw.jpg",
                colors: {
                  "border": config.colors.yes,
                  "username-box": config.colors.yes,
                  "discriminator-box": config.colors.yes,
                  "message-box": config.colors.yes,
                  "title": config.colors.yes,
                  "avatar": config.colors.yes
              },
            }
          }, "leave")
          return message.reply("Successfully, resetted Leave Setup")
          break;
        case "4":
            if(!client.setups.get(message.guild.id, "leave.enabled")) {
              client.setups.set(message.guild.id, true, "leave.enabled");
              message.reply("Succesfully enabled the Leave-Setup")
            }
            else if(client.setups.get(message.guild.id, "leave.enabled")) {
              client.setups.set(message.guild.id, false, "leave.enabled");
              message.reply("Succesfully disabled the Leave-Setup")
            }
            else{
              message.reply("Something went wrong")
            }
          break;
        default:
          message.reply(String("SORRY, that Number does not exists :(\n Your Input:\n> " + collected.first().content).substr(0,1999))
        break;
      }
    }).catch(error=>{
      console.log(error)
      return message.reply("SORRY BUT YOUR TIME RAN OUT!")
  })
  })

  }
}
/**
 * @JOINTOCREATE FINISHED
 */
function jointocreatesystem(){

  let rembed = new MessageEmbed()
    .setColor(config.colors.yes)
    .setTitle("What do u want to do?")
    .setDescription(`
**1.** \`Create Join to Create Channel\` - *Creates a Channel for Join to Create (you can have more then 1)*
${!client.setups.get(message.guild.id, "jointocreate.enabled") ?
`**2.** \`Enable all Join to Creates\` - *Enables all Join to Creates*` :
`**2.** \`Disable all Join to Creates\` - *Disables all Join to Creates*`}
**3.** \`Reset all Join to Create Settings\` - *Resets all Join to Create Setups & Settings*

*You don't need to disable Join to Create, simply delete the Channel if you don't want it anymore*
*Disabling the Join to Create, means that it will not create a Channel, when some1 joins it*
`)
    .setFooter("Pick the INDEX NUMBER", config.AVATARURL)
    .setThumbnail(config.AVATARURL)

    message.reply(rembed).then(msg => {
    msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(collected=>{
      switch(collected.first().content.toString()){
        case "1":
          message.guild.channels.create("-JOIN TO CREATE-", {
            type: 'category',
            permissionOverwrites: [
              {
                id: message.guild.id,
                allow: ['VIEW_CHANNEL'],
              },
            ],
          })
          .then((channel) => {
             message.guild.channels.create(`Create a Room`, {
              type: 'voice',
              parent: channel.id, //ADMINISTRATOR
              permissionOverwrites: [
                {
                  id: message.guild.id,
                  allow: ['VIEW_CHANNEL', "CONNECT"],
                },
              ],
            })
            .then((channel) => {
              //channel id in db
              client.setups.set(message.guild.id, true, "jointocreate.enabled");
              client.setups.push(message.guild.id, channel.id, "jointocreate.channels");
                    let themebd = new MessageEmbed()
                    .setColor(config.colors.yes)
                    .setTitle("Your Join to Create Setup was Successfully!")
                    .setDescription(`You can now connect to: \`${channel.name}\`\n\nIf you want another one, then simply create another one.\nIf you don't want it any more, then just delete the channel!`)
                    .setFooter("Milrato", config.AVATARURL)
                    .setThumbnail(config.AVATARURL)
              message.reply(themebd)
            })
          })
        break;
        case "2":
          if(!client.setups.get(message.guild.id, "jointocreate.enabled")) {
            client.setups.set(message.guild.id, true, "jointocreate.enabled");
            message.reply("Succesfully enabled all Join to Creates")
          }
          else if(client.setups.get(message.guild.id, "jointocreate.enabled")) {
            client.setups.set(message.guild.id, false, "jointocreate.enabled");
            message.reply("Succesfully disabled all Join to Creates")
          }
          else{
            message.reply("Something went wrong")
          }

        break;
        case "3":
          client.setups.set(message.guild.id, {
              enabled: true,
              channels: [],
              tempchannels: [],
          }, "jointocreate");
          message.reply("Succesfully resetted Join to Create Setup")
        break;
        default:
          message.reply(String("SORRY, that Number does not exists :(\n Your Input:\n> " + collected.first().content).substr(0,1999))
        break;
      }
    }).catch(error=>{
      console.log(error)
      return message.reply("SORRY BUT YOUR TIME RAN OUT!")
  })
  })
}
/**
 * @LOGGER FINISHED
 */
function loggersystem(){

  let rembed = new MessageEmbed()
    .setColor(config.colors.yes)
    .setTitle("What do u want to do?")
    .setDescription(`
**1.** \`Create Logger\` - *Creates ONE Logger-System*
${!client.setups.get(message.guild.id, "logger.enabled") ?
`**2.** \`Enable Logger\` - *Enables the Log for this Guild*` :
`**2.** \`Disable Logger\` - *Disables the Logger*`}
**3.** \`Reset\` - *Resets settings for Logger Setup*

*You don't need to disable Logger, simply delete the Channel if you don't want it anymore*
*Disabling the Logger, means that I will no longer Log for you.*
`)
    .setFooter("Pick the INDEX NUMBER", config.AVATARURL)
    .setThumbnail(config.AVATARURL)

    message.reply(rembed).then(msg => {
    let parent = false;
    if(msg.channel.parent) parent = msg.channel.parent.id;
    msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(collected=>{
      switch(collected.first().content.toString()){
        case "1":
          message.guild.channels.create("MILRATO-LOGGER", {
            type: 'text',
              permissionOverwrites: [
                {
                  id: message.guild.id,
                  allow: ['VIEW_CHANNEL', "CONNECT"],
                },
              ],
          })
          .then((channel) => {
            client.setups.set(message.guild.id, {
              enabled: true,
              channel: "",
          }, "logger");
            client.setups.set(message.guild.id, channel.id, "logger.channel")
            if(parent) channel.setParent(parent);
              //channel id in db
                    let themebd = new MessageEmbed()
                    .setColor(config.colors.yes)
                    .setTitle("Your Logger Setup has been successfully created!")
                    .setDescription(`You can now see logs in: ${channel}\n\nIf you don't want it any more, then just delete the channel!`)
                    .setFooter("Milrato", config.AVATARURL)
                    .setThumbnail(config.AVATARURL)
              message.reply(themebd)

              channel.send(`${message.author}, Here you can see your Logs now!`)
            })
        break;
        case "2":
          if(!client.setups.get(message.guild.id, "logger.enabled")) {
            client.setups.set(message.guild.id, true, "logger.enabled");
            message.reply("Succesfully enabled the Logger")
          }
          else if(client.setups.get(message.guild.id, "logger.enabled")) {
            client.setups.set(message.guild.id, false, "logger.enabled");
            message.reply("Succesfully disabled the Logger")
          }
          else{
            message.reply("Something went wrong")
          }
        break;
        case "3":
          client.setups.set(message.guild.id, {
            enabled: true,
            channel: "",
        }, "logger");
        message.reply("Succesfully resetted Logger Setup")
        break;
        default:
          message.reply(String("SORRY, that Number does not exists :(\n Your Input:\n> " + collected.first().content).substr(0,1999))
        break;
      }
    }).catch(error=>{
      console.log(error)
      return message.reply("SORRY BUT YOUR TIME RAN OUT!")
  })
  })
}
/**
 * @AICHAT FINISHED
 */
function aichat(){

  let rembed = new MessageEmbed()
    .setColor(config.colors.yes)
    .setTitle("What do u want to do?")
    .setDescription(`
**1.** \`Create Ai-Chat\` - *Creates ONE Ai-Chat*
${!client.setups.get(message.guild.id, "aichatsystem.enabled") ?
`**2.** \`Enable Ai-Chat\` - *Allows you to Chat with the AI*` :
`**2.** \`Disable Ai-Chat\` - *Disables the AI Chat*`}
**3.** \`Reset\` - *Resets settings for Ai-Chat Setup*

*You don't need to disable Ai-Chat, simply delete the Channel if you don't want it anymore*
*Disabling the Ai-Chat, means that it will not respond to your messages.*
`)
    .setFooter("Pick the INDEX NUMBER", config.AVATARURL)
    .setThumbnail(config.AVATARURL)

    message.reply(rembed).then(msg => {
    let parent = false;
    if(msg.channel.parent) parent = msg.channel.parent.id;
    msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(collected=>{
      switch(collected.first().content.toString()){
        case "1":
          message.guild.channels.create("MILRATO-AI-CHAT", {
            type: 'text',
              permissionOverwrites: [
                {
                  id: message.guild.id,
                  allow: ['VIEW_CHANNEL', "CONNECT"],
                },
              ],
          })
          .then((channel) => {
            client.setups.set(message.guild.id, {
              enabled: true,
              channel: "",
          }, "aichatsystem");
            client.setups.set(message.guild.id, channel.id, "aichatsystem.channel")
            if(parent) channel.setParent(parent);
              //channel id in db
                    let themebd = new MessageEmbed()
                    .setColor(config.colors.yes)
                    .setTitle("Your Ai Chat Setup has been successfully created!")
                    .setDescription(`You can chat with me in: ${channel}\n\nIf you don't want it any more, then just delete the channel!`)
                    .setFooter("Milrato", config.AVATARURL)
                    .setThumbnail(config.AVATARURL)
              message.reply(themebd)
              channel.send(`${message.author} You can now Chat with me ;)`)
            })
        break;
        case "2":
          if(!client.setups.get(message.guild.id, "aichatsystem.enabled")) {
            client.setups.set(message.guild.id, true, "aichatsystem.enabled");
            message.reply("Succesfully enabled the Ai-Chat")
          }
          else if(client.setups.get(message.guild.id, "aichatsystem.enabled")) {
            client.setups.set(message.guild.id, false, "aichatsystem.enabled");
            message.reply("Succesfully disabled the Ai-Chat")
          }
          else{
            message.reply("Something went wrong")
          }
        break;
        case "3":
          client.setups.set(message.guild.id, {
            enabled: true,
            channel: "",
        }, "aichatsystem");
        message.reply("Succesfully resetted Ai Chat Setup")
        break;
        default:
          message.reply(String("SORRY, that Number does not exists :(\n Your Input:\n> " + collected.first().content).substr(0,1999))
        break;
      }
    }).catch(error=>{
      console.log(error)
      return message.reply("SORRY BUT YOUR TIME RAN OUT!")
  })
  })
}
/**
 * @COUNTER FINISHED
 */
function counter(){

  let rembed = new MessageEmbed()
    .setColor(config.colors.yes)
    .setTitle("What do u want to do?")
    .setDescription(`
**1.** \`Create Counter-Chat\` - *Creates ONE Counter-Chat*
${!client.setups.get(message.guild.id, "counter.enabled") ?
`**2.** \`Enable Counter-Chat\` - *Allows you to Chat with the Counter*` :
`**2.** \`Disable Counter-Chat\` - *Disables the Counter Chat*`}
**3.** \`Reset Counter\` - *Resets the current Count Value to 0*
**4.** \`Reset\` - *Resets settings for Counter-Chat Setup*

*You don't need to disable Counter-Chat, simply delete the Channel if you don't want it anymore*
*Disabling the Counter-Chat, means that it will not respond to your messages.*
`)
    .setFooter("Pick the INDEX NUMBER", config.AVATARURL)
    .setThumbnail(config.AVATARURL)

    message.reply(rembed).then(msg => {
    let parent = false;
    if(msg.channel.parent) parent = msg.channel.parent.id;
    msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(collected=>{
      switch(collected.first().content.toString()){
        case "1":
          message.guild.channels.create("MILRATO-Counter-CHAT", {
            type: 'text',
              permissionOverwrites: [
                {
                  id: message.guild.id,
                  allow: ['VIEW_CHANNEL', "CONNECT"],
                },
              ],
          })
          .then((channel) => {
            client.setups.set(message.guild.id, {
              enabled: true,
              channel: "",
              number: 0,
              author: client.user.id
          }, "counter");
            client.setups.set(message.guild.id, channel.id, "counter.channel")
            if(parent) channel.setParent(parent);
              //channel id in db
                    let themebd = new MessageEmbed()
                    .setColor(config.colors.yes)
                    .setTitle("Your Counter Chat Setup has been successfully created!")
                    .setDescription(`You can now count with me in: ${channel}\n\nIf you don't want it any more, then just delete the channel!`)
                    .setFooter("Milrato", config.AVATARURL)
                    .setThumbnail(config.AVATARURL)
              message.reply(themebd)
              channel.send(`${message.author} You can now Count with me ;)`)
              channel.send("0")
            })
        break;
        case "2":
          if(!client.setups.get(message.guild.id, "counter.enabled")) {
            client.setups.set(message.guild.id, true, "counter.enabled");
            message.reply("Succesfully enabled the Counter-Chat")
          }
          else if(client.setups.get(message.guild.id, "counter.enabled")) {
            client.setups.set(message.guild.id, false, "counter.enabled");
            message.reply("Succesfully disabled the Counter-Chat")
          }
          else{
            message.reply("Something went wrong")
          }
        break;
        case "3":
        client.setups.set(message.guild.id, 0, "counter.number");
        message.reply("Succesfully resetted the Counter Value")
        break;
        case "3":
          client.setups.set(message.guild.id, {
            enabled: true,
            channel: "",
            number: 0,
            author: client.user.id
        }, "counter");
        message.reply("Succesfully resetted Counter Chat Setup")
        break;
        default:
          message.reply(String("SORRY, that Number does not exists :(\n Your Input:\n> " + collected.first().content).substr(0,1999))
        break;
      }
    }).catch(error=>{
      console.log(error)
      return message.reply("SORRY BUT YOUR TIME RAN OUT!")
  })
  })
}
/**
 * @membercountsystem NOT FINISHED
 */
function membercountsystem(){

  let rembed = new MessageEmbed()
    .setColor(config.colors.yes)
    .setTitle("What do u want to do?")
    .setDescription(`
**1.** \`Create Member-Counter\` - *Creates ONE Member-Counter*
${!client.setups.get(message.guild.id, "counter.enabled") ?
`**2.** \`Enable Member-Counter\` - *Continues counting your Members!*` :
`**2.** \`Disable Member-Counter\` - *Disables the Member Counter*`}
**3.** \`Edit Message\` - *Edits the message of the MemberCount (Channel Name)*
**4.** \`Reset\` - *Resets settings for Member-Counter Setup*

*You don't need to disable Member-Counter, simply delete the Channel if you don't want it anymore*
*Disabling the Member-Counter, means that it will not respond to your messages.*
`)
    .setFooter("Pick the INDEX NUMBER", config.AVATARURL)
    .setThumbnail(config.AVATARURL)

    message.reply(rembed).then(msg => {
    let parent = false;
    if(msg.channel.parent) parent = msg.channel.parent.id;
    msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(collected=>{
      switch(collected.first().content.toString()){
        case "1":
          message.guild.channels.create("🗣 All Members: " + message.guild.memberCount, {
            type: 'voice',
              permissionOverwrites: [
                {
                  id: message.guild.id,
                  allow: ['VIEW_CHANNEL'],
                  deny: ["CONNECT"],
                },
              ],
          })
          .then((channel) => {
            client.setups.set(message.guild.id, {
              enabled: true,
              channel: channel.id,
              tempnum: 5,
              message: "🗣 All Members: {member}"
          }, "membercount");
              //channel id in db
                    let themebd = new MessageEmbed()
                    .setColor(config.colors.yes)
                    .setTitle("Your Member-Counter Setup has been successfully created!")
                    .setDescription(`You can edit the message by rerunning the \`//setup\` cmd\nI will change the number, for every 10 Members Joins/Leaves\n\nIf you don't want it any more, then just delete the channel!`)
                    .setFooter("Milrato", config.AVATARURL)
                    .setThumbnail(config.AVATARURL)
              message.reply(themebd)
            })
        break;
        case "2":
          if(!client.setups.get(message.guild.id, "counter.enabled")) {
            client.setups.set(message.guild.id, true, "counter.enabled");
            message.reply("Succesfully enabled the Counter-Chat")
          }
          else if(client.setups.get(message.guild.id, "counter.enabled")) {
            client.setups.set(message.guild.id, false, "counter.enabled");
            message.reply("Succesfully disabled the Counter-Chat")
          }
          else{
            message.reply("Something went wrong")
          }
        break;
        case "3":
          let rembed = new MessageEmbed()
    .setColor(config.colors.yes)
    .setTitle("Enter the Channel Name!")
    .setDescription(`
Make sure that there is somewhere {member}, thats the only way on HOW I could count!

Examples:
\`🗣 All Members: {member}\` --> \`🗣 All Members: ${message.guild.memberCount}\`
\`Members: {member}\` --> \`Members: ${message.guild.memberCount}\`
\`People: {member}\` --> \`People: ${message.guild.memberCount}\`
\`Server-Members: {member}\` --> \`Server-Members: ${message.guild.memberCount}\`
\`{member} User\` --> \`${message.guild.memberCount} User\`
`)
    .setFooter("Send the Text!", config.AVATARURL)
    .setThumbnail(config.AVATARURL)

    message.reply(rembed).then(msg => {
    let parent = false;
    if(msg.channel.parent) parent = msg.channel.parent.id;
    msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(async collected=>{
      let chname = collected.first().content.toString();
      if(!chname.substr(0, 32).includes("{member}")) {
        message.reply("CANCELLED, you did not included `{member}`")
        return;
      }
      message.reply("Succesfully changed the Channel-Name")

      client.setups.set(message.guild.id, chname.substr(0, 32), "membercount.message");
      let membercount  = client.setups.get(message.guild.id, "membercount");

      try{
        let channelid = membercount.channel;
        let channel = await client.channels.fetch(channelid);
        channel.setName(membercount.message.replace("{member}", message.guild.memberCount))
      }catch (e) {
        console.log(e);
      }
      }).catch(error=>{
        console.log(error)
        return message.reply("SORRY BUT YOUR TIME RAN OUT!")
    })
    })
        break;
        case "3":
          client.setups.set(message.guild.id, {
            enabled: true,
            channel: channel.id,
            tempnum: 0,
            message: "🗣 All Members: {member}"
        }, "membercount");
        message.reply("Succesfully resetted Member-Counter Chat Setup")
        break;
        default:
          message.reply(String("SORRY, that Number does not exists :(\n Your Input:\n> " + collected.first().content).substr(0,1999))
        break;
      }
    }).catch(error=>{
      console.log(error)
      return message.reply("SORRY BUT YOUR TIME RAN OUT!")
  })
  })
}
/**
 * @TICKETSYSTEM NOT FINISHED
 */
function ticketsystem(){

    let ticket = client.setups.get(message.guild.id, "ticketsystem");

    let rembed = new MessageEmbed()
     .setColor(config.colors.yes)
     .setTitle("What do u want to do?")
     .setDescription(`
  **1.** \`Create Ticket-System\` - *Create ONE Ticket System for your Server*
  **2.** \`Edit Messages\` - *Edit the Message at the ticket open*
  **3.** \`Add AdminRole\`- *Adds a Role for Ticket Permissions*
  **4.** \`Remove AdminRole\`- *Removes a Role for Ticket Permissions*
  ${!ticket.enabled ?
  `**5.** \`Enable Ticket-System\` - *Enable the Ticket-Syste,*` :
  `**5.** \`Disable Ticket-System\` - *Disables the Ticket-System: no more tickets can be opened*`}
  **6.** \`Delete & Reset\` - *deletes current setup, which allows you to resetup*
  `)
     .setFooter("Pick the INDEX NUMBER", config.AVATARURL)
     .setThumbnail(config.AVATARURL)

     message.reply(rembed).then(msg => {
      msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(collected=>{
        switch(collected.first().content.toString()){
          case "1":
            let msg6 = new MessageEmbed()
    .setTitle(`**Hey ${message.author.username}!**`)
    .setDescription(`Please input the message of the ticket setup (React with 🔓 to open a ticket | is always provided)`)
    .setFooter("Milrato", config.AVATARURL)
    .setThumbnail(config.AVATARURL)
    .setColor(config.colors.yes)
    message.reply(msg6).then(msg => {
      msg.channel.awaitMessages(m => m.author.id == message.author.id,
          { max: 1, time: 180000, errors: ['time'], }).then(collected => {
            ticketmsg = collected.first().content;
            message.guild.channels.create("Support - Tickets", {
            type: 'category',
            permissionOverwrites: [
              {
                id: message.guild.id,
                allow: ['READ_MESSAGE_HISTORY'],
                deny: ['SEND_MESSAGES'],
              },
            ],
          })
          .then((channel) => {
            //PARENT ID IN DB
            client.setups.set(message.guild.id, channel.id, "ticketsystem.parentid");
            //PARENT ID IN DB
            var lol = message.guild.channels
            .create("Create a ticket", {
              type: 'text',
              topic: "React with 🔓 to open a Ticket",
              parent: channel.id,
              permissionOverwrites: [
                {
                  id: message.guild.id,
                  allow: ['READ_MESSAGE_HISTORY'],
                  deny: ['SEND_MESSAGES'],
                },
              ],
            })
            .then((channel) => {
              //channel id in db
              client.setups.set(message.guild.id, channel.id, "ticketsystem.channelid");
              //channel id in db
             channel.send(new MessageEmbed()
             .setTitle(`**Create a Ticket**`)
             .setDescription(`${ticketmsg}\n\nReact with 🔓 to open a ticket`)
             .setFooter("Milrato", config.AVATARURL)
             .setThumbnail(config.AVATARURL)
             .setColor(config.colors.yes)
             ).then(msg=>{
              //message id in db
              client.setups.set(message.guild.id, msg.id, "ticketsystem.messageid");
              client.setups.set(message.guild.id, true, "ticketsystem.enabled");
              msg.react("🔓")
                    let themebd = new MessageEmbed()
                    .setColor(config.colors.yes)
                    .setTitle("Your Ticket Setup is created, you can edit everything by running `//setup` again")
                    .setDescription(`<#${channel.id}>`)
                    .setFooter("Milrato", config.AVATARURL)
                    .setThumbnail(config.AVATARURL)
              message.reply(themebd)
              })
            })
          })
        }).catch(error=>{
          console.log(error)
          return message.reply("SORRY BUT YOUR TIME RAN OUT!")
      })
      });
            break;
          case "6":
            try{
              let channel = message.guild.channels.cache.get(ticket.channelid)
              channel.delete();
            }catch{}
            try{
              let parent = message.guild.channels.cache.get(ticket.parentid)
              parent.delete();
            }catch{}
            message.reply("Successfully resetted the current Ticket Setup!")
            client.setups.set(message.guild.id, {
              enabled: true,
              guildid: message.guild.id,
              messageid: "",
              channelid: "",
              parentid: "",
              message: "Hey {user}, thanks for opening an ticket! Someone will help you soon!",
              adminroles: []
            }, "ticketsystem");
          break;
          case "2":
           let rembed = new MessageEmbed()
           .setColor(config.colors.yes)
           .setFooter("Pick the INDEX NUMBER", config.AVATARURL)
           .setThumbnail(config.AVATARURL)
     .setTitle("Enter the message now!")
     .setDescription(`{user} == the user whoe opens the ticket`)
            message.reply(rembed).then(msg => {
              msg.channel.awaitMessages(m=>m.author.id === message.author.id,{max:1,time:30000,errors:['time']}).then(collected=>{
                message.reply("Successfully changed the Message")
                client.setups.set(message.guild.id, collected.first().content, "ticketsystem.message");
              }).catch(error=>{
                console.log(error)
                return message.reply("SORRY BUT YOUR TIME RAN OUT!")
            })
            })
          break;
          case "3":
            let rrembed = new MessageEmbed()
            .setColor(config.colors.yes)
            .setFooter("Pick the INDEX NUMBER", config.AVATARURL)
            .setThumbnail(config.AVATARURL)
            .setTitle("Ping a Role now!")
            .setDescription(`Just Ping the Role`)
                     message.reply(rrembed).then(msg => {
                       msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(collected=>{
                         let role = collected.first().mentions.roles.first();
                         if(!role) message.reply("CANCELLED, u didn't Pingged a valid Role")
                         console.log(role)
                         message.reply("Successfully **added**: `" + role.name + "` to the Admin-Roles");
                         client.setups.push(message.guild.id, role.id, "ticketsystem.adminroles");
                         console.log(client.setups.get(message.guild.id, "ticketsystem"));
                       }).catch(error=>{
                        console.log(error)
                        return message.reply("SORRY BUT YOUR TIME RAN OUT!")
                    })
                   })
          break;
          case "4":
            let rrrembed = new MessageEmbed()
            .setColor(config.colors.yes)
            .setFooter("Pick the INDEX NUMBER", config.AVATARURL)
            .setThumbnail(config.AVATARURL)
            .setTitle("Ping a Role now!")
            .setDescription(`Just Ping the Role`)
                   message.reply(rrrembed).then(msg => {
                     msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(collected=>{
                       let role = collected.first().mentions.roles.first();
                       if(!role) message.reply("CANCELLED, u didn't Pingged a valid Role")
                       console.log(role)
                       try{
                        client.setups.remove(message.guild.id, role.id, "ticketsystem.adminroles");
                        message.reply("Successfully **removed**: `" + role.name + "` from the Admin-Roles");
                       }catch{
                        message.reply("ERROR -> Resetted all Admin roles")
                        client.setups.set(message.guild.id, [], "ticketsystem.adminroles");
                       }

                       console.log(client.setups.get(message.guild.id, "ticketsystem"));
                     }).catch(error=>{
                      console.log(error)
                      return message.reply("SORRY BUT YOUR TIME RAN OUT!")
                  })
                   })
            break;
          case "5":
            if(!client.setups.get(message.guild.id, "ticketsystem.enabled")) {
              client.setups.set(message.guild.id, true, "ticketsystem.enabled");
              message.reply("Succesfully enabled the Ticket-System")
            }
            else if(client.setups.get(message.guild.id, "ticketsystem.enabled")) {
              client.setups.set(message.guild.id, false, "ticketsystem.enabled");
              message.reply("Succesfully disabled the Ticket-System")
            }
            else{
              message.reply("Something went wrong")
            }
            break;
            default:
            message.reply(String("SORRY, that Number does not exists :(\n Your Input:\n> " + collected.first().content).substr(0,1999))
          break;
        }
      }).catch(error=>{
        console.log(error)
        return message.reply("SORRY BUT YOUR TIME RAN OUT!")
    })
  })
}

/**
 * @RANKINGSYSTEM FINISHED
 */
function rankingsystem(){
  let rembed = new MessageEmbed()
   .setColor(config.colors.yes)
   .setTitle("What do u want to do?")
   .setDescription(`
${!client.setups.get(message.guild.id, "ranking.enabled") ?
`**1.** \`Enable Ranking\` - *Enables the Ranking system for this Server*` :
`**1.** \`Disable Ranking\` - *Disables the Ranking system for this Server*`}
**2.** \`Change Background\` - *Changes the Background of the Rankcard*
**3.** \`Reset\` - *Resets settings for Ranking System*
`)
   .setFooter("Pick the INDEX NUMBER", config.AVATARURL)
   .setThumbnail(config.AVATARURL)

   message.reply(rembed).then(msg => {
    msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(collected=>{
      switch(collected.first().content.toString()){
        case "1":
          if(!client.setups.get(message.guild.id, "ranking.enabled")) {
            client.setups.set(message.guild.id, true, "ranking.enabled");
            message.reply("Succesfully enabled the Ranking System")
          }
          else if(client.setups.get(message.guild.id, "ranking.enabled")) {
            client.setups.set(message.guild.id, false, "ranking.enabled");
            message.reply("Succesfully disabled the Ranking System")
          }
          else{
            message.reply("Something went wrong")
          }
        break;
        case "2":
          let rembed = new MessageEmbed()
          .setColor(config.colors.yes)
          .setTitle("What do u want to do?")
          .setDescription(`
       **1.** \`Disable\` - *Send 1 to disable it*
       **2.** \`Enter Url\` - *Just Send the Url*
       `)
          .setFooter("Pick the INDEX NUMBER / send the IMAGE URl", config.AVATARURL)
          .setThumbnail(config.AVATARURL)
          var url;

         message.reply(rembed).then(msg => {
           msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(collected=>{
             switch(collected.first().content.toString()){
               case "1":
                client.setups.set(message.guild.id, "null", "ranking.backgroundimage")
                 break;
               default:
                if (collected.first().attachments.size > 0) {
                  if (collected.first().attachments.every(attachIsImage)){

                    message.reply("Successfully, set your Background Image! Please make sure to **not** delete your Image from the Channel!")
                    client.setups.set(message.guild.id, url, "ranking.backgroundimage")
                  }
                  else{
                    message.reply("Could not your message as a backgroundimage")
                }
                }
                else if (collected.first().content.includes("https")||collected.first().content.includes("http")){
                  message.reply("Successfully, set your Background Image! Please make sure to **not** delete your Image from the Channel!")
                  client.setups.set(message.guild.id, collected.first().content, "ranking.backgroundimage")
                }
                else{
                  message.reply("Could not your message as a backgroundimage")
                }

                 break;
            }
            function attachIsImage(msgAttach) {
              url = msgAttach.url;

              //True if this url is a png image.
              return url.indexOf("png", url.length - "png".length /*or 3*/) !== -1 ||
               url.indexOf("jpeg", url.length - "jpeg".length /*or 3*/) !== -1 ||
               url.indexOf("jpg", url.length - "jpg".length /*or 3*/) !== -1;
          }
          });
        })
        break;
        case "3":
          client.setups.set(message.guild.id, {
            enabled: true,
            backgroundimage: "null",
        }, "ranking");
        let allmembers = message.guild.members.cache.keyArray();
            for (let i = 0; i < allmembers.length; i++) {
              try{
                let rankuser = message.guild.members.cache.get(allmembers[i]).user;
                const key = `${message.guild.id}-${rankuser.id}`;
                client.points.set(key, 1, `level`); //set level to 0
                client.points.set(key, 0, `points`); //set the points to 0
                client.points.set(key, 400, `neededpoints`) //set neededpoints to 0 for beeing sure
                client.points.set(key, "", `oldmessage`); //set old message to 0
              }catch{}
            }
        message.reply("Succesfully resetted the Ranking System")
        break;
        default:
          message.reply(String("SORRY, that Number does not exists :(\n Your Input:\n> " + collected.first().content).substr(0,1999))
        break;
      }
    }).catch(error=>{
      console.log(error)
      return message.reply("SORRY BUT YOUR TIME RAN OUT!")
  })

})
}

}
};
