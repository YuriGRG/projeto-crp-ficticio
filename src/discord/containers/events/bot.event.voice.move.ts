import { brBuilder, createContainer, createSection } from "@magicyan/discord";
import { TimestampStyles, VoiceState, time } from "discord.js";
import { icon } from "../../../functions/utils/emojis.js";

export function voiceMoveContainer(oldState: VoiceState, newState: VoiceState) {
    const member = newState.member || oldState.member!;
    return createContainer({
        components: [
            createSection(
                brBuilder(
                    `${icon.user}  Moveu-se de Call`,
                    `${icon.clock}  ${time(new Date(), TimestampStyles.ShortTime)}`,
                    `${icon.apps_discord} ${member}`,
                    `${icon.action_remove} ${oldState.channel} → ${newState.channel}`
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
