import { brBuilder, createContainer, createSection } from "@magicyan/discord";
import { TimestampStyles, time } from "discord.js";
import noblox from "noblox.js";
import { icon } from "../../../functions/utils/emojis.js";

export function initRobloxBotMessageContainer(currentUser: noblox.AuthenticatedUserData, userProfilePicture: string) {
    return createContainer({
        components: [
            createSection(
                brBuilder(
                    `${icon.user}  Roblox Bot Inicializado`,
                    `\`${currentUser.name}\` - ${currentUser.id}`,
                    `${icon.clock} - ${time(new Date(), TimestampStyles.RelativeTime)}`,
                ),
                {
                    media: {
                        url: userProfilePicture
                    },
                    description: `Foto de perfil de ${currentUser.name}`
                }
            )
        ]
    });
}
