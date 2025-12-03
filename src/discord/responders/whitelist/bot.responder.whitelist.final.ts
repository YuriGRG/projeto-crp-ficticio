import { createResponder, ResponderType } from "#base";
import { icon } from "../../../functions/utils/emojis.js";
import { removeUsers } from "../../../functions/utils/removeusersthread.js";
import { whiteListApproveContainer } from "../../containers/responders/whitelist/bot.responder.whitelist.approve.js";
import { whiteListReproveContainer } from "../../containers/responders/whitelist/bot.responder.whitelist.reprove.js";

createResponder({
    customId: "whitelist/:action/:memberId",
    types: [ResponderType.Button], cache: "cached",
    async run(interaction, { action, memberId }) {
        const channellog = await interaction.guild.channels.fetch(constants.channels.logsChannelId);

        const member = await interaction.guild.members.fetch(memberId);

        if (!member) return;

        const swhiteListRoleId = await member.guild.roles.fetch(constants.roles.swhiteListRoleId);
        const whiteListRole = await member.guild.roles.fetch(constants.roles.whiteListRoleId);
        const sallowListRole = await member.guild.roles.fetch(constants.roles.sallowListRoleId);
        const whiteandallowDividerRole = await member.guild.roles.fetch(constants.roles.whiteandallowDivisorRoleId);
        const tieriRole = await member.guild.roles.fetch(constants.roles.tierIRoleId);

        if (!swhiteListRoleId || !whiteListRole || !tieriRole || !sallowListRole || !whiteandallowDividerRole) return;

        if (action === "approve") {
            await member.roles.remove(swhiteListRoleId);
            await member.roles.add(whiteListRole);
            await member.roles.add(sallowListRole);
            await member.roles.add(tieriRole);

            try {
                await member.send({
                    content: `${icon.action_check} Olá, ${member.user.username}. Venho com boas notícias, você foi aprovado na Whitelist do Capital Roleplay, aproveite o Roleplay!`
                })
            } catch (err) {
                console.error(`O Membro ${member.user.username} possue DM fechada, eu tentei enviar uma mensangem.`, err)
            }

            await interaction.message.delete();
            await interaction.reply({
                content: `${icon.action_check} Whitelist de ${member.nickname} aprovada com sucesso.`
            })

            if (channellog && channellog.isTextBased()) {
                await channellog.send({
                    flags: ["IsComponentsV2"],
                    components: [whiteListApproveContainer(interaction.member)],
                    allowedMentions: { parse: [] }
                });
            }
        } else {
            try {
                await member.send({
                    content: `${icon.action_check} Olá, ${member.user.username}. Venho com más notícias, você foi reprovado na Whitelist do Capital Roleplay, tente novamente!`
                })
            } catch (err) {
                console.error(`O Membro ${member.user.username} possue DM fechada, eu tentei enviar uma mensangem.`, err)
            }

            await interaction.message.delete();
            await interaction.reply({
                content: `${icon.action_check} Whitelist de ${member.nickname} reprovada com sucesso.`
            })

            if (channellog && channellog.isTextBased()) {
                await channellog.send({
                    flags: ["IsComponentsV2"],
                    components: [whiteListReproveContainer(interaction.member)],
                    allowedMentions: { parse: [] }
                });
            }
        }
    },
});