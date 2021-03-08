const functions = require("../../functions")
const config = require("../../config.json")
var { getData, getPreview } = require("spotify-url-info");
const ytsr = require("youtube-sr")
const DeezerPublicApi = require('deezer-public-api');
let deezer = new DeezerPublicApi();
module.exports = {
    name: "play",
    category: "🎶 Music Commmands",
    aliases: ["p"],
    cooldown: 5,
    useage: "play <URL/NAME>",
  description: "Plays a song, from youtube, soundcloud or whatever, or search it, or play a playlist",
  run: async (client, message, args) => {
             //CHECK IF DJ LOL
             if(client.settings.get(message.guild.id, `djroles`).toString()!==""){
              let isdj=false;
              let leftb = "";
                  if(client.settings.get(message.guild.id, `djroles`).join("") === "") 
                      leftb = "no Channels, aka all Channels are Bot Channels"
                  else
                      for(let i = 0; i < client.settings.get(message.guild.id, `djroles`).length; i++){
                              if(message.member.roles.cache.has(client.settings.get(message.guild.id, `djroles`)[i])) isdj = true;
                                  if(!message.guild.roles.cache.get(client.settings.get(message.guild.id, `djroles`)[i])) continue;
                              leftb += "<@&" + client.settings.get(message.guild.id, `djroles`)[i] + "> | "
                      }
                  if(!isdj && !message.member.hasPermission("ADMINISTRATOR")) return functions.embedbuilder(client, 6000, message, config.colors.no, "DJ-ROLE", `<:declined:780403017160982538> You don\'t have permission for this Command! You need to have: ${leftb}`)
              }
              //CHECK IF DJ LOL
      if (!message.member.voice.channel) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`"  + " You must join a Voice Channel")
      if(!args[0]) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`"  + " Please add something you wanna search to")
      if (client.distube.isPlaying(message) && message.member.voice.channel.id !== message.member.guild.me.voice.channel.id) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`"  + " You must join my Voice Channel: " + ` \`${message.member.guild.me.voice.channel.name ? message.member.guild.me.voice.channel.name : ""}\``)
      functions.embedbuilder(client, 5000, message, config.colors.yes, "<:youtube:769675858431705109> Searching!", "```" + args.join(" ") + "```")
      if(args.join(" ").includes("deezer")){
        //Get album list for the given artist id
        let track = args.join(" ").split("/")

        track = track[track.length-1]
        deezer.playlist.tracks(track).then(async function(result) {
          let items = result.data;
          let songsarray = [];
          let tracklength = items.length;
         /* if(tracklength > 25) 
          {
              message.reply("the current maximum of tracks for deezer playlists are 25 tracks, if you wanna use bigger playlists, then dm `Tomato#6966`\n\nI will use the first 25 songs!"); 
              tracklength = 25;
          } */
          functions.embedbuilder(client, 5000, message, config.colors.yes, "<:youtube:769675858431705109> Fetching the songs!", "This will take me around about: " + tracklength/2 + " seconds");
          for(let i = 0; i < items.length; i++){
              let songInfo = await ytsr.searchOne(items[i].title) ;
              songsarray.push(songInfo.url)
          }
          console.log(songsarray)
          client.distube.playCustomPlaylist(message, songsarray, { name: message.author.username + "'s Deezer Playlist" });
        });
      }
      else if(args.join(" ").includes("track") && args.join(" ").includes("open.spotify")){
        let info = await getPreview(args.join(" "));
        return client.distube.play(message, info.artist + " " + info.title);
      }
      else  if(args.join(" ").includes("playlist") && args.join(" ").includes("open.spotify")){
        let info = await getData(args.join(" "));
        let items = info.tracks.items;
        let songsarray = [];
        let tracklength = items.length;
        if(tracklength > 25) 
        {
            message.reply("the current maximum of tracks for spotify playlists are 25 tracks, if you wanna use bigger playlists, then dm `Tomato#6966`\n\nI will use the first 25 songs!"); 
            tracklength = 25;
        }
        functions.embedbuilder(client, 5000, message, config.colors.yes, "<:youtube:769675858431705109> Fetching the songs!", "This will take me around about: " + tracklength/2 + " seconds");
        for(let i = 0; i < items.length; i++){
            let songInfo = await ytsr.searchOne(items[i].track.name) ;
            songsarray.push(songInfo.url)
        }
        client.distube.playCustomPlaylist(message, songsarray, { name: message.author.username + "'s Spotify Playlist" });
      }
      else{
        return client.distube.play(message, args.join(" "));
      }
    }
  };