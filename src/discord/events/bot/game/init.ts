import { createEvent } from "#base";
import { env } from "#env";
import noblox from "noblox.js";
import { initRobloxBotMessageContainer } from "../../../containers/events/bot.event.roblox.bot.init.js";

createEvent({
    name: "initrobloxbot",
    event: "ready",
    async run(client) {
        const currentUser = await noblox.setCookie(env.ROBLOX_COOKIE)

        const capitalrpguild = await client.guilds.fetch(constants.guilds.capitalrpGuildId);
        const channellog = await capitalrpguild.channels.fetch(constants.channels.logsChannelId);

        const userProfilePicture = (await noblox.getPlayerThumbnail(currentUser.id, "150x150", "png", false, "headshot"))[0]?.imageUrl ?? "https://i.imgur.com/vCmpTqL.png";
        
        if (channellog && channellog.isTextBased()) {
            await channellog.send({
                flags: ["IsComponentsV2"],
                components: [initRobloxBotMessageContainer(currentUser, userProfilePicture)],
                allowedMentions: { parse: [] }
            });
        };
    }
});