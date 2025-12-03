import { brBuilder, createContainer, createSection } from "@magicyan/discord";
import { Guild, PrivateThreadChannel, PublicThreadChannel, User } from "discord.js";
import { icon } from "../../../../functions/utils/emojis.js";

export function initWLThreadButtonContainer(interactionUser: User, interactionGuild: Guild, thread: PrivateThreadChannel | PublicThreadChannel) {
    return createContainer({
        components: [
            createSection(
                brBuilder(
                    `## ${icon.file} Whitelist`,
                    `-# Jogador: ${interactionUser}`,
                    `-# ID do Jogador: ${interactionUser.id}`,
                    `-# Whitelist [Iniciada](https://discord.com/channels/${interactionGuild.id}/${thread.id})`
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