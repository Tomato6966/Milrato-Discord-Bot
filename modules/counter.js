const config = require("../config.json");
const { MessageEmbed } = require("discord.js");

module.exports = function (client, options) {
    const description = {
        name: "counter",
        filename: "counter.js",
        version: "5.2"
    }
    let disabled = new MessageEmbed()
    .setColor(config.colors.no)
    .setTitle("Your Owner disabled the COUNTER-Chat! Sorry")
    .setFooter("Milrato", config.AVATARURL)
    .setThumbnail(config.AVATARURL)
    console.log(` :: ⬜️ Module: ${description.name} | Loaded version ${description.version} from ("${description.filename}")`.bold.green)

    client.on("message", message => {
        if(message.author.bot || !message.guild) return;
        client.setups.ensure(message.guild.id,  {
          enabled: false,
          channel: "",
          number: 0,
          author: client.user.id
      },"counter");
        let counter = client.setups.get(message.guild.id, "counter");
        /**
         * counter: {
         *      enabled: false,
         *      channel: "",
         *      number: 0,
         *      author: client.user.id
         *  }
         */
        if(message.channel.id == counter.channel){
        if(!counter.enabled) return message.author.send(disabled).catch(e => console.log("COUNTER:".underline.red + " :: " + e.stack.toString().red));
       
        if (!message.author.bot && message.author.id === counter.author) {
          message.delete().catch(e=> console.log("counter: " + e));
          message.reply("Please wait for **your** turn").then(m => m.delete({timeout: 3000}).catch(e=>console.log("counter: " + e)));
          return;
        }
        
        if (!message.author.bot && isNaN(message.content)) {
          message.delete().catch(e=> console.log("counter: " + e));
          message.reply("Messages in this channel must be a **number**").then(m => m.delete({timeout: 3000}).catch(e=>console.log("counter: " + e)));
          return;
        }
        if (!message.author.bot && parseInt(message.content) !== counter.number + 1) {
          message.delete().catch(e=> console.log("counter: " + e));
          message.reply(`Next number must be \`${counter.number + 1}\``).then(m => m.delete({timeout: 3000}).catch(e=>console.log("counter: " + e)));
          return;
        }
        try{
          if((counter.number+1) % 100 === 0){
          message.channel.setTopic(`Current number-Range: **${counter.number+1} - ${counter.number+100}**`).catch(e=>console.log("counter: " + e))}
        }catch (e){
          console.log("counter: " + e)
        }
        if((counter.number+1) % 5 === 0)
        message.react("776018311259488276")
        counter = client.setups.set(message.guild.id, counter.number + 1, "counter.number");
        counter = client.setups.set(message.guild.id, message.author.id , "counter.author");
      }
  })
}
