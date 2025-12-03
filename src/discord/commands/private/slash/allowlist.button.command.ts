import { createCommand } from "#base";
import { ApplicationCommandType, AttachmentBuilder } from "discord.js";
import { icon } from "../../../../functions/utils/emojis.js";
import { allowListButtonContainer } from "../../../containers/commands/bot.commands.private.allowlist.button.container.js";

createCommand({
    name: "allowlistcontainer",
    description: "Envia o container com botão allowlist approve - Equipe",
    type: ApplicationCommandType.ChatInput,
    async run(interaction) {
        const allowlistchannel = await interaction.guild.channels.fetch(constants.channels.allowlistChannelId);

        const filenames = ["CRP-Allowlist_Banner"];

        const files = filenames.map(name => new AttachmentBuilder(
            `./src/assets/images/${name}.png`,
            { name: `${name}.png` }
        ))

        await interaction.reply({
            flags: ["Ephemeral"],
            content: `${icon.action_check} Container enviado com sucesso.`
        })

        if (allowlistchannel && allowlistchannel.isTextBased()) {
            await allowlistchannel.send({
                flags: ["IsComponentsV2"],
                components: [allowListButtonContainer()],
                files: files,
                allowedMentions: { parse: [] }
            });
        };
    }
});