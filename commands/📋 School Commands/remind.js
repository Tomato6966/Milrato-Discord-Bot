const utils = require('../../utils');

const math = require('math-expression-evaluator');
const stripIndents = require('common-tags').stripIndents;
const ms = require("ms");
const { HORIZONTAL_ALIGN_CENTER } = require('jimp');
const config = require("../../config.json")
module.exports = {
  name: "remind",
  aliases: ["remind"],
  category: "📋 School Commands",
  description: "Reminds you at a specific day for something",
  usage: "!remind <DAYS> + <HRS> + <MIN> + <SEC> + <CONTENT>",
  run: async (client, message, args) => {
    let newargs = message.content.slice("p!remind".length).split("+")
    if(!args) return message.reply("USAGE: p!remind <DAYS> + <HRS> + <MIN> + <SEC> + <CONTENT>")
  //command
  let days = Number(newargs[0]) * 1000 * 60 * 60 * 24;
  let hour = Number(newargs[1]) * 1000 * 60 * 60;
  let mins = Number(newargs[2]) * 1000 * 60;
  let secs = Number(newargs[3]) * 1000;
  if(!days) days = 0;
  if(!hour) hour = 0;
  if(!mins) mins = 0;
  if(!secs) secs = 0;
  let content = newargs.slice(4).join(" ");
  if(!content) return message.reply("No content added")
  // Based off the delimiter, sets the time
  let returntime = days + hour + mins + secs;
  if(returntime>2073600000) return message.reply("The Limit is 24 days");
  if(returntime == 0) return message.reply("Please add a time");
  const now = new Date();

   const future = now.valueOf() + returntime;

  message.reply("I will remind you in: " + `\`${newargs[0]} Days\`, \`${newargs[1]} Hours\`, \`${newargs[2]} Minutes\`, \`${newargs[3]} Seconds\`   |   \`${new Date(future)}\` `)
  let olddate = Date();
      // Returns the Message
      client.setTimeout(function () {

        message.author.send(
          `
          Your reply from <#${message.channel.id}>  **(${message.guild.name})**
          From :  \`${olddate}\`
             **MESSAGE:**
          `+
          content);
        
      }, returntime)
  }

};


     
