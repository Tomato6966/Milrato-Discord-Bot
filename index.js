var colors = require('colors');
///////////////MODULES///////////////
/////////////////////////////////////
//LOADING CONFIG FOR QUICK
const config = require("./config.json");
////////////
const { Client, Collection } = require("discord.js");
const Discord = require('discord.js'); 
const fs = require("fs");
const DisTube = require("distube");
const Canvas = require('canvas');
Canvas.registerFont("Genta.ttf", { family: "Genta" }); //loading a font
//creating the client
const client = new Client({
    messageCacheLifetime: 60,
    fetchAllMembers: false,

    messageCacheMaxSize: 10,
    shards: "auto",
    shardCount: 5,
    disableEveryone: true,
    partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});

client.commands = new Collection();
client.queue = new Map();
client.aliases = new Collection();
const cooldowns = new Collection();
//audiosetups
client.distube = new DisTube(client, {
    youtubeCookie: config.cookie,
    searchSongs: true,
    emitNewSongOnly: true,
    highWaterMark: 1024*1024*64,
    leaveOnEmpty: true,
    leaveOnFinish: true,
    leaveOnStop: true,
    searchSongs: false,
    youtubeDL: true,
    updateYouTubeDL: false,
    customFilters: config.customs
})
client.setMaxListeners(0);
require('events').defaultMaxListeners = 0;
//Externalfiles setups
client.categories = fs.readdirSync("./commands/");
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});
const slash = require("./handlers/slashcommands");
    slash(client);
const setups = require("./handlers/setups");
    setups(client);


const ranking = require("./modules/ranking"); ranking(client);
const counter = require("./modules/counter"); counter(client);
const chatbot = require("./modules/chatbot"); chatbot(client);
const jointocreate = require("./modules/jointocreate");jointocreate(client);
const ticketsystem = require("./modules/simpleticketmodule"); ticketsystem(client); 
const welcomeleavesytem = require("./modules/welcomeleavesytem"); welcomeleavesytem(client); 
const membercount = require("./modules/membercount"); membercount(client); 
const reactionrole = require("./modules/reactionrole"); reactionrole(client); 
const apply = require("./modules/apply"); apply(client); 
const radiomodule = require("./modules/radiomodule"); radiomodule(client, "738019408982573137", "738019409527963682"/*, radiostation, volume*/);
const logger = require("./modules/logger"); logger.all(client);  

const functions = require("./functions")
//databases setups
const Enmap = require("enmap");
client.settings = new Enmap({ name: "settings", dataDir: "./databases/settings" }); 
client.setups = new Enmap({ name: "setups", dataDir: "./databases/setups" }); 
client.infos = new Enmap({ name: "infos", dataDir: "./databases/infos" }); 
client.custom = new Enmap({ name: "custom", dataDir: "./databases/playlist" }); 
client.custom2 = new Enmap({ name: "custom", dataDir: "./databases/playlist2" }); 
client.points = new Enmap({ name: "points", dataDir: "./databases/ranking" }); 
client.reactionrole = new Enmap({ name: "reactionrole", dataDir: "./databases/reactionrole" }); 
client.apply = new Enmap({ name: "apply", dataDir: "./databases/apply" })
//registering a command setup

client.on("message", async message => {
    if(message.author.bot) return;
    if(!message.guild) return;
    //GET THE PREFIX
    let prefix = client.settings.get(message.guild.id, `prefix`);
    if (prefix === null) prefix = config.prefix;           //if not prefix set it to standard prefix in the config.json file

    if (!message.content.startsWith(prefix) && message.content.includes(client.user.id))
        message.reply(new Discord.MessageEmbed().setColor(config.colors.yes).setAuthor(`${message.author.username}, My prefix is ${prefix}, to get started; type ${prefix}help`, message.author.displayAvatarURL({ dynamic: true }), "https://discord.com/api/oauth2/authorize?client_id=798583657592782868&permissions=8&scope=bot%20applications.commands"));
    if(!message.content.startsWith(prefix)) return;
    
    const { inspect } = require('util');
    if (message.content.startsWith(prefix + "eval")) { //if cmd == eval
        const evalargs = message.content.split(' ');
        evalargs.shift();
        //Allowed user:
        if (message.author.id !== '442355791412854784') return;
        let evaled;
        try {
            if(evalargs.join(' ').includes("token")) return console.log("ERROR NO TOKEN GRABBING ;)");
            evaled = await eval(evalargs.join(' '));
            if(evaled.toString().includes(client.token)) return console.log("ERROR NO TOKEN GRABBING ;)"); //just to be 100% sure
            return message.channel.send("\`\`\`" + inspect(evaled) + "\`\`\`");
        }
        catch (error) {
            console.log(error.toString().red);
            return message.reply('there was an error during evaluation.');
        }
    }
    //CHECK IF IN A BOT CHANNEL OR NOT
    if(client.settings.get(message.guild.id, `botchannel`).toString()!==""){
        if (!client.settings.get(message.guild.id, `botchannel`).includes(message.channel.id) && !message.member.hasPermission("ADMINISTRATOR")) {
            let leftb = "";
            for(let i = 0; i < client.settings.get(message.guild.id, `botchannel`).length; i++){
                leftb  +="<#" +client.settings.get(message.guild.id, `botchannel`)[i] + "> / "
            }       
            return functions.embedbuilder(client,5000, message, config.colors.no, `Not in the Bot Chat!`, `There is a Bot chat setup in this GUILD! try using the Bot Commands here: 
            > ${leftb}`)
        }
    }

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    if (command) 
        {
            if (!cooldowns.has(command.name)) {
                cooldowns.set(command.name, new Collection());
            }
            
            const now = Date.now();
            const timestamps = cooldowns.get(command.name);
            const cooldownAmount = (command.cooldown || 2) * 1000;
          
            if (timestamps.has(message.author.id)) {
              const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
          
              if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return message.reply(
                  `Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`
                );
              }
            }
          
            timestamps.set(message.author.id, now);
            setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

            client.infos.set("global", Number(client.infos.get("global", "cmds")) + 1, "cmds");
            try{
                command.run(client, message, args, prefix);
            }catch (error){
                console.log(error.toString().red)
                functions.embedbuilder(client,5000, message, "RED", "ERROR: ", "```" + error.toString().substr(0, 100) + "```" + "\n\n**Error got sent to my owner!**")
                functions.errorbuilder(error.stack.toString().substr(0, 2000))
            }
        }
    else
        return message.reply(`Unkown command, try: ${prefix}help`)
});

client.login(config.token);

//BOT CODED BY: Tomato#6966
//DO NOT SHARE WITHOUT ALLOW!
























//BOT CODED BY: Tomato#6966
//DO NOT SHARE WITHOUT ALLOW!