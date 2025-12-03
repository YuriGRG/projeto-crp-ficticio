import { createEvent } from "#base";
import { initMessageContainer } from "../../containers/events/bot.event.init.js";

createEvent({
    name: "initdcbot",
    event: "ready",
    async run(client) {
        const capitalrpguild = await client.guilds.fetch(constants.guilds.capitalrpGuildId);
        const channellog = await capitalrpguild.channels.fetch(constants.channels.logsChannelId);

        if (channellog && channellog.isTextBased()) {
            await channellog.send({
                flags: ["IsComponentsV2"],
                components: [initMessageContainer(client)],
                allowedMentions: { parse: [] }
            });
        };
    },
});