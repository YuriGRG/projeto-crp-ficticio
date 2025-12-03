import { createCommand } from "#base";
import { ApplicationCommandOptionType, ApplicationCommandType } from "discord.js";
import fs from "fs/promises";
import { icon } from "../../../../functions/utils/emojis.js";

createCommand({
    name: "votacaosessao",
    description: "Inicia uma votação de início de sessão - Equipe",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "horario",
            description: "Comando que desejas rodar.",
            type: ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: "emoji",
            description: "Coloque uma reação personalizada",
            type: ApplicationCommandOptionType.String,
            required: false,
        }
    ],
    async run(interaction) {
        const horario = interaction.options.getString("horario");
        const emoji = interaction.options.getString("emoji");

        const votationChannel = await interaction.guild.channels.fetch(constants.channels.sessionvotationChannelId).catch(() => null);
        if (!votationChannel?.isTextBased()) return;

        let messagemd = await fs.readFile('src/discord/messages/bot.commands.sessionvotation.md', 'utf-8');

        messagemd = messagemd
            .replace(/\$\{horario\}/g, horario!)
            .replace(/\$\{interaction\.user\}/g, `<@${interaction.user.id}>`);

        await interaction.reply({
            flags: ["Ephemeral"],
            content: `${icon.action_check} Votação iniciada com sucesso.`
        })

        const votation = await votationChannel.send({
            content: messagemd
        });
        try {
            await votation.react(`${emoji}`);
        } catch {
            await votation.react("<:action_check:1428109594160529438>");
        }
    }
});
