import { brBuilder, createContainer, createSection, createSeparator, createTextDisplay } from "@magicyan/discord";
import { Message, PartialMessage, TimestampStyles, time } from "discord.js";
import { icon } from "../../../functions/utils/emojis.js";

export function logMessageUpdateContainer(oldMessage: Message | PartialMessage, newMessage: Message | PartialMessage) {
    const editedAt = time(new Date(), TimestampStyles.ShortTime);
    const author = newMessage.author!;
    const oldContent = oldMessage.content?.trim() || "[Sem conteúdo anterior]";
    const newContent = newMessage.content?.trim() || "[Sem novo conteúdo]";

    return createContainer({
        components: [
            createSection(
                brBuilder(
                    `${icon.other_bug}  Mensagem Editada`,
                    `${icon.clock}  ${editedAt}`,
                    `${icon.apps_discord}  ${newMessage.channel}`,
                    `${icon.user}  ${author}`,
                    `${icon.arrow_upright}  [Ir para a mensagem editada](${newMessage.url})`
                ),
                {
                    media: {
                        url: author.displayAvatarURL()
                    },
                    description: `Foto de perfil de ${author.username}`
                }
            ),
            createSeparator(true, true),
            createTextDisplay(
                brBuilder(
                    `**Antes:**\n${oldContent}`,
                    "",
                    `**Depois:**\n${newContent}`
                )
            )
        ]
    });
}
