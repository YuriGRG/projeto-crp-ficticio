import { createResponder, ResponderType } from "#base";
import { serviceCancelContainer } from "../../containers/responders/bot.responders.service.select.cancel.container.js";

createResponder({
    customId: "/staff/service/open/cancel",
    types: [ResponderType.Button], cache: "cached",
    async run(interaction) {
        await interaction.update({
            flags: ["IsComponentsV2"],
            components: [serviceCancelContainer(interaction.user)]
        })
    },
});