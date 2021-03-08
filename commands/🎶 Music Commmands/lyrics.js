const { KSoftClient } = require('@ksoft/api');
const config = require("../../config.json")
const ksoft = new KSoftClient(config.ksoftapi);
const functions = require("../../functions")
module.exports = {
    name: "lyrics",
    cooldown: 5, 
    category: "🎶 Music Commmands",
    aliases: ["ly","songtext"],
    useage: "lyrics",
  description: "Shows you the Lyrics for the CURRENT playing song, ..",
  run: async (client, message, args) => {
  
       if (!client.distube.isPlaying(message)) return functions.embedbuilder(client, 3000, message, config.colors.no, "Nothing playing!")
    if (!message.member.voice.channel) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`"  + " You must join a Voice Channel")
     if (client.distube.isPlaying(message) && message.member.voice.channel.id !== message.member.guild.me.voice.channel.id) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`"  + " You must join my Voice Channel: " + ` \`${message.member.guild.me.voice.channel.name ? message.member.guild.me.voice.channel.name : ""}\``)
          

    let queue = client.distube.getQueue(message);

    if (!queue) return functions.embedbuilder(client, "null", message, config.colors.no, "There is nothing playing!");

    let cursong = queue.songs[0];
    functions.embedbuilder(client, 3000, message, config.colors.yes, "Searching!", cursong.name);
    let lyrics;
     
    await ksoft.lyrics.get(cursong.name).then(
            async track =>{
                console.log(track)
                if(!track.lyrics) return message.reply("NO LYRICS FOUND!");
                lyrics = track.lyrics;
                
                await lyricsss(client, message, lyrics, cursong)
            });
    
 
    async function lyricsss(client, message, lyrics, cursong){
        let currentPage = 0;
        const embeds = functions.lyricsEmbed(client, message, lyrics, cursong);

        const queueEmbed = await message.channel.send(
            `**Current Page - ${currentPage + 1}/${embeds.length}**`,
            embeds[currentPage]
        );

        try {
            await queueEmbed.react("⬅️");
            await queueEmbed.react("⏹");
            await queueEmbed.react("➡️");
        } catch (error) {
            console.error(error);
            functions.embedbuilder(client, 5000, message, config.colors.no, "ERROR: ", "```" + error.toString().substr(0, 100) + "```" + "\n\n**Error got sent to my owner!**")
            functions.errorbuilder(error.stack.toString().substr(0, 2000))
        }

        const filter = (reaction, user) =>
            ["⬅️", "⏹", "➡️"].includes(reaction.emoji.id) && message.author.id === user.id;
        const collector = queueEmbed.createReactionCollector(filter, { time: 60000 });

        collector.on("collect", async (reaction, user) => {
            try {
                if (reaction.emoji.id === "⏹") {
                    if (currentPage < embeds.length - 1) {
                        currentPage++;
                        queueEmbed.edit(`**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds[currentPage]);
                    }
                } else if (reaction.emoji.id === "➡️") {
                    if (currentPage !== 0) {
                        --currentPage;
                        queueEmbed.edit(`**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds[currentPage]);
                    }
                } else {
                    collector.stop();
                    reaction.message.reactions.removeAll();
                }
                await reaction.users.remove(message.author.id);
            } catch (error) {
                console.error(error);
                functions.embedbuilder(client, 5000, message, config.colors.no, "ERROR: ", "```" + error.toString().substr(0, 100) + "```" + "\n\n**Error got sent to my owner!**")
                functions.errorbuilder(error.stack.toString().substr(0, 2000))
            }
        });

    }
  }
  };