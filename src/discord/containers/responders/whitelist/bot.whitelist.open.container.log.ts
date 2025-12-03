import { brBuilder, createContainer, createSection } from "@magicyan/discord";
import { GuildMember, PartialGuildMember, time, TimestampStyles } from "discord.js";
import { icon } from "../../../../functions/utils/emojis.js";

export function whitelistInitLogContainer(member: GuildMember | PartialGuildMember) {
    return createContainer({
        components: [
            createSection(
                brBuilder(
                    `${icon.file}  Whitelist Iniciada`,
                    `${icon.clock} ${time(new Date(), TimestampStyles.ShortDateTime)}`,
                    `${member}`
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
