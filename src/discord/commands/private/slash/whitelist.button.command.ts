import { createCommand } from "#base";
import { ApplicationCommandType, AttachmentBuilder } from "discord.js";
import { icon } from "../../../../functions/utils/emojis.js";
import { whiteListButtonContainer } from "../../../containers/commands/whitelist/bot.commands.private.whitelist.button.container.js";

createCommand({
    name: "whitelistcontainer",
    description: "Envia o container com botão para realizar a Whitelist - Equipe",
    type: ApplicationCommandType.ChatInput,
    async run(interaction) {
        const whitelistchannel = await interaction.guild.channels.fetch(constants.channels.whitelistChannelId);

        const filenames = ["CRP-Whitelist_Banner"];

        const files = filenames.map(name => new AttachmentBuilder(
            `./src/assets/images/${name}.png`,
            { name: `${name}.png` }
        ))

        await interaction.reply({
            flags: ["Ephemeral"],
            content: `${icon.action_check} Container enviado com sucesso.`
        })

        if (whitelistchannel && whitelistchannel.isTextBased()) {
            await whitelistchannel.send({
                flags: ["IsComponentsV2"],
                components: [whiteListButtonContainer()],
                files: files,
                allowedMentions: { parse: [] }
            });
        };
    }
});