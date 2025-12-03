import { createCommand } from "#base";
import { ApplicationCommandType } from "discord.js";
import { listaDeAdminsContainer, type AdminListData } from "../../../containers/commands/bot.commands.private.erlcadmins.js";

createCommand({
    name: "listadeadmins",
    description: "Verifica a lista de admins do ERLC - Equipe",
    type: ApplicationCommandType.ChatInput,

    async run(interaction) {
        const response = await fetch('https://api.policeroleplay.community/v1/server/staff', {
            method: 'GET',
            headers: {
                "server-key": constants.keys.apiERLCKey,
                "Accept": "*/*"
            },
        });

        const data = await response.json() as AdminListData;

        const container = listaDeAdminsContainer(data);

        await interaction.reply({
            flags: ["Ephemeral", "IsComponentsV2"],
            components: [container],
            allowedMentions: { parse: [] }
        });
    }
});
