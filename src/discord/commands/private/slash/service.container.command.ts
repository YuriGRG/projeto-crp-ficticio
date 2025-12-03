import { createCommand } from "#base";
import { ApplicationCommandType, AttachmentBuilder } from "discord.js";
import { icon } from "../../../../functions/utils/emojis.js";
import { serviceContainer } from "../../../containers/commands/bot.commands.private.service.container.js";

createCommand({
    name: "paineldeatendimento",
    description: "Envia o Painel de Atendimento - Equipe",
    type: ApplicationCommandType.ChatInput,
    async run(interaction) {
        const suporteChannel = await interaction.guild.channels.fetch(constants.channels.serviceChannelId);

        if (!suporteChannel) {
            console.log("Canal Não Encontrado");
            return;
        };

        const filenames = ["CRP-Atendimento_Banner"];

        const files = filenames.map(name => new AttachmentBuilder(
            `./src/assets/images/${name}.png`,
            { name: `${name}.png` }
        ))

        if (suporteChannel.isTextBased()) {
            await suporteChannel.send({
                flags: ["IsComponentsV2"],
                components: [serviceContainer()],
                files
            });
        };

        await interaction.reply({
            flags: ["Ephemeral"],
            content: `${icon.action_check} Painel Enviado Com Sucesso.`
        })
    }
});