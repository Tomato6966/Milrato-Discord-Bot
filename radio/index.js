/////////////////////
////CONFIGURATION////
/////////////////////
const Discord = require("discord.js");

const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });

const config = {
 voicechannel: "",
 guildid: "",
 token: "",
}

/////////////////////
////////EVENTS///////
/////////////////////
client.login(config.token); //LOG INTO THE BOT

//log when reconnect
client.on('reconnecting', () => {
  console.log(' :: Reconnecting!');
  client.user.setPresence({status: "offline"}); //change to offline
});

//log when disconnecting
client.on('disconnect', () => {
  console.log(' :: Disconnect!'); 
  client.user.setPresence({status: "offline"}); //change to offline
});

//log when ready and status
client.on("ready", () => {
  console.log(`${client.user.tag} is now online`); // log to console
 radioexecuteadmin(); //start the radio

  setInterval(() => {
     
      check(); 
  }, 30000); //7.5 second delay  
})



//log if someone joins a channel
client.on('voiceStateUpdate',async (oldState, newState) => {
  try {
            if(newState.channel.id === config.voicechannel && newState.guild.id === config.guildid) {
              if(newState.member.id === client.user.id) return; //if its the bot return
              if (newState.guild.me.speaking) return; //if the bot is already speaking return
              if(newState.member.user.bot) return; //if its a bot return
               radioexecuteadmin();
          }
  }
  catch{
  }
});

/////////////////////
//////FUNCTIONS//////
/////////////////////

//checke alle 30 sekunden ob connected für radio
async function check(){
  let guild = client.guilds.cache.get(config.guildid); //get the guild
  
  if(!guild.me.voice.channel) { 
    radioexecuteadmin();
    }
}

//PLAY THE RADIO
async function radioexecuteadmin() {
    //get the voice channel
    const voiceChannel = client.guilds.cache.get(config.guildid).channels.cache.get(config.voicechannel); 
    //join the channel
    voiceChannel.join() 
      .then(cnc => {
        cnc.voice.setSelfDeaf(true); //set self deaf 
        cnc.voice.setDeaf(true);     //set server self deaf
        cnc.play("http://mp3stream7.apasf.apa.at:8000/.mp3") //play the stream
        .setVolumeLogarithmic(30 / 100) //change volume to 30%
      });
}

//Bot Coded by Tomato#6966
