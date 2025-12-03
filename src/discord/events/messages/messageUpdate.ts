import { createEvent } from "#base";
import { Message, PartialMessage } from "discord.js";
import { logMessageUpdateContainer } from "../../containers/events/bot.event.messages.update.js";

createEvent({
    name: "logMessageUpdate",
    event: "messageUpdate",
    async run(oldMessage: Message | PartialMessage, newMessage: Message | PartialMessage) {
        if (!newMessage.guild || !newMessage.channel || newMessage.system) return;

        const logChannel = await newMessage.guild.channels.fetch(constants.channels.logsChannelId).catch(() => null);
        if (!logChannel?.isTextBased()) return;
        if (oldMessage.channelId === constants.channels.logsChannelId) return;
        if (!oldMessage.author) return;
        if (oldMessage.author.id === oldMessage.client.user?.id) return;

        if (oldMessage.partial) {
            try {
                oldMessage = await oldMessage.fetch();
            } catch {}
        }

        if (newMessage.partial) {
            try {
                newMessage = await newMessage.fetch();
            } catch {
                return;
            }
        }

        if (oldMessage.content === newMessage.content) return;

        const container = logMessageUpdateContainer(oldMessage, newMessage);

        await logChannel.send({
            flags: ["IsComponentsV2"],
            components: [container],
            allowedMentions: { parse: [] }
        });
    }
});
