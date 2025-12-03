import { brBuilder, createContainer, createSection } from "@magicyan/discord";
import { User } from "discord.js";
import { icon } from "../../../functions/utils/emojis.js";

export function serviceCancelContainer(interactionUser: User) {
    return createContainer({
        components: [
            createSection(
                brBuilder(
                    `## ${icon.user} Atendimento ao Usuário`,
                    `-# Usuário Solicitante: ${interactionUser}`,
                    `-# ID do Usuário: ${interactionUser.id}`,
                    `-# Atendimento Cancelado`
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

