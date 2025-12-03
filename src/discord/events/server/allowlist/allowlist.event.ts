import { createEvent } from "#base";
import { env } from "#env";
import noblox from "noblox.js";
import { robloxGroupAllowListApproveContainer } from "../../../containers/events/bot.event.roblox.group.allowlist.approve.js";
import { robloxGroupAllowListReproveContainer } from "../../../containers/events/bot.event.roblox.group.allowlist.reprove.js";

createEvent({
    name: "autoallowlist",
    event: "ready",
    async run(client) {
        const currentUser = await noblox.setCookie(env.ROBLOX_COOKIE);

        if (!currentUser) return;

        const capitalrpguild = await client.guilds.fetch(constants.guilds.capitalrpGuildId);
        const channellog = await capitalrpguild.channels.fetch(constants.channels.logsChannelId);

        const members = await capitalrpguild.members.fetch();

        let stream = noblox.onJoinRequest(Number(constants.groups.crpRobloxGroupId));

        stream.on("data", async (data) => {
            const robloxUsername = data.requester.username;

            const userProfilePicture = (await noblox.getPlayerThumbnail(data.requester.userId, "150x150", "png", false, "headshot"))[0]?.imageUrl ?? "https://i.imgur.com/vCmpTqL.png";

            const member = members.find(m => m.nickname! === robloxUsername);

            if (!member) {
                noblox.handleJoinRequest(Number(constants.groups.crpRobloxGroupId), data.requester.userId, false);
                return;
            }

            if (member.roles.cache.has(constants.roles.whiteListRoleId)) {
                noblox.handleJoinRequest(Number(constants.groups.crpRobloxGroupId), data.requester.userId, true);

                await member.roles.remove(constants.roles.sallowListRoleId);
                await member.roles.add(constants.roles.allowListRoleId);

                if (channellog && channellog.isTextBased()) {
                    await channellog.send({
                        flags: ["IsComponentsV2"],
                        components: [robloxGroupAllowListApproveContainer(member, userProfilePicture)],
                        allowedMentions: { parse: [] }
                    });
                };
            } else {
                noblox.handleJoinRequest(Number(constants.groups.crpRobloxGroupId), data.requester.userId, false);

                if (channellog && channellog.isTextBased()) {
                    await channellog.send({
                        flags: ["IsComponentsV2"],
                        components: [robloxGroupAllowListReproveContainer(member, userProfilePicture)],
                        allowedMentions: { parse: [] }
                    });
                };
            }
        });

        stream.on("error", (err) => {
            console.log("Houve um erro no stream em autoallowlist.event.ts:", err);
        });
    }
});