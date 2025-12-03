import { createEvent } from "#base";
import { env } from "#env";
import noblox from "noblox.js";
import { guildMemberRemoveContainer } from "../../containers/events/bot.event.server.leave.js";

createEvent({
    name: "leave",
    event: "guildMemberRemove",
    async run(member) {
        const currentUser = await noblox.setCookie(env.ROBLOX_COOKIE);

        if (!currentUser) return;

        const channellog = await member.guild.channels.fetch(constants.channels.logsChannelId);

        try {
            const userId = await noblox.getIdFromUsername(member.nickname ?? member.user.displayName);

            noblox.exile(Number(constants.groups.crpRobloxGroupId), userId);
        } catch (err) {
            console.log("Houve um erro ao exiliar um membro.", err)
        }

        if (channellog && channellog.isTextBased()) {
            await channellog.send({
                flags: ["IsComponentsV2"],
                components: [guildMemberRemoveContainer(member)]
            });
        }
    }
});
