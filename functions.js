const Discord = require("discord.js")
const config = require("./config.json")
const functions = require("./functions2")
module.exports = {
    getMember: function(message, toFind = '') {
        toFind = toFind.toLowerCase();
        let target = message.guild.members.get(toFind);
        if (!target && message.mentions.members)
            target = message.mentions.members.first();
        if (!target && toFind) {
            target = message.guild.members.find(member => {
                return member.displayName.toLowerCase().includes(toFind) ||
                member.user.tag.toLowerCase().includes(toFind)
            });
        }
        if (!target) 
            target = message.member;
        return target;
    },
    formatDate: function(date) {
        return new Intl.DateTimeFormat('en-US').format(date)
    },
    promptMessage: async function (message, author, time, validReactions) {
        time *= 1000;
        for (const reaction of validReactions) await message.react(reaction);
        const filter = (reaction, user) => validReactions.includes(reaction.emoji.name) && user.id === author.id;
        return message
            .awaitReactions(filter, { max: 1, time: time})
            .then(collected => collected.first() && collected.first().emoji.name);
    },
    embedbuilder: function (client, deletetime, message, color, title, description, thumbnail) {
        try{
            if(title.includes("filter") && title.includes("Adding")){ 
                client.infos.set("global", Number(client.infos.get("global", "filters")) + 1, "filters");
            }
        }catch{}
        try {
            let embed = new Discord.MessageEmbed()
                .setColor(color)
                .setAuthor(message.author.tag , message.member.user.displayAvatarURL({ dynamic: true }), "https://dc.musicium.eu")
                .setFooter(client.user.username, config.AVATARURL);
            if (title) embed.setTitle(title);
            if (description) embed.setDescription(description);
            if (thumbnail) embed.setThumbnail(thumbnail)
            if (!deletetime || deletetime === undefined || deletetime === "null") {
                 message.channel.send(embed) 
                 .then(msg => {
                     try{
                         if(msg.channel.type === "news")
                         msg.crosspost()
                    } catch (error) {
                        console.log(error.stack.toString().red)
                        errorbuilder(error.stack.toString().substr(0, 2000))
                    }
                 })
                 return;}
            return message.channel.send(embed).then(msg => msg.delete({ timeout: deletetime }));
        } catch (error) {
            console.log(error.stack.toString().red)
            functions.embedbuilder(client,5000, message, "RED", "ERROR: ", "```" + error.toString().substr(0, 100) + "```" + "\n\n**Error got sent to my owner!**")
            functions.errorbuilder(error.stack.toString().substr(0, 2000))
        }
    },
    errorbuilder: function (error) {
            console.log(error.stack.toString().red)
    },
    QueueEmbed: function(client, queue) {
        try {
            let embeds = [];
            let k = 10;
            //defining each Pages
            for (let i = 0; i < queue.length; i += 10) {
                const current = queue.slice(i, k)
                let j = i;
                k += 10;
                const info = current.map((track) => `**${++j} -** [\`${track.name}\`](${track.url})`).join("\n")
                const embed = new Discord.MessageEmbed()
                    .setTitle("Server Queue")
                    .setColor(config.colors.yes)
                    .setDescription(`**Current Song - [\`${queue[0].name}\`](${queue[0].url})**\n\n${info}`)
                    .setFooter(client.user.username, client.user.displayAvatarURL())
                embeds.push(embed);
            }
            //returning the Embed
            return embeds;
        } catch (error) {
            console.log(error.stack.toString().red)
            functions.errorbuilder(error.stack.toString().substr(0, 2000))
        }
    },
    customplaylistembed: function(client, message, lyrics, song) {
        if(!lyrics) lyrics = "No Songs in the playlist!";
        try {
            let embeds = [];
            let k = 1000;
            for (let i = 0; i < lyrics.length; i += 1000) {
                const current = lyrics.slice(i, k);
                k += 1000;
                const embed = new Discord.MessageEmbed()
                    .setTitle("Custom Playlist")
                    .setColor(config.colors.yes)
                    .setDescription(current)
                embeds.push(embed);
            }
            return embeds;
        } catch (error) {
            console.log(error.stack.toString().red)
            functions.embedbuilder(client, 5000, message, "RED", "ERROR: ", "```" + error.toString().substr(0, 100) + "```" + "\n\n**Error got sent to my owner!**")
            functions.errorbuilder(error.stack.toString().substr(0, 2000))
        }
    },
    lyricsEmbed: function(client, message, lyrics, song) {
        try {
            let embeds = [];
            let k = 1000;
            for (let i = 0; i < lyrics.length; i += 1000) {
                const current = lyrics.slice(i, k);
                k += 1000;
                const embed = new Discord.MessageEmbed()
                    .setTitle("Lyrics - " + song.name)
                    .setURL(song.url)
                    .setThumbnail(song.thumbnail)
                    .setColor(config.colors.yes)
                    .setDescription(current)
                embeds.push(embed);
            }
            return embeds;
        } catch (error) {
            console.log(error.stack.toString().red)
            functions.embedbuilder(client, 5000, message, "RED", "ERROR: ", "```" + error.toString().substr(0, 100) + "```" + "\n\n**Error got sent to my owner!**")
            functions.errorbuilder(error.stack.toString().substr(0, 2000))
        }
    },
    playsongyes: async function(client, message, queue, song) {
        try {
            let djs = "";
            if(client.settings.get(message.guild.id, `djroles`).join("") === "") djs = "not setup"
            else
            for(let i = 0; i < client.settings.get(message.guild.id, `djroles`).length; i++){
                djs += "<@&" + client.settings.get(message.guild.id, `djroles`)[i] + "> | "
            }

            let embed1 = new Discord.MessageEmbed()
    
            .setColor(config.colors.yes)
            .setTitle("<:playing:805381169922310184> Playing Song!")
            .setDescription(`Song: [\`${song.name}\`](${song.url})`)
            .addField("💡 Requested by:", `>>> ${song.user}`, true)
            .addField("⏱ Duration:", `>>> \`${queue.formattedCurrentTime} / ${song.formattedDuration}\``, true)
            .addField("🌀 Queue:", `>>> \`${queue.songs.length} song(s) - ${queue.formattedDuration}\``, true)
            .addField("🔊 Volume:", `>>> \`${queue.volume} %\``, true)
            .addField("♾ Loop:", `>>> ${queue.repeatMode ? queue.repeatMode === 2 ? "<:YES:805375191739662366> Queue" : "<:YES:805375191739662366> Song" : "<:NO:805375191819616266>"}`, true)
            .addField("↪️ Autoplay:", `>>> ${queue.autoplay ? "<:YES:805375191739662366>" : "<:NO:805375191819616266>"}`, true)
            .addField("❔ Filter:", `>>> \`${queue.filter || "<:NO:805375191819616266>"}\``, true)
            .addField("🎧 DJ-Role:", `>>> ${djs}`, true)
            .setFooter(client.user.username, client.user.displayAvatarURL())
            .setAuthor(message.author.tag , message.member.user.displayAvatarURL({ dynamic: true }), "https://dc.musicium.eu")
            .setThumbnail(song.thumbnail)
    
            var playingMessage = await message.channel.send(embed1)
    
            client.settings.set(message.guild.id, playingMessage.id, "playingembed")
            client.settings.set(message.guild.id, message.channel.id, "playingchannel")
    
                try {
                    await playingMessage.react("805375191635066880");
                    await playingMessage.react("805375191638081588");
                    await playingMessage.react("805375191487873024");
                    await playingMessage.react("805375191697719306");
                    await playingMessage.react("805375191462707230");
                    await playingMessage.react("805375191307649055");
                }
                catch (error) {
                    functions.embedbuilder(client,5000, message, config.colors.no, "ERROR: ", "```" + error.toString().substr(0, 100) + "```" + "\n\n**Error got sent to my owner!**")
                    functions. errorbuilder(error.stack.toString().substr(0, 2000))
                    console.log(error.stack.toString().red);
                }
            const filter = (reaction, user) =>
                ["805375191635066880", "805375191638081588", "805375191487873024", "805375191697719306", "805375191462707230", "805375191307649055"].includes(reaction.emoji.id) && user.id !== message.client.user.id;
    
            var collector = await playingMessage.createReactionCollector(filter, {
                time: song.duration > 0 ? song.duration * 1000 : 600000
            });
            collector.on("collect", async (reaction, user) => {
                if (!queue) return;
                const member = reaction.message.guild.member(user);
                reaction.users.remove(user);
                if (!member.voice.channel) return embedbuilder(client,5000, message, config.colors.no, "`" + message.author.tag + "`"  + " You must join a Voice Channel")
                if (member.voice.channel.id !== member.guild.me.voice.channel.id) return embedbuilder(client,5000, message, config.colors.no, "`" + message.author.tag + "`"  + " You must join my Voice Channel")
    
                let djrolefromenmap = reaction.message.guild.roles.cache.get(client.settings.get(reaction.message.guild.id, `djrole`))
                if (!member.hasPermission("ADMINISTRATOR") && djrolefromenmap && !member.roles.cache.has(djrolefromenmap.id)) return embedbuilder(client,5000, reaction.message, config.colors.no, "DJ-ROLE", `<:NO:805375191819616266> You don\'t have permission for this Command! You need to have: ${djrolefromenmap}`)
    
                switch (reaction.emoji.id) {
                    case "805375191635066880":
                        client.distube.skip(message);
                        functions.embedbuilder(client,3000, message, config.colors.yes, "SKIPPED!", `Skipped the song`)
                        try{
                            playingMessage.reactions.removeAll();
                        }catch{
                        }
                        
                        try{
                            playingMessage.delete({ timeout: client.ws.ping });
                        }catch{
                        }
                        break;
    
                    case "805375191638081588":
                        client.distube.stop(message);
                        try{
                            playingMessage.reactions.removeAll();
                        }catch{
                        }
                        try{
                            playingMessage.delete({ timeout: client.ws.ping });
                        }catch{
                        }
                        functions.embedbuilder(client,3000, message, config.colors.no, "STOPPED!", `Left the channel`)
                        break;
    
                    case "805375191487873024":
                        await client.distube.setVolume(message, Number(queue.volume) - 10);
                        functions.embedbuilder(client,3000, message, config.colors.yes, "Volume!", `Reduced the Volume to \`${queue.volume}\``)
                        break;
    
                    case "805375191697719306":
                        await client.distube.setVolume(message, Number(queue.volume) + 10);
                        functions.embedbuilder(client,3000, message, config.colors.yes, "Volume!", `Raised the Volume to \`${queue.volume}\``)
                        break;
    
                    case "805375191462707230":
                        let seektime = queue.currentTime - 10000;
                        if (seektime < 0) seektime = 0;
                        await client.distube.seek(message, Number(seektime));
                        
                        functions.embedbuilder(client,3000, message, config.colors.yes, "Seeked!", `Seeked the song for \`-10 seconds\``)
                        break;
    
                    case "805375191307649055":
                        let seektime2 = queue.currentTime + 10000;
                        if (seektime2 >= queue.songs[0].duration * 1000) { seektime2 = queue.songs[0].duration * 1000 - 1; }
                        await client.distube.seek(message, seektime2);
                        
                        functions.embedbuilder(client,3000, message, config.colors.yes, "Seeked!", `Seeked the song for \`+10 seconds\``)
                        break;
                    default:
                        break;
                }
            });
            collector.on("end", () => {
                try{
                    playingMessage.reactions.removeAll();
                }catch{
                }
                try{
                    playingMessage.delete({ timeout: client.ws.ping });
                }catch{
                }
                
            })
        } catch (error) {
            console.log(error.stack.toString().red)
            functions.embedbuilder(client,5000, message, config.colors.no, "ERROR: ", "```" + error.toString().substr(0, 100) + "```" + "\n\n**Error got sent to my owner!**")
            functions.errorbuilder(error.stack.toString().substr(0, 2000))
        }
    },
    curembed: function (client, message) {
        try {
            let djs = "";
            if(client.settings.get(message.guild.id, `djroles`).join("") === "") djs = "not setup"
            else
            for(let i = 0; i < client.settings.get(message.guild.id, `djroles`).length; i++){
                djs += "<@&" + client.settings.get(message.guild.id, `djroles`)[i] + "> | "
            }

            let queue = client.distube.getQueue(message); //get the current queue
            let song = queue.songs[0];
            embed = new Discord.MessageEmbed()
                .setColor(config.colors.yes)
                .setTitle("<:playing:805381169922310184> Playing Song:")
                .setDescription(`> [\`${song.name}\`](${song.url})`)
                .addField("💡 Requested by:", `>>> ${song.user}`, true)
                .addField("⏱ Duration:", `>>> \`${queue.formattedCurrentTime} / ${song.formattedDuration}\``, true)
                .addField("🌀 Queue:", `>>> \`${queue.songs.length} song(s) - ${queue.formattedDuration}\``, true)
                .addField("🔊 Volume:", `>>> \`${queue.volume} %\``, true)
                .addField("♾ Loop:", `>>> ${queue.repeatMode ? queue.repeatMode === 2 ? "<:YES:805375191739662366> Queue" : "<:YES:805375191739662366> Song" : "<:NO:805375191819616266>"}`, true)
                .addField("↪️ Autoplay:", `>>> ${queue.autoplay ? "<:YES:805375191739662366>" : "<:NO:805375191819616266>"}`, true)
                .addField("❔ Filter:", `>>> \`${queue.filter || "<:NO:805375191819616266>"}\``, true)
                .addField("🎧 DJ-Role:", `>>> ${djs}`, true)
                .setFooter(client.user.username, client.user.displayAvatarURL())
                .setAuthor(message.author.tag , message.member.user.displayAvatarURL({ dynamic: true }), "https://dc.musicium.eu")
                .setThumbnail(song.thumbnail)
            return embed; //sending the new embed back
        } catch (error) {
            console.log(error.stack.toString().red)
            functions.embedbuilder(5000, message, config.colors.no, "ERROR: ", "```" + error.toString().substr(0, 100) + "```" + "\n\n**Error got sent to my owner!**")
            functions.errorbuilder(error.stack.toString().substr(0, 2000))
        }
    },
    HelpEmbed: function(client, message) {
        try {
            const commands = (category) => {
                return client.commands
                    .filter(cmd => cmd.category.toLowerCase() === category.toLowerCase())
                    .map(cmd => `\`${cmd.name}\``)
                    .join(", ");
            }
            let prefix = client.settings.get(message.guild.id, `prefix`);
            if (prefix === null) prefix = config.prefix;           //if not prefix set it to standard prefix in the config.json file
        
            let embeds = [];
            let k = 10;
            //defining each Pages
            for (let i = 0; i < client.categories.length; i += 1) {
                const current = client.categories[i]
                const info = commands(current);
                const embed = new Discord.MessageEmbed()
                    .setColor(config.colors.yes)
                    .setDescription(`> ${info}`)
                    .setTitle(`***__${current.toUpperCase()}__***`)
                    .setFooter(client.user.username + ` ・ Current Page - ${i+1} / ${client.categories.length}`, config.AVATARURL)
                embeds.push(embed);
            }
            //returning the Embed
            return embeds;
        } catch (error) {
            console.log(error.stack.toString().red)
            functions.errorbuilder(error.stack.toString().substr(0, 2000))
        }
    },
    delay: function (delayInms) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(2);
            }, delayInms);
        });
    },
    getRandomInt: function (max) {
        return Math.floor(Math.random() * Math.floor(max));
    } 
};