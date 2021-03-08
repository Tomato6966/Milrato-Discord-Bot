
module.exports = function (client, guildid, voicechannel, radiostation, volume) {
  const description = {
    name: "radio module",
    filename: "radiomodule.js",
    version: "3.0"
  }
  //log that the module is loaded
  console.log(` :: ⬜️ Module: ${description.name} | Loaded version ${description.version} from ("${description.filename}")`.bold.green)

  client.on("ready", () => {
    console.log(`${client.user.tag} is now online`); // log to console
    radioexecuteadmin(); //start the radio
    setInterval(() => {
        check(); 
    }, 30000); //delay  
  })
  //log if someone joins a channel
  client.on('voiceStateUpdate',async (oldState, newState) => {
    try {
              if(newState.channel.id === voicechannel && newState.guild.id === guildid) {
                if(newState.member.id === client.user.id) return; //if its the bot return
                if (newState.guild.me.speaking) return; //if the bot is already speaking return
                if(newState.member.user.bot) return; //if its a bot return
                radioexecuteadmin();
            }
    }catch{}
  });

  /////////////////////
  //////FUNCTIONS//////
  /////////////////////

  //checke alle 30 sekunden ob connected für radio
  async function check(){
    try{
    let guild = client.guilds.cache.get(guildid); //get the guild
    if(!guild.me.voice.channel) { 
      radioexecuteadmin();
      }
    }catch(e){console.log("RADIOMODULE:".underline.red + " :: " + e.stack.toString().red)}
  }

  //PLAY THE RADIO
  async function radioexecuteadmin() {
    try{
      //get the voice channel
      const voiceChannel = client.guilds.cache.get(guildid).channels.cache.get(voicechannel); 
      //join the channel
      voiceChannel.join() 
        .then(cnc => {
         try{
          cnc.voice.setSelfDeaf(true); //set self deaf 
          cnc.voice.setDeaf(true);     //set server self deaf
          cnc.play(radiostation ? radiostation : "https://stream-mz.planetradio.co.uk/net2national.mp3") //play the stream
          .setVolumeLogarithmic((volume ? Number(volume) : 30) / 100) //change volume to 30%
        }catch{}
        });
      }catch(e){console.log("RADIOMODULE:".underline.red + " :: " + e.stack.toString().red)}
    }
}
