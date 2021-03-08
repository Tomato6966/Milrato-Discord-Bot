const Discord = require('discord.js')
const ranmemes = [
  "https://img.devrant.com/devrant/rant/r_2048071_R9cRK.jpg",
  "https://i.redd.it/kdwye3msnod31.png",
  "https://i.imgflip.com/4oaek2.jpg",
  "https://i.imgflip.com/3m9o19.jpg",
  "https://i.kym-cdn.com/photos/images/original/001/476/439/007.jpg",
  "https://i.imgflip.com/3nk95g.jpg",
  "https://i.kym-cdn.com/photos/images/newsfeed/001/485/808/4d5.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIjhBRU68qSFINXlAjmGdsxkb1N-mQ7qJYeg&usqp=CAU",
  "https://en.meming.world/images/en/3/3d/Winnie_the_Pooh_Reading_meme_2.jpg",
  "https://i.kym-cdn.com/photos/images/original/001/473/839/ce0.png",
  "https://i.redd.it/5hury14xj5b21.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP3bE3M7tAIeVi8NY3SjkOX6K7Z_r6Jprmzw&usqp=CAU",
  "https://i.redd.it/rcslh29rx9s21.jpg",
  "https://i.pinimg.com/originals/a4/0e/d3/a40ed3f3594ea965aedca3d1ef75b8c8.png",
  "https://i.pinimg.com/originals/61/82/50/618250c7a0f561d9188226352d5c69b0.png",
  "https://www.thebestsocial.media/de/wp-content/uploads/sites/3/2019/04/Pu-1.png",
]
const config = require("../../config.json")
module.exports = {
  name: "puuh",
  category: "🕹 SFW Commands",
  description: "Send puuh memes",
  usage: "puuh",
  run: async (client, message, args) => {
    const animalears = new Discord.MessageEmbed()
      .setTitle("Puuh!")
      .setImage(ranmemes[getRandomInt(ranmemes.length)])
      .setColor(config.colors.yes).setFooter(client.user.username, config.AVATARURL)
      .setURL(ranmemes[getRandomInt(ranmemes.length)]);
    message.channel.send(animalears);
  }
};

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}