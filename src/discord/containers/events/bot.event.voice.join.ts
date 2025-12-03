import { brBuilder, createContainer, createSection } from "@magicyan/discord";
import { TimestampStyles, VoiceState, time } from "discord.js";
import { icon } from "../../../functions/utils/emojis.js";

export function voiceJoinContainer(state: VoiceState) {
    const member = state.member!;
    return createContainer({
        components: [
            createSection(
                brBuilder(
                    `${icon.user}  Entrada em Call`,
                    `${icon.clock}  ${time(new Date(), TimestampStyles.ShortTime)}`,
                    `${icon.apps_discord} ${member} - ${state.channel}`
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
