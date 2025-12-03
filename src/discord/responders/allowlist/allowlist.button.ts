import { createResponder, ResponderType } from "#base";
import { env } from "#env";
import noblox from "noblox.js";
import { icon } from "../../../functions/utils/emojis.js";
import { robloxGroupAllowListApproveContainer } from "../../containers/events/bot.event.roblox.group.allowlist.approve.js";
import { robloxGroupAllowListReproveContainer } from "../../containers/events/bot.event.roblox.group.allowlist.reprove.js";

await noblox.setCookie(env.ROBLOX_COOKIE);

createResponder({
    customId: "allowlist/approve",
    types: [ResponderType.Button],
    cache: "cached",
    async run(interaction) {
        const channellog = await interaction.guild.channels.fetch(constants.channels.logsChannelId);

        try {
            const username = interaction.member.nickname ?? interaction.user.displayName;
            const userId = await noblox.getIdFromUsername(username);

            const userProfilePicture = (await noblox.getPlayerThumbnail(userId, "150x150", "png", false, "headshot"))[0]?.imageUrl ?? "https://i.imgur.com/vCmpTqL.png";

            if (interaction.member.roles.cache.has(constants.roles.whiteListRoleId)) {
                try {
                    await noblox.handleJoinRequest(Number(constants.groups.crpRobloxGroupId), userId, true);

                    await interaction.member.roles.remove(constants.roles.sallowListRoleId);
                    await interaction.member.roles.add(constants.roles.allowListRoleId);

                    await interaction.reply({
                        flags: ["Ephemeral"],
                        content: `${icon.action_check} Allowlist aprovada. Curta o roleplay!`
                    });

                    if (channellog && channellog.isTextBased()) {
                        await channellog.send({
                            flags: ["IsComponentsV2"],
                            components: [robloxGroupAllowListApproveContainer(interaction.member, userProfilePicture)],
                            allowedMentions: { parse: [] }
                        });
                    }
                } catch (err) {
                    if (String(err).includes("The group join request is invalid")) {
                        await interaction.reply({
                            flags: ["Ephemeral"],
                            content: `${icon.action_x} Você ainda não solicitou entrada no grupo Roblox. Por favor, faça isso antes de tentar ser aprovado.`
                        });
                        return
                    }

                    await interaction.reply({
                        flags: ["Ephemeral"],
                        content: `${icon.action_x} Erro ao aprovar Allowlist: \`${err}\``
                    });
                    return;
                }
            } else {
                try {
                    await noblox.handleJoinRequest(Number(constants.groups.crpRobloxGroupId), userId, false);

                    await interaction.reply({
                        flags: ["Ephemeral"],
                        content: `${icon.action_check} Não sei como burlou isso, mas sua Allowlist foi reprovada.`
                    });

                    if (channellog && channellog.isTextBased()) {
                        await channellog.send({
                            flags: ["IsComponentsV2"],
                            components: [robloxGroupAllowListReproveContainer(interaction.member, userProfilePicture)],
                            allowedMentions: { parse: [] }
                        });
                    }
                } catch (err) {
                    if (String(err).includes("The group join request is invalid")) {
                        await interaction.reply({
                            flags: ["Ephemeral"],
                            content: `${icon.action_x} Você não possui um pedido de entrada no grupo.`
                        });
                        return
                    }

                    await interaction.reply({
                        flags: ["Ephemeral"],
                        content: `${icon.action_x} Erro ao reprovar Allowlist: \`${err}\``
                    });
                    return
                }
            }
        } catch (err) {
            await interaction.reply({
                flags: ["Ephemeral"],
                content: `${icon.action_x} Houve um erro ao executar este comando: \`${err}\``
            });
        }
    },
});