import { brBuilder, createContainer, createSection } from "@magicyan/discord";
import { GuildMember } from "discord.js";
import { icon } from "../../../functions/utils/emojis.js";

export function robloxGroupAllowListApproveContainer(member: GuildMember, userProfilePicture: string) {
    return createContainer({
        components: [
            createSection(
                brBuilder(
                    `${icon.user}  Allowlist Aprovada`,
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
