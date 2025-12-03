import { createEvent } from "#base";
import { VoiceState } from "discord.js";
import { voiceJoinContainer } from "../../containers/events/bot.event.voice.join.js";
import { voiceLeaveContainer } from "../../containers/events/bot.event.voice.leave.js";
import { voiceMoveContainer } from "../../containers/events/bot.event.voice.move.js";

createEvent({
    name: "voiceLogger",
    event: "voiceStateUpdate",
    async run(oldState: VoiceState, newState: VoiceState) {
        const member = newState.member || oldState.member;
        if (!member) return;

        const guild = member.guild;
        const logChannel = await guild.channels.fetch(constants.channels.logsChannelId).catch(() => null);
        if (!logChannel?.isTextBased()) return;

        // Entrou em call
        if (!oldState.channel && newState.channel) {
            const container = voiceJoinContainer(newState);
            await logChannel.send({
                flags: ["IsComponentsV2"],
                components: [container],
                allowedMentions: { parse: [] }
            });
        }

        // Saiu da call
        else if (oldState.channel && !newState.channel) {
            const container = voiceLeaveContainer(oldState);
            await logChannel.send({
                flags: ["IsComponentsV2"],
                components: [container],
                allowedMentions: { parse: [] }
            });
        }

        // Moveu-se de call
        else if (oldState.channelId !== newState.channelId) {
            const container = voiceMoveContainer(oldState, newState);
            await logChannel.send({
                flags: ["IsComponentsV2"],
                components: [container],
                allowedMentions: { parse: [] }
            });
        }
    }
});
