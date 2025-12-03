import { createCommand } from "#base";
import { ApplicationCommandType, AttachmentBuilder } from "discord.js";
import { icon } from "../../../../functions/utils/emojis.js";
import { serverOrgsInfoContainer } from "../../../containers/commands/bot.commands.private.server.orgsinfos.container.js";

const filenames = ["CRP-PicturePrincipal", "pf", "prf", "pmesp", "cbpmesp", "pcesp", "gcm", "cet"];

const files = filenames.map(name => new AttachmentBuilder(
    `./src/assets/images/${name}.png`,
    { name: `${name}.png` }
))

createCommand({
    name: "orgsinfo",
    description: "Envia as informações das organizações - Equipe",
    type: ApplicationCommandType.ChatInput,
    async run(interaction) {
        const orgsInfoChannel = await interaction.guild.channels.fetch(constants.channels.orgsInfoChannelId);

        await interaction.reply({
            flags: ["Ephemeral"],
            content: `${icon.action_check} Informações enviadas com sucesso (<#${constants.channels.orgsInfoChannelId}>).`
        })

        if (orgsInfoChannel && orgsInfoChannel.isTextBased()) {
            await orgsInfoChannel.send({
                flags: ["IsComponentsV2"],
                components: [serverOrgsInfoContainer()],
                files: files,
                allowedMentions: { parse: [] }
            });
        };
    }
});