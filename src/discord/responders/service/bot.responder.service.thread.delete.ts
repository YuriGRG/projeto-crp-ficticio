import { createResponder, ResponderType } from "#base";
import { icon } from "../../../functions/utils/emojis.js";
import { getMemberFromChannelName } from "../../../functions/utils/getMemberFromChannelName.js";
import { threadDeleteContainer } from "../../containers/responders/bot.responders.service.thread.delete.container.js";
import { getSolicitacaoMotivo } from "./bot.responder.service.select.js";

createResponder({
    customId: "/staff/service/delete",
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
            components: [threadDeleteContainer(solicitante, getSolicitacaoMotivo(), interaction.user)]
        });

        setTimeout(async () => {
            await interaction.channel?.delete();
        }, 10000);
    },
});