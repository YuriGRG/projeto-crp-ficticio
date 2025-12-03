import { brBuilder, createContainer, createSection, createSeparator, createTextDisplay } from "@magicyan/discord";
import { Message, PartialMessage, TimestampStyles, time } from "discord.js";
import { icon } from "../../../functions/utils/emojis.js";

export function logMessageDeleteContainer(message: Message | PartialMessage) {
    const deletedAt = time(new Date(), TimestampStyles.ShortTime);
    const content = message.content?.trim() || "[Sem conteúdo]";
    const attachments = message.attachments.map(att => att.url).join("\n") || null;

    return createContainer({
        components: [
            createSection(
                brBuilder(
                    `${icon.other_bug}  Mensagem Deletada`,
                    `${icon.clock}  ${deletedAt}`,
                    `${icon.apps_discord}  ${message.channel}`,
                    `${icon.user}  ${message.author}`
                ),
                {
                    media: {
                        url: message.author!.displayAvatarURL()
                    },
                    description: `Foto de perfil de ${message.author!.username}`
                }
            ),
            createSeparator(true, true),
            createTextDisplay(
                brBuilder(
                    content,
                    attachments ? `**Anexos:**\n${attachments}` : ""
                )
            )
        ]
    });
}
