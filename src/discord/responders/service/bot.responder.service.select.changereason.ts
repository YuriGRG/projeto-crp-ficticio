import { createResponder, ResponderType } from "#base";
import { serviceContainerOpen_changeReason } from "../../containers/responders/bot.responder.service.select.containerOpen.changereason.js";

createResponder({
    customId: "/staff/service/open/changereason",
    types: [ResponderType.Button], cache: "cached",
    async run(interaction) {
        await interaction.update({
            flags: ["IsComponentsV2"],
            components: [serviceContainerOpen_changeReason(interaction.user)]
        })
    },
});