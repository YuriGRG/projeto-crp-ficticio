import { brBuilder, createContainer, createSection } from "@magicyan/discord";
import { GuildMember } from "discord.js";
import { icon } from "../../../../functions/utils/emojis.js";

export function whiteListReproveContainer(member: GuildMember) {
    return createContainer({
        components: [
            createSection(
                brBuilder(
                    `${icon.user}  Whitelist Reprovada`,
                    `${member} - ${member.displayName}`
                ),
                {
                    media: {
                        url: member.user.displayAvatarURL()
                    },
                    description: `Foto de perfil de ${member.user.username}`
                }
            )
        ]
    });
}