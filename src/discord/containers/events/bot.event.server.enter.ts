import { brBuilder, createContainer, createSection } from "@magicyan/discord";
import { GuildMember, PartialGuildMember } from "discord.js";
import { icon } from "../../../functions/utils/emojis.js";

export function guildMemberAddContainer(member: GuildMember | PartialGuildMember) {
    return createContainer({
        components: [
            createSection(
                brBuilder(
                    `${icon.user}  Novo Membro`,
                    `${member} - ${member.guild.memberCount}`
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
