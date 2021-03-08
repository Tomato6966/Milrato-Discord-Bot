
/* INDEX.js
	const reactionrole = require("./modules/reactionrole"); reactionrole(client); 
*/
module.exports = (client) => {
    //ADDING ROLES
    const description = {
        name: "reactionrole",
        filename: "reactionrole.js",
        version: "4.3"
    }
    console.log(` :: ⬜️ Module: ${description.name} | Loaded version ${description.version} from ("${description.filename}")`.bold.green)
    client.on("messageReactionAdd", async (reaction, user) => {
        try{
        if (reaction.message.partial) await reaction.message.fetch();
        if (reaction.partial) await reaction.fetch();
        if (user.bot) return;
        if (!reaction.message.guild) return;
        client.reactionrole.ensure(reaction.message.guild.id, 
            {
               reactionroles: [
              ]
            }
        );
        const reactionsetup = client.reactionrole.get(reaction.message.guild.id, "reactionroles");
        for (let k = 0; k< reactionsetup.length; k++){
            if (reaction.message.id === reactionsetup[k].MESSAGE_ID) {
                let messagereaction = reaction.message.guild.members.cache.get(user.id);
                let rr = reactionsetup[k].Parameters;
                let currrole;
                for (let j = 0; j < rr.length; j++) {
                    if (reaction.emoji.id === rr[j].Emoji) {
                        try{currrole =rr[j].Role; await messagereaction.roles.add(rr[j].Role);}catch(error){console.log(error)}
                    }
                    if (reaction.emoji.name === rr[j].Emoji){
                        try{currrole =rr[j].Role;await messagereaction.roles.add(rr[j].Role);}catch(error){console.log(error)}
                    }
                }
                
                if(reactionsetup[k].remove_others){
                    let rr2 = reactionsetup[k].Parameters;
                    //REMOVE REACTIONS
                    let oldreact = reaction;
                    await reaction.message.fetch();
                    const userReactions = reaction.message.reactions.cache;
                    try {
                        for (const reaction of userReactions.values()) {
                            if(reaction.users.cache.has(user.id) && oldreact.emoji.name != reaction.emoji.name ){
                            reaction.users.remove(user.id);
                        }
                        }
                    } catch {
                    }
                    //REMOVE THE ROLE
                    for (let z = 0; z < rr2.length; z++) {
                            try{ 
                                if(rr2[z].Role != currrole){
                                    if(messagereaction.roles.cache.has(rr2[z].Role)) { 
                                        await messagereaction.roles.remove(rr2[z].Role)
                                    }
                                }
                            }
                            catch(error){console.log(error)}
                    }
                }
            }
        }
    }catch(e){console.log("REACTIONROLE:".underline.red + " :: " + e.stack.toString().red)}
    })

    //REMOVING ROLES
    client.on("messageReactionRemove", async (reaction,user) => {
    try{if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot) return;
    if (!reaction.message.guild) return;
    client.reactionrole.ensure(reaction.message.guild.id, 
        {
           reactionroles: []
        }
    );
        const reactionsetup = client.reactionrole.get(reaction.message.guild.id, "reactionroles");
        
        for (let k = 0; k< reactionsetup.length; k++){
            if (reaction.message.id === reactionsetup[k].MESSAGE_ID) {
                let messagereaction = reaction.message.guild.members.cache.get(user.id);
                let rr = reactionsetup[k].Parameters;
                for (let j = 0; j < rr.length; j++) {
                    if (reaction.emoji.id === rr[j].Emoji) {
                        try{await messagereaction.roles.remove(rr[j].Role);}catch(error){console.log(error)}
                    }
                    if (reaction.emoji.name === rr[j].Emoji) {
                        try{await messagereaction.roles.remove(rr[j].Role);}catch(error){console.log(error)}
                    }
                }
            }
        }
    }catch(e){console.log("REACTIONROLE:".underline.red + " :: " + e.stack.toString().red)}
    })
}