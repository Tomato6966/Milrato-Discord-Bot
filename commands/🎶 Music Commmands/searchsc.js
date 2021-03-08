const functions = require("../../functions")
const scdl = require("soundcloud-downloader").default;
const config = require("../../config.json")
module.exports = {
    name: "searchsc",
    category: "🎶 Music Commmands",
    useage: "searchsc <URL/NAME>",
    cooldown: 5, 
  description: "Searches for 15 results in SOUNDCLOUD",
  run: async (client, message, args) => {
    if (!message.member.voice.channel) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`"  + " You must join a Voice Channel")
    if(!args[0]) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`"  + " Please add something you wanna search to")
    if (client.distube.isPlaying(message) && message.member.voice.channel.id !== message.member.guild.me.voice.channel.id) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`"  + " You must join my Voice Channel: " + ` \`${message.member.guild.me.voice.channel.name ? message.member.guild.me.voice.channel.name : ""}\``)
          
    functions.embedbuilder(client, 3000, message, config.colors.yes, "<:soundcloud:792137871662252103> Searching!", args.join(" "))
    //sc key NpVHurnc1OKS80l6zlXrEVN4VEXrbZG4    
    scdl.search('tracks', args.join(" "))
    .then(async results => {
        let searchresult = "";
    
    for (let i = 0; i < results.collection.length; i++) {

        console.log(results.collection[i].url);
        
        try {
            let mins = Math.floor((results.collection[i].full_duration/1000)/60);
            let secs = Math.floor((results.collection[i].full_duration/1000)%60);
            if(mins < 10) mins = "0" + mins;
            if(secs < 10) secs = "0" + secs;
            let durr = mins + ":" + secs;
            searchresult += await `**${i+1}**. [${results.collection[i].permalink}](${results.collection[i].permalink_url}) - \`${durr}\`\n`;
        } catch {
            searchresult += await " ";
        }
    }
    await functions.embedbuilder(client, "null", message, config.colors.yes, "<:soundcloud:792137871662252103> Search Results:", searchresult)

    let userinput;
    await message.channel.awaitMessages(m => m.author.id == message.author.id, { max: 1, time: 60000, errors: ["time"], }).then(collected => {
        userinput = collected.first().content;
        if (Number(userinput) <= 0 && Number(userinput) > 15) {
            functions.embedbuilder(client, "null", message, config.colors.no, "Not a right number!", "so i use number 1!")
            userinput = 1;
        }
    }).catch(() => { console.error; userinput = 404 });
    if (userinput === 404) {
        return functions.embedbuilder(client, "null", message, config.colors.no, "Something went wrong!")
    }
    functions.embedbuilder(client, 10000, message, config.colors.yes, "<:soundcloud:792137871662252103> Searching!", `[${results.collection[userinput - 1].permalink}](${results.collection[userinput - 1].permalink_url})`, results.collection[userinput - 1].artwork_url)
    return client.distube.play(message, results.collection[userinput - 1].permalink_url)
    })
    .catch(err => console.log(err))
  }
  };