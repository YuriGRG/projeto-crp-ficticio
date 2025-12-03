import { brBuilder, createContainer, createSection } from "@magicyan/discord";
import { Guild, PrivateThreadChannel, PublicThreadChannel, User } from "discord.js";
import { icon } from "../../../functions/utils/emojis.js";

export function initThreadSelectContainer(interactionUser: User, interactionGuild: Guild, thread: PrivateThreadChannel | PublicThreadChannel) {
    return createContainer({
        components: [
            createSection(
                brBuilder(
                    `## ${icon.user} Atendimento ao Usuário`,
                    `-# Usuário Solicitante: ${interactionUser}`,
                    `-# ID do Usuário: ${interactionUser.id}`,
                    `-# Atendimento [Iniciado](https://discord.com/channels/${interactionGuild.id}/${thread.id})`
                ),
                {
                    media: {
                        url: interactionUser.displayAvatarURL()
                    },
                    description: `Perfil de ${interactionUser.username}`
                }
            )
        ]
    })
}