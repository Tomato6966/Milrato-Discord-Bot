
const functions = require("../../functions")
const config = require("../../config.json")
module.exports = {
    name: "dj",
	aliases: ["dj"],
    category: "🤖 Information Commands",
    description: "What is the DJ ROLE",
    usage: "dj",
    run: async (client, message, args) => {
        if (!message.member.hasPermission("ADMINISTRATOR")) return functions.embedbuilder(client, "null", message, "#ff264a", "DISABLE-DJ-ROLE", `<:declined:780403017160982538> You don\'t have permission for this Command!`)

        client.settings.delete(message.guild.id, `djrole`);

        return functions.embedbuilder(client, "null", message, config.colors.yes, "DJ-ROLE", `<:enabled:781797025951514644> Successfully  deleted the DJ ROLE from this Server`)
      }
}
