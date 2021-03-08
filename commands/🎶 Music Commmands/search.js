const functions = require("../../functions")
const config = require("../../config.json")
module.exports = {
    name: "search",
    category: "🎶 Music Commmands",
    cooldown: 5, 
    useage: "search <URL/NAME>",
  description: "Searches for 10 results, in youtube",
  run: async (client, message, args) => {
    if (!message.member.voice.channel) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`"  + " You must join a Voice Channel")
    if(!args[0]) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`"  + " Please add something you wanna search to")
    if (client.distube.isPlaying(message) && message.member.voice.channel.id !== message.member.guild.me.voice.channel.id) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`"  + " You must join my Voice Channel: " + ` \`${message.member.guild.me.voice.channel.name ? message.member.guild.me.voice.channel.name : ""}\``)
          
    functions.embedbuilder(client, 3000, message, config.colors.yes, "<:youtube:769675858431705109> Searching!", args.join(" "))
    
    let result = await client.distube.search(args.join(" "));
    let searchresult = "";
    
    for (let i = 0; i < 10; i++) {

        console.log(result[i].url);
        
        try {
            searchresult += await `**${i+1}**. [${result[i].name}](${result[i].url}) - \`${result[i].formattedDuration}\`\n`;
        } catch {
            searchresult += await " ";
        }
    }
    await functions.embedbuilder(client, "null", message, config.colors.yes, "<:youtube:769675858431705109> Search Results:", searchresult)

    let userinput;
    await message.channel.awaitMessages(m => m.author.id == message.author.id, { max: 1, time: 60000, errors: ["time"], }).then(collected => {
        userinput = collected.first().content;
        if (Number(userinput) <= 0 && Number(userinput) > 10) {
            functions.embedbuilder(client, "null", message, config.colors.no, "Not a right number!", "so i use number 1!")
            userinput = 1;
        }
    }).catch(() => { console.error; userinput = 404 });
    if (userinput === 404) {
        return functions.embedbuilder(client, "null", message, config.colors.no, "Something went wrong!")
    }
    functions.embedbuilder(client, 10000, message, config.colors.yes, "<:youtube:769675858431705109> Searching!", `[${result[userinput - 1].name}](${result[userinput - 1].url})`, result[userinput - 1].thumbnail)
    return client.distube.play(message, result[userinput - 1].url)
  }
  };