import { createCommand } from "#base";
import { ApplicationCommandOptionType, ApplicationCommandType } from "discord.js";
import fs from "fs/promises";
import { icon } from "../../../../functions/utils/emojis.js";

createCommand({
    name: "sessao",
    description: "Inicia uma sessão - Equipe",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "horario",
            description: "Comando que desejas rodar.",
            type: ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: "temperatura",
            description: "Diga a temperatura da sessão.",
            type: ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: "clima",
            description: "Diga o clima da sessão.",
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],
    async run(interaction) {
        const temperatura = interaction.options.getString("temperatura");
        const clima = interaction.options.getString("clima");

        const sessionChannel = await interaction.guild.channels.fetch(constants.channels.sessionChannelId).catch(() => null);
        if (!sessionChannel?.isTextBased()) return;

        let messagemd = await fs.readFile('src/discord/messages/bot.commands.session.md', 'utf-8');

        messagemd = messagemd
            .replace(/\$\{interaction\.user\}/g, `<@${interaction.user.id}>`)
            .replace(/\$\{temperatura\}/g, temperatura!)
            .replace(/\$\{clima\}/g, clima!);

        await interaction.reply({
            flags: ["Ephemeral"],
            content: `${icon.action_check} Sessão iniciada com sucesso.`
        })

        await sessionChannel.send({
            content: messagemd
        });
    }
});
