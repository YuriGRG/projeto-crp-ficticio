import { Guild, ThreadChannel } from "discord.js";

export async function removeUsers(thread: ThreadChannel, guild: Guild) {
    thread.members.cache.forEach(async (threadMember) => {
        const guildMember = await guild.members.fetch(threadMember.id).catch(() => null);
        if (guildMember && !guildMember.roles.cache.has(constants.roles.equipeRoleId)) {
            await thread.members.remove(guildMember.id).catch(() => { });
        }
    });
}