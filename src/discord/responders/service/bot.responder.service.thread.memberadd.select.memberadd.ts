import { createResponder, ResponderType } from "#base";
import { getMemberFromChannelName } from "../../../functions/utils/getMemberFromChannelName.js";
import { threadSelectMemberAddFinishContainer } from "../../containers/responders/bot.responders.service.thread.memberadd.select.memberadd.container.js";
import { getSolicitacaoMotivo } from "./bot.responder.service.select.js";


createResponder({
    customId: "/staff/service/memberaddfinish",
    types: [ResponderType.UserSelect], cache: "cached",
    async run(interaction) {
        const solicitante = await getMemberFromChannelName(`${interaction.channel?.name}`, interaction.guild)

        if (!solicitante) return;

        const selectedId = interaction.values?.[0];

        await interaction.update({
            flags: ["IsComponentsV2"],
            components: [threadSelectMemberAddFinishContainer(solicitante, getSolicitacaoMotivo())]
        })

        if (!interaction.channel) return;

        const messageinit = await interaction.channel?.send({
            content: `<@${selectedId}>`
        })

        await messageinit.delete();
    },
});