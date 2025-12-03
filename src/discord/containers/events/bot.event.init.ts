import { brBuilder, createContainer, createSection, createSeparator, createTextDisplay } from "@magicyan/discord";
import { Client, TimestampStyles, time } from "discord.js";
import { icon } from "../../../functions/utils/emojis.js";

export function initMessageContainer(client: Client) {
    return createContainer({
        components: [
            createSection(
                brBuilder(
                    `${icon.user}  Client Inicializado`,
                    `${client.user} - ${client.user!.id}`,
                    `${icon.clock} - ${time(new Date(), TimestampStyles.RelativeTime)}`
                ),
                {
                    media: {
                        url: client.user!.displayAvatarURL()
                    },
                    description: `Foto de perfil de ${client.user!.username}`
                }
            ),
            createSeparator(true, true),
            createTextDisplay(
                brBuilder(
                    `Comandos Online: NaN`,
                    `Eventos Online: NaN`
                )
            )
        ]
    });
}
