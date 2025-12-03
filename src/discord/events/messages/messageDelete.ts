import { createEvent } from "#base";
import { Message, PartialMessage } from "discord.js";
import { logMessageDeleteContainer } from "../../containers/events/bot.event.messages.delete.js";

createEvent({
    name: "logMessageDelete",
    event: "messageDelete",
    async run(message: Message | PartialMessage) {
        if (!message.guild || !message.channel || message.system) return;

        const logChannel = await message.guild.channels.fetch(constants.channels.logsChannelId).catch(() => null);
        if (!logChannel?.isTextBased()) return;
        if (message.channelId == constants.channels.logsChannelId) return;
        if (!message.author) return;
        if (message.author.id === message.client.user?.id) return;

        if (message.partial) {
            try {
                message = await message.fetch();
            } catch {
                return;
            }
        }

        const container = logMessageDeleteContainer(message);

        await logChannel.send({
            flags: ["IsComponentsV2"],
            components: [container],
            allowedMentions: { parse: [] }
        });
    }
});
