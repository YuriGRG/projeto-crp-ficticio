import { brBuilder, createContainer, createSection } from "@magicyan/discord";
import { GuildMember } from "discord.js";
import { icon } from "../../../functions/utils/emojis.js";

export function robloxGroupAllowListReproveContainer(member: GuildMember, userProfilePicture: string) {
    return createContainer({
        components: [
            createSection(
                brBuilder(
                    `${icon.user}  Allowlist Reprovada`,
                    `${member} - ${member.displayName}`
                ),
                {
                    media: {
                        url: userProfilePicture
                    },
                    description: `Foto de perfil de ${member.user.username}`
                }
            )
        ]
    });
}
