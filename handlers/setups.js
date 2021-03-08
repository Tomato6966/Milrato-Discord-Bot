const config = require("../config.json")
console.log("Loading Setups".brightCyan)
const functions = require("../functions");
const guildonlycounter = new Map();
module.exports = (client) => {
   
   let stateswitch = false;
    client.on("ready", () => {
        setInterval(() => {
            stateswitch = !stateswitch; //change state
            if (stateswitch) client.user.setActivity(`${config.prefix}help | milrato.eu`, { type: "PLAYING" });
            else client.user.setActivity(`${client.guilds.cache.reduce((c, g) => c + g.memberCount, 0)} User | ${client.guilds.cache.size} Server`, { type: "PLAYING" });
        }, 5000); //5 second delay
    
        
    });
    client.on("guildCreate", guild => {
        console.log("Hey, I got invited to a Server".yellow)
        //WHEN INVITED, create Databases for this guild
        client.custom.set(guild.id, {
            playlists: [],
        });
        client.settings.set(guild.id, {
            prefix: config.prefix,
            djroles: [],
            playingembed: "",
            playingchannel: "",
            botchannel: [],
        });
        client.setups.set(guild.id, {
            ranking: {
                enabled: true,
                backgroundimage: "null",
            },
            logger: {
                enabled: false,
                channel: "",
            },
            welcome: {
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
            },
            leave: {
                enabled: false,
                channel: "",
                message: `Good bye from: ${guild.name}`,
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
            },
            membercount: {
                enabled: false,
                channel: "",
                tempnum: 0,
                message: "🗣 All Members: {member}"
            },
            aichatsystem: {
                enabled: false,
                channel: "",
            },
            ticketsystem: {
                enabled: false,
                guildid: guild.id,
                messageid: "",
                channelid: "",
                parentid: "",
                message: "Hey {user}, thanks for opening an ticket! Someone will help you soon!",
                adminroles: []
            },
            jointocreate: {
                enabled: false,
                channels: [],
                tempchannels: [],
            },
            counter: {
                enabled: false,
                channel: "",
                number: 0,
                author: client.user.id
            }
        });
        client.apply.set(guild.id, {
            "channel_id": "",
            "f_channel_id": "", //changequestions --> which one (lists everyone with index) --> 4. --> Question
            "QUESTIONS": [{"1":"DEFAULT"}],
            "TEMP_ROLE": "",   
            "accept": "You've got accepted!",
            "deny": "You've got denied!"
        })
        client.reactionrole.set(guild.id, 
            {
               reactionroles: [
                   /*
                   {
                      MESSAGE_ID: "",
                      remove_others: false,
                      Parameters: [ 
                          { Emoji: "", Role: "",Roles: ["799066077526491186"] }, 
                      ]
                      
                    },
                    */
              ]
            }
        );
        getAll(client, guild)
    })
    //When a Channel got deleted, try to remove it from the BOTCHANNELS     
    client.on("channelDelete", function (channel) {
        try{client.settings.remove(channel.guild.id, channel.id, `botchannel`);}catch{}
        try{client.setups.remove(channel.guild.id, channel.id, `botchannel`);}catch{}
        try{if(client.setups.get(channel.guild.id, `channel_id`)===channel.id)client.setups.set(channel.guild.id, "", `channel_id`);}catch{}
        try{if(client.setups.get(channel.guild.id, `f_channel_id`)===channel.id)client.setups.set(channel.guild.id, "", `f_channel_id`);}catch{}
        try{if(client.setups.get(channel.guild.id, `logger.channel`)===channel.id)client.setups.set(channel.guild.id, "", `logger.channel`);}catch{}
        try{if(client.setups.get(channel.guild.id, `welcome.channel`)===channel.id)client.setups.set(channel.guild.id, "", `welcome.channel`);}catch{}
        try{if(client.setups.get(channel.guild.id, `leave.channel`)===channel.id)client.setups.set(channel.guild.id, "", `leave.channel`);}catch{}
        try{if(client.setups.get(channel.guild.id, `membercount.channel`)===channel.id)client.setups.set(channel.guild.id, "", `membercount.channel`);}catch{}
        try{if(client.setups.get(channel.guild.id, `aichatsystem.channel`)===channel.id)client.setups.set(channel.guild.id, "", `aichatsystem.channel`);}catch{}
        try{if(client.setups.get(channel.guild.id, `ticketsystem.parentid`)===channel.id)client.setups.set(channel.guild.id, "", `ticketsystem.parentid`);}catch{}
        try{if(client.setups.get(channel.guild.id, `ticketsystem.channelid`)===channel.id)client.setups.set(channel.guild.id, "", `ticketsystem.channelid`);}catch{}
        try{if(client.setups.get(channel.guild.id, `counter.channel`)===channel.id)client.setups.set(channel.guild.id, "", `counter.channel`);}catch{}
        try{client.setups.remove(channel.guild.id, channel.id, `jointocreate.channels`);}catch{}
    });
    //When a Role got deleted, try to remove it from the DJROLES
    client.on("roleDelete", function (role) {   
        try{client.settings.remove(role.guild.id, role.id, `djroles`);}catch{}
        try{if(client.apply.get(role.guild.id, `TEMP_ROLE`)===role.id)client.setups.set(channel.guild.id, "", `TEMP_ROLE`);}catch{}
        try{client.settings.remove(role.guild.id, role.id, `welcome.roles`);}catch{}
        try{client.setups.remove(channel.guild.id, channel.id, `ticketsystem.adminroles`);}catch{}
    });
    client.on("message", async message => {
        if(!message.guild) return;
        if(message.author.bot) return;
        client.custom.ensure(message.guild.id, {
            playlists: [],
        });
        client.custom2.ensure(message.author.id, {
            myplaylists: [],
        });
        client.infos.ensure("global", {
            cmds: 0,
            songs: 0,
            filters: 0,
        })
        client.settings.ensure(message.guild.id, {
            prefix: config.prefix,
            djroles: [],
            playingembed: "",
            playingchannel: "",
            botchannel: [],
        });
        client.custom2.ensure(message.author.id, {
            myplaylists: [],
        });
        client.setups.ensure(message.guild.id, {
            ranking: {
                enabled: true,
                backgroundimage: "null",
            },
            logger: {
                enabled: false,
                channel: "",
            },
            welcome: {
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
            },
            leave: {
                enabled: false,
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
            },
            membercount: {
                enabled: false,
                channel: "",
                tempnum: 0,
                message: "🗣 All Members: {member}"
            },
            aichatsystem: {
                enabled: false,
                channel: "",
            },
            ticketsystem: {
                enabled: false,
                guildid: message.guild.id,
                messageid: "",
                channelid: "",
                parentid: "",
                message: "Hey {user}, thanks for opening an ticket! Someone will help you soon!",
                adminroles: []
            },
            jointocreate: {
                enabled: false,
                channels: [],
                tempchannels: [],
            },
            counter: {
                enabled: false,
                channel: "",
                number: 0,
                author: client.user.id
            }
        });
        client.reactionrole.ensure(message.guild.id, 
            {
               reactionroles: [
                   /*
                   {
                      MESSAGE_ID: "",
                      remove_others: false,
                      Parameters: [ 
                          { Emoji: "", Role: "",Roles: ["799066077526491186"] }, 
                      ]
                      
                    },
                    */
              ]
            }
        );
        client.apply.ensure(message.guild.id, {
            "channel_id": "",
            "f_channel_id": "", //changequestions --> which one (lists everyone with index) --> 4. --> Question
            "QUESTIONS": [{"1":"DEFAULT"}],
            "TEMP_ROLE": "",   
            "accept": "You've got accepted!",
            "deny": "You've got denied!"
           })
        
    });
    const { MessageEmbed } = require("discord.js");
    const { stripIndents } = require("common-tags");
    function getAll(client, guild) {    
        const embed = new MessageEmbed()
            .setColor(config.colors.yes)
            .setTitle('Help Menu - THANKS FOR INVITING ME!')
                .addField("**__BOT BY:__**", `
                >>> <@442355791412854784> \`Tomato#6966\` [\`Website\`](https://musicium.eu) [\`INVITE\`](https://discord.com/oauth2/authorize?client_id=789845410998779904&permissions=8&scope=bot%20applications.commands)
                `)
                    .addField("**__Music - Supported sources__**", `
                >>> \`Youtube\`, \`Soundcloud\`, [\`More\`](https://links.musicium.eu), ...
                `)
            .setFooter("To see command descriptions and usage type   ,help [CMD Name]", client.user.displayAvatarURL())
            
            const commands = (category) => {
                return client.commands
                    .filter(cmd => cmd.category === category)
                    .map(cmd => `\`${cmd.name}\``)
                    .join(", ");
            }
        
            const info = client.categories
                .map(cat => stripIndents`**__${cat[0].toUpperCase() + cat.slice(1)}__** \n> ${commands(cat)}`)
                .reduce((string, category) => string + "\n\n" + category);
        let channel = guild.channels.cache.find(
            channel =>
              channel.type === "text" &&
              channel.permissionsFor(guild.me).has("SEND_MESSAGES")
          );
         channel.send(embed.setDescription(info.substr(0,1950) + `\`... to see all other cmds type: \`${config.prefix}help\``));
         channel.send("**TUTORIAL VIDEO:**\nhttps://youtu.be/DpWLmoLd84Y")
        }
    client.on('voiceStateUpdate', (oldState,newState) => {
        if(newState.id === client.user.id && oldState.serverDeaf === true && newState.serverDeaf === false)
            {
                try{
                    const channel = newState.member.guild.channels.cache.find(
                        channel =>
                          channel.type === "text" &&
                          ( channel.name.includes("cmd") ||channel.name.includes("command") ||  channel.name.includes("bot") ) &&
                          channel.permissionsFor(newState.member.guild.me).has("SEND_MESSAGES")
                      );
                      channel.send("Don't unmute me!, i muted my self again! This safes Data so it gives you a faster and smoother experience")
                      let queue = client.distube.getQueue(newState.member.guild.id);
                      if(!queue) return console.log("NO QUEUE");
                      queue.connection.voice.setDeaf(true);
                }catch (error) {
                    try{
                        console.log(error)
                        const channel = newState.member.guild.channels.cache.find(
                            channel =>
                              channel.type === "text" &&
                              channel.permissionsFor(newState.member.guild.me).has("SEND_MESSAGES")
                          );
                          channel.send("Don't unmute me!, i muted my self again! This safes Data so it gives you a faster and smoother experience")
                          let queue = client.distube.getQueue(newState.member.guild.id);
                          if(!queue) return console.log("NO QUEUE");
                          queue.connection.voice.setDeaf(true);
                    }catch (error) {
                        console.log(error)
                    }
                }
                
        }
       
    });
    // Requires Manager from discord-giveaways
    const { GiveawaysManager } = require('discord-giveaways');
    // Starts updating currents giveaways
    const manager = new GiveawaysManager(client, {
        storage: './giveaways.json',
        updateCountdownEvery: 10000,
        hasGuildMembersIntent: false,
        default: {
            botsCanWin: false,
            exemptPermissions: ['MANAGE_MESSAGES', 'ADMINISTRATOR'],
            embedColor: config.colors.yes,
            reaction: '🎉',
            messages: {
                giveaway: '🎉🎉 **GIVEAWAY** 🎉🎉',
                giveawayEnded: '🎉🎉 **GIVEAWAY ENDED** 🎉🎉',
                timeRemaining: 'Time remaining: **{duration}**!',
                inviteToParticipate: 'React with 🎉 to participate!',
                winMessage: 'Congratulations, {winners}! You won **{prize}**!\n{messageURL}',
                embedFooter: 'Giveaways',
                noWinner: 'Giveaway cancelled, no valid participations.',
                hostedBy: 'Hosted by: {user}',
                winners: 'winner(s)',
                endedAt: 'Ended at',
                units: {
                    seconds: 'Seconds',
                    minutes: 'Minutes',
                    hours: 'Hours',
                    days: 'Days',
                    pluralS: false // Not needed, because units end with a S so it will automatically removed if the unit value is lower than 2
                }
            }
        }
    });
    // We now have a giveawaysManager property to access the manager everywhere!
    client.giveawaysManager = manager;

    console.log("Setups Loaded".brightGreen)
}
