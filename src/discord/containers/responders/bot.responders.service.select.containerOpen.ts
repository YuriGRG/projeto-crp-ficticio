import { brBuilder, createContainer, createSection, createSeparator } from "@magicyan/discord";
import { ButtonBuilder, ButtonStyle, User } from "discord.js";
import { icon } from "../../../functions/utils/emojis.js";

export function serviceContainerOpen(interactionUser: User, solicitacao_motivo: string) {
    return createContainer({
        components: [
            createSection(
                brBuilder(
                    `## ${icon.user} Atendimento ao Usuário`,
                    `-# Usuário Solicitante: ${interactionUser}`,
                    `-# ID do Usuário: ${interactionUser.id}`
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
                    `### ${icon.clipboard_remove} Motivo da Solicitação`,
                    `-# ${solicitacao_motivo}`
                ),
                new ButtonBuilder({
                    customId: "/staff/service/open/changereason",
                    emoji: icon.action_remove,
                    label: "Alterar Motivo",
                    style: ButtonStyle.Secondary
                })
            ),
            createSeparator(false, false),
            createSection(
                brBuilder(
                    `### ${icon.clipboard_x} Cancelar Atendimento`,
                    `-# Cancele este atendimento, caso ache necessário.`
                ),
                new ButtonBuilder({
                    customId: "/staff/service/open/cancel",
                    emoji: icon.action_x,
                    label: "Cancelar Atendimento",
                    style: ButtonStyle.Danger
                })
            ),
            createSeparator(false, false),
            createSection(
                brBuilder(
                    `### ${icon.clipboard_check} Confirmar Atendimento`,
                    `-# Confirme este atendimento.`
                ),
                new ButtonBuilder({
                    customId: "/staff/service/open/confirm",
                    emoji: icon.action_check,
                    label: "Confirmar Atendimento",
                    style: ButtonStyle.Success
                })
            ),
        ]
    })
}
