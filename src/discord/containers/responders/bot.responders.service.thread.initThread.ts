import { brBuilder, createContainer, createSection, createSeparator } from "@magicyan/discord";
import { ButtonBuilder, ButtonStyle, User } from "discord.js";
import { icon } from "../../../functions/utils/emojis.js";

export function initThreadContainer(interactionUser: User, solicitacao_motivo: string) {
    return createContainer({
        components: [
            createSection(
                brBuilder(
                    `## ${icon.user} Atendimento ao Usuário`,
                    `-# Usuário Solicitante: ${interactionUser}`,
                    `-# ID do Usuário: ${interactionUser.id}`,
                    `-# Motivo do Usuário: ${solicitacao_motivo}`
                ),
                {
                    media: {
                        url: interactionUser.displayAvatarURL()
                    },
                    description: `Perfil de ${interactionUser.username}`
                }
            ),
            createSeparator(true, true),
            createSection(
                brBuilder(
                    `### ${icon.action_x}  Finalizar Atendimento`,
                    "-# Finalize o atendimento atual!"
                ),
                new ButtonBuilder({
                    customId: `/staff/service/servicelock`,
                    emoji: icon.lock,
                    label: "Finalizar",
                    style: ButtonStyle.Danger,
                })
            ),
            createSeparator(false, false),
            createSection(
                brBuilder(
                    `### ${icon.user_add}  Adicionar Membros`,
                    "-# Adicione membros a este atendimento!"
                ),
                new ButtonBuilder({
                    customId: `/staff/service/memberadd`,
                    emoji: icon.user_add,
                    label: "Adicionar",
                    style: ButtonStyle.Success,
                })
            )
        ]
    });
}