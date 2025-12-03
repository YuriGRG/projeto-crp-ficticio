import { createResponder, ResponderType } from "#base";
import { icon } from "../../../functions/utils/emojis.js";
import { getMemberFromChannelName } from "../../../functions/utils/getMemberFromChannelName.js";
import { threadServiceLockContainer } from "../../containers/responders/bot.responder.service.thread.servicelock.container.js";
import { getSolicitacaoMotivo } from "./bot.responder.service.select.js";

createResponder({
    customId: "/staff/service/servicelock",
    types: [ResponderType.Button], cache: "cached",
    async run(interaction) {
        const solicitante = await getMemberFromChannelName(`${interaction.channel?.name}`, interaction.guild)

        if (!solicitante) return;

        if (!interaction.member.roles.cache.has(constants.roles.equipeRoleId)) {
            await interaction.reply({
                flags: ["Ephemeral"],
                content: `${icon.action_x} Você não possui permissão para utilizar essa função.`
            })
            return;
        }

        await interaction.update({
            flags: ["IsComponentsV2"],
            components: [threadServiceLockContainer(solicitante, getSolicitacaoMotivo(), interaction.user)]
        })

        if (!interaction.channel?.isThread()) return;

        const thread = interaction.channel;
        await thread.members.fetch();

        for (const [memberId] of thread.members.cache) {
            const guildMember = await interaction.guild?.members.fetch(memberId);
            if (!guildMember) continue;

            if (!guildMember.roles.cache.has(constants.roles.equipeRoleId)) {
                try {
                    await thread.members.remove(memberId);
                } catch (error) {
                    console.error(`Erro ao remover ${guildMember.user.username}:`, error);
                }
            }
        }
    },
});