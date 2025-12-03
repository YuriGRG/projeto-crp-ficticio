import { createEvent } from "#base";
import { guildMemberAddContainer } from "../../containers/events/bot.event.server.enter.js";

createEvent({
    name: "enter",
    event: "guildMemberAdd",
    async run(member) {
        const channellog = await member.guild.channels.fetch(constants.channels.logsChannelId);
        const swhiteListRoleId = await member.guild.roles.fetch(constants.roles.swhiteListRoleId);
        const whiteandallowDividerRole = await member.guild.roles.fetch(constants.roles.whiteandallowDivisorRoleId);
        const memberRole = await member.guild.roles.fetch(constants.roles.memberRoleId);
        const tieriRole = await member.guild.roles.fetch(constants.roles.tierIRoleId);

        if (!swhiteListRoleId || !tieriRole|| !memberRole || !whiteandallowDividerRole) return;

        await member.roles.add(swhiteListRoleId);
        await member.roles.add(whiteandallowDividerRole);
        await member.roles.add(memberRole);

        if (channellog && channellog.isTextBased()) {
            await channellog.send({
                flags: ["IsComponentsV2"],
                components: [guildMemberAddContainer(member)],
                allowedMentions: { parse: [] }
            });
        }
    }
});
