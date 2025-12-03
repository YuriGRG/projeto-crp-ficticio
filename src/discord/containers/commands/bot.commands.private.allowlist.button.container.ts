import { brBuilder, createContainer, createMediaGallery, createSeparator, createTextDisplay } from "@magicyan/discord";
import { ButtonBuilder, ButtonStyle } from "discord.js";

export function allowListButtonContainer() {
    return createContainer({
        components: [
            createMediaGallery({
                media: {
                    url: `attachment://CRP-Allowlist_Banner.png`
                }
            }),
            createSeparator(true, true),
            createTextDisplay(
                brBuilder(
                    "Caso sua allowlist não seja aprovada imediatamente após a solicitação no [grupo do roblox](https://www.roblox.com/pt/communities/740938578/Capital-Roleplay-S-o-Paulo#!/about), você pode clicar no botão abaixo para concluir a aprovação da sua allowlist."
                )
            ),
            createSeparator(true, false),
            new ButtonBuilder({
                custom_id: "allowlist/approve",
                label: "Aprovar Allowlist",
                style: ButtonStyle.Success
            })
        ]
    });
}