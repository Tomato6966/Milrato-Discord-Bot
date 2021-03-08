const Discord = require("discord.js");
const config = require("../../config.json")
const ms = require("ms");
const { all } = require("../../modules/logger");
module.exports = {
    name: "giveaway",
    aliases: ["g"],
    category: "⛔️ Moderation Commands",
    description: "Giveaway manager",
    usage: "giveaway <start/end/reroll/edit/delete/list>",
    run: async (client, message, args) => {
        if (!message.member.hasPermission(["ADMINISTRATOR"])) return message.reply(`**${message.author.username}**, you dont have the missing permissions!`)

        if (!args[0]) return message.reply(new Discord.MessageEmbed()
            .setColor("RED")
            .setTitle("PLEASE USE A VALID PARAMETER!")
            .setDescription("`//giveaway start <#channel> <Time> <Winners> <PRIZE>` -- *starts a giveaway*\n`//giveaway end <Giveaway_Id>` -- *Ends a Giveaway*\n`//giveaway edit <Giveaway_Id> <PRIZE>` -- *Edits a Giveaway's Prize*\n`//giveaway reroll <Giveaway_Id>` -- *Rerolls an ended Giveaway*\n`//giveaway list <server/all>` -- *Lists all global / Server based Giveaways*\n")
        ).catch(e => console.log(e.stack.toString().red))
        if (args[0].toLowerCase() === "start") {
            args.shift();
            let giveawayChannel = message.mentions.channels.first();
            if (!giveawayChannel) {
                return message.channel.send(':x: You have to mention a valid channel! Usage: `//giveaway start <#Channel> <TIME e.g: 10s> <WINNERSAMOUNT> <PRIZE>`');
            }
            let giveawayDuration = args[1];
            if (!giveawayDuration || isNaN(ms(giveawayDuration))) {
                return message.channel.send(':x: You have to specify a valid duration! Usage: `//giveaway start <#Channel> <TIME e.g: 10s> <WINNERSAMOUNT> <PRIZE>`');
            }
            let giveawayNumberWinners = args[2];
            if (isNaN(giveawayNumberWinners) || (parseInt(giveawayNumberWinners) <= 0)) {
                return message.channel.send(':x: You have to specify a valid number of winners! Usage: `//giveaway start <#Channel> <TIME e.g: 10s> <WINNERSAMOUNT> <PRIZE>`');
            }
            let giveawayPrize = args.slice(3).join(' ');
            if (!giveawayPrize) {
                return message.channel.send(':x: You have to specify a valid prize! Usage: `//giveaway start <#Channel> <TIME e.g: 10s> <WINNERSAMOUNT> <PRIZE>`');
            }
            client.giveawaysManager.start(giveawayChannel, {
                time: ms(giveawayDuration),
                prize: giveawayPrize,
                winnerCount: giveawayNumberWinners,
                hostedBy: message.author,
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
            });

            message.channel.send(`Giveaway started in ${giveawayChannel}!`);
            // And the giveaway has started!
        } else if (args[0].toLowerCase() === "end") {
            args.shift();
            if (!args[0]) {
                return message.channel.send(':x: You have to specify a valid message ID! Usage: `//giveaway end <ID>`');
            }
             let giveaway =client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
                 client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

             if (!giveaway) {
                return message.channel.send('Unable to find a giveaway for `' + args.join(' ') + '`.');
            }

            client.giveawaysManager.edit(giveaway.messageID, {
                    setEndTimestamp: Date.now()
                })
                .then(() => {
                     message.channel.send('Giveaway will end in less than ' + (client.giveawaysManager.options.updateCountdownEvery / 1000) + ' seconds...');
                })
                .catch((e) => {
                    if (e.startsWith(`Giveaway with message ID ${giveaway.messageID} is already ended.`)) {
                        message.channel.send('This giveaway is already ended!');
                    } else {
                        console.error(e);
                        message.channel.send('An error occured...');
                    }
                });
        } else if (args[0].toLowerCase() === "reroll") {
            args.shift();
            if (!args[0]) {
                return message.channel.send(':x: You have to specify a valid message ID! Usage: `//giveaway edit <ID>`');
            }
            let giveaway =
                client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
                client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);
            if (!giveaway) {
                return message.channel.send('Unable to find a giveaway for `' + args.join(' ') + '`.');
            }
            client.giveawaysManager.reroll(giveaway.messageID)
                .then(() => {
                      message.channel.send('Giveaway rerolled!');
                })
                .catch((e) => {
                    if (e.startsWith(`Giveaway with message ID ${giveaway.messageID} is not ended.`)) {
                        message.channel.send('This giveaway is not ended!');
                    } else {
                        console.error(e);
                        message.channel.send('An error occured...');
                    }
                });


        } else if (args[0].toLowerCase() === "edit") {
            args.shift();
            let messageID = args[0];
            if (!messageID) {
                return message.channel.send(':x: You have to specify a valid messageID! Usage: `//giveaway edit <ID> <PRIZE>`');
            }
            let giveawayPrize = args.slice(1).join(' ');
            if (!giveawayPrize) {
                return message.channel.send(':x: You have to specify a valid prize! Usage: `//giveaway edit <ID> <PRIZE>`');
            }
            client.giveawaysManager.edit(messageID, {
                newWinnerCount: 3,
                newPrize: giveawayPrize,
                addTime: 5000
            }).then(() => {
                // here, we can calculate the time after which we are sure that the lib will update the giveaway
                const numberOfSecondsMax = client.giveawaysManager.options.updateCountdownEvery / 1000;
                message.channel.send('Success! Giveaway will updated in less than ' + numberOfSecondsMax + ' seconds.');
            }).catch((err) => {
                message.channel.send('No giveaway found for ' + messageID + ', please check and try again');
            });
        } else if (args[0].toLowerCase() === "delete") {
            args.shift();
            let messageID = args[0];
            if (!messageID) {
                return message.channel.send(':x: You have to specify a valid messageID! Usage: `//giveaway delete <ID>`');
            }
            client.giveawaysManager.delete(messageID).then(() => {
                message.channel.send('Success! Giveaway deleted!');
            })
            .catch((err) => {
                message.channel.send('No giveaway found for ' + messageID + ', please check and try again');
            });
        } else if (args[0].toLowerCase() === "list") {
            args.shift();
            if(!args[0]) return message.reply("You did not enter a valid Parameter! Usage: `//giveaway list <all/server>`")
            if(args[0].toLowerCase()==="server"){
                let onServer = client.giveawaysManager.giveaways.filter((g) => g.guildID === message.guild.id && !g.ended);
                let embed = new Discord.MessageEmbed().setColor(config.colors.yes).setTitle("All not ended Giveaways!")
                buffer = "";
                for(let i = 0; i < onServer.length; i++){
                    let invite = await client.guilds.cache.get(onServer[i].guildID).channels.cache.first().createInvite();
                    let CH = await client.guilds.cache.get(onServer.guildID).messages.fetch(onServer.messageID);
                    buffer += `**>>** Prize: \`${onServer[i].prize}\` | Duration: \`${ms(new Date() - onServer[0].startAt)}\`\n | [\`JUMP TO IT\`](https://discord.com/channels/${onServer.guildID}/${onServer.channelID}/${onServer.messageID})\n`
                }
                embed.setDescription(buffer ? buffer : "No Giveaways")
                message.channel.send(embed)
            }
            else{
                let allGiveaways = client.giveawaysManager.giveaways.filter((g) => !g.ended); // [ {Giveaway}, {Giveaway} ]

                let embed = new Discord.MessageEmbed().setColor(config.colors.yes).setTitle("All GLOBALLY not ended Giveaways!")
                buffer = "";
                for(let i = 0; i < allGiveaways.length; i++){
                    let invite = await client.guilds.cache.get(allGiveaways[i].guildID).channels.cache.first().createInvite();
                    buffer += `**>>** Guild: [\`${client.guilds.cache.get(allGiveaways[i].guildID).name}\`](${invite}) | Prize: \`${allGiveaways[i].prize}\` | Duration: \`${ms(new Date() - allGiveaways[i].startAt)}\` | [\`JUMP TO IT\`](https://discord.com/channels/${allGiveaways[i].guildID}/${allGiveaways[i].channelID}/${allGiveaways[i].messageID})\n`
                }
                embed.setDescription(buffer ? buffer : "No Giveaways")
                message.channel.send(embed)
            }

        } else return message.reply(new Discord.MessageEmbed()
            .setColor("RED")
            .setTitle("PLEASE USE A VALID PARAMETER!")
            .setDescription("`//giveaway start <#channel> <Time> <Winners> <PRIZE>` -- *starts a giveaway*\n`//giveaway end <Giveaway_Id>` -- *Ends a Giveaway*\n`//giveaway edit <Giveaway_Id> <PRIZE>` -- *Edits a Giveaway's Prize*\n`//giveaway reroll <Giveaway_Id>` -- *Rerolls an ended Giveaway*\n`//giveaway list <server/all>` -- *Lists all global / Server based Giveaways*\n")
        ).catch(e => console.log(e.stack.toString().red))
    }
}

function delay(delayInms) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(2);
        }, delayInms);
    });
}