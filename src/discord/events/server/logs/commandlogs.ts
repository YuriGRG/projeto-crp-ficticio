import { createEvent } from "#base";
import { commandInteractionContainer } from "../../../containers/events/bot.event.commands.log.slash.js";

createEvent({
    name: "commandslogs",
    event: "interactionCreate",

    async run(interaction) {
        if (!interaction.isChatInputCommand()) return;

        const channellog = await interaction.guild?.channels.fetch(constants.channels.logsChannelId);
        if (!channellog?.isTextBased()) return;

        const container = commandInteractionContainer(interaction);

        await channellog.send({
            flags: ["IsComponentsV2"],
            components: [container],
            allowedMentions: { parse: [] }
        });
    }
});