import { createCommand } from "#base";
import { brBuilder } from "@magicyan/discord";
import { ApplicationCommandOptionType, ApplicationCommandType } from "discord.js";
import { icon } from "../../../../functions/utils/emojis.js";

createCommand({
    name: "executarcomando",
    description: "Executa um comando no ER:LC - Equipe",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "comando",
            description: "Comando que desejas rodar.",
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],
    async run(interaction) {
        const command = interaction.options.getString("comando")?.startsWith(":") ? interaction.options.getString("comando") : `:${interaction.options.getString("comando")}`;

        await interaction.deferReply({
            flags: ["Ephemeral"]
        })

        const response = await fetch('https://api.policeroleplay.community/v1/server/command', {
            method: 'POST',
            headers: {
                "server-key": constants.keys.apiERLCKey,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "command": `${command}`
            })
        });

        const data = await response.json() as { message: string, code?: number};

        if (data.message != "Success") {
            await interaction.editReply({
                content: brBuilder(
                    `${icon.action_x} Houve um erro ao executar este comando.`,
                   `${(constants.messages.apiERLC as any)[data.message] || data.message} (${data.code})`
                )
            });
            return;
        }

        await interaction.editReply({
            content: `${icon.action_check} Comando executado com sucesso.`
        });
    }
});