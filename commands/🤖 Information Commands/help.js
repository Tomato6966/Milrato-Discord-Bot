const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const config = require("../../config.json")
const functions = require("../../functions")
module.exports = {
    name: "help",
    aliases: ["h"],
    cooldown: 3, 
    category: "🤖 Information Commands",
    description: "Returns all commands, or one specific command info",
    usage: "help [Command]",
    run: async (client, message, args) => {    
         //GET THE PREFIX
    let prefix = client.settings.get(message.guild.id, `prefix`);
    if (prefix === null) prefix = config.prefix;           //if not prefix set it to standard prefix in the config.json file
 if (args[0]) {
            return getCMD(client, message, args[0]);
        } else {
            return getAll(client, message);
        }
 
async function getAll(client, message) {
    const embed = new MessageEmbed()
        .setColor(config.colors.yes).setFooter(client.user.username, config.AVATARURL)
        .addField("**__BOT BY:__**", `
        >>> <@442355791412854784> \`Tomato#6966\` [\`Website\`](https://musicium.eu) [\`INVITE\`](https://discord.com/api/oauth2/authorize?client_id=798583657592782868&permissions=8&scope=bot%20applications.commands)
        `)
            .addField("**__Music - Supported sources__**", `
        >>> \`Youtube\`, \`Spotify\`, \`Soundcloud\`, [\`More\`](https://links.musicium.eu), ...
        `)
        .addField("**__TUTORIAL VIDEO__**", "https://youtu.be/DpWLmoLd84Y\n\n[\`Support Server\`](https://discord.gg/wvCp7q88G3)")
        .setFooter(`To see command descriptions and usage type   ${prefix}help [CMD Name]`, config.AVATARURL)
        .setTitle(`Help Menu\n\nPrefix: \`${prefix}\``)
        .setDescription("***Use the Prefix infront of EACH command, to see its properties!***\n\n***TO GET STARTED:*** Type: `//setup`")

        message.author.send(embed).then(msg=>
            { 
                message.channel.send(new MessageEmbed().setColor(config.colors.yes).setTitle(`**👍 ${message.author.tag} Check your \`direct messages\`!**`).setDescription("To see the list of all commands"))
            }
        )
        
    const commands = (category) => { //finding all commands and listing them into a string with filter and map
        return client.commands.filter(cmd => cmd.category === category)
                .map(cmd => `\`${cmd.name}\``)
    }
    try {
        for(let j = 0; j < client.categories.length; j += 5){
            const embed = new MessageEmbed() //defining the Embed
            .setColor(config.colors.yes)
            .setThumbnail(client.user.displayAvatarURL())
            .setTitle("HELP MENU")
            .setFooter(`To see command descriptions and inforamtion, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL())
            for (let i = 0; i < 5; i += 1) {
                const current = client.categories[j+i]
                const info = commands(current);
                const items = info
                const n = 3
                const result = [[], [], []] 
                const wordsPerLine = Math.ceil(items.length / 3)
                for (let line = 0; line < n; line++) {
                for (let i = 0; i < wordsPerLine; i++) {
                    const value = items[i + line * wordsPerLine]
                    if (!value) continue
                    result[line].push(value)
                }
                }
                embed.addField(`**${current.toUpperCase()}**`,`> ${result[0].join("\n> ")}`,true)
                embed.addField(`\u200b`,`${result[1].join("\n") ? result[1].join("\n"): "\u200b"}`,true)
                embed.addField(`\u200b`,`${result[2].join("\n") ? result[2].join("\n"): "\u200b"}`,true)
            }
            message.author.send(embed)
        }
    } catch (error) {
        console.log(error)
    }
}
function getCMD(client, message, input) {
    const embed = new MessageEmbed() //creating a new Embed

    const cmd = client.commands.get(input.toLowerCase()) || client.commands.get(client.aliases.get(input.toLowerCase())) //getting the command by name/alias
    if(!cmd){ //if no cmd found return info no infos!
        return message.channel.send(embed.setColor("RED").setDescription(`No Information found for command **${input.toLowerCase()}**`));
    }
    if(cmd.name) embed.addField("**Command name**", `\`${cmd.name}\``)
    if(cmd.name) embed.setTitle(`Detailed Information about: \`${cmd.name}\``)
    if(cmd.description) embed.addField("**Description**", `\`${cmd.description}\``);

    if(cmd.aliases) embed.addField("**Aliases**", `\`${cmd.aliases.map(a => `${a}`).join("\`, \`")}\``)
    if(cmd.cooldown) embed.addField("**Cooldown**", `\`${cmd.cooldown} Seconds\``)
        else embed.addField("**Cooldown**", `\`2 Seconds\``)
    if(cmd.useage){
        embed.addField("**Useage**", `\`${config.prefix}${cmd.useage}\``);
        embed.setFooter("Syntax: <> = required, [] = optional"); 
    }
    if(cmd.usage){
        embed.addField("**Useage**", `\`${config.prefix}${cmd.usage}\``);
        embed.setFooter("Syntax: <> = required, [] = optional"); 
    }
    return message.channel.send(embed.setColor("GREEN"));
}
}
}