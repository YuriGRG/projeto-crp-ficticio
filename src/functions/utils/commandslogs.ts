import { Message } from "discord.js";
import { commandMessageContainer } from "../../discord/containers/events/bot.event.commands.log.js";

export async function logcommand(command: Message) {
    const channellog = await command.guild?.channels.fetch(constants.channels.logsChannelId);
    if (!channellog?.isTextBased()) return;

    const container = commandMessageContainer(command);

    await channellog.send({
        flags: ["IsComponentsV2"],
        components: [container],
        allowedMentions: { parse: [] }
    });
}
