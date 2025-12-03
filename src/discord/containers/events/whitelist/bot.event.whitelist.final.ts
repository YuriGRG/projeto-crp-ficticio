import { brBuilder, createContainer, createSection, createSeparator } from "@magicyan/discord";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, GuildMember, TimestampStyles, time } from "discord.js";
import { icon } from "../../../../functions/utils/emojis.js";

export function whiteListFinalContainer(member: GuildMember) {
    return createContainer({
        components: [
            createSection(
                brBuilder(
                    `${icon.other_terminal}  Whitelist Finalizada`,
                    `${icon.clock} ${time(new Date(), TimestampStyles.ShortDateTime)}`,
                    `${icon.user} ${member}`
                ),
                {
                    media: {
                        url: member.displayAvatarURL()
                    },
                    description: `Foto de perfil de ${member.user.username}`
                }
            ),
            createSeparator(true, false),
            new ActionRowBuilder({
                components: [
                    new ButtonBuilder({
                        customId: `whitelist/approve/${member.id}`,
                        emoji: icon.action_check,
                        label: "Aprovar Whitelist",
                        style: ButtonStyle.Success,
                    }),
                    new ButtonBuilder({
                        customId: `whitelist/reprove/${member.id}`,
                        emoji: icon.action_x,
                        label: "Reprovar Whitelist",
                        style: ButtonStyle.Danger,
                    })
                ]
            })
        ]
    })
}